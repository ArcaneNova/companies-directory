import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

const URLS_PER_SITEMAP = 50000
const BATCH_SIZE = 10000 // Process 10k companies at a time to manage memory
const SITEMAP_DIR = 'public/sitemaps'

interface SitemapUrl {
  url: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

async function createSitemapXml(urls: SitemapUrl[], filename: string) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.url}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`

  await fs.promises.writeFile(path.join(process.cwd(), SITEMAP_DIR, filename), xml)
}

async function createSitemapIndex(sitemapFiles: string[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map(file => `  <sitemap>
    <loc>${baseUrl}/sitemaps/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`

  await fs.promises.writeFile(path.join(process.cwd(), SITEMAP_DIR, 'sitemap-index.xml'), xml)
}

export async function generateSitemaps() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Ensure sitemaps directory exists
  const sitemapDir = path.join(process.cwd(), SITEMAP_DIR)
  if (!fs.existsSync(sitemapDir)) {
    await fs.promises.mkdir(sitemapDir, { recursive: true })
  } else {
    // Clean up old sitemap files
    const files = await fs.promises.readdir(sitemapDir)
    await Promise.all(
      files.map(file => fs.promises.unlink(path.join(sitemapDir, file)))
    )
  }

  // Generate static routes sitemap
  const staticUrls: SitemapUrl[] = [
    { url: baseUrl, changefreq: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, changefreq: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, changefreq: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, changefreq: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms-of-service`, changefreq: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/faq`, changefreq: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/help-center`, changefreq: 'weekly', priority: 0.7 },
  ]

  await createSitemapXml(staticUrls, 'sitemap-static.xml')
  const sitemapFiles = ['sitemap-static.xml']

  try {
    // Get total count for progress tracking
    const totalCompanies = await prisma.companiesData.count()
    console.log(`Total companies to process: ${totalCompanies.toLocaleString()}`)

    let currentBatch: SitemapUrl[] = []
    let currentSitemapIndex = 1
    let processedCount = 0
    let skip = 0

    // Process companies in batches
    while (processedCount < totalCompanies) {
      const startTime = Date.now()
      console.log(`\nProcessing batch starting at offset ${skip.toLocaleString()}...`)

      const companies = await prisma.companiesData.findMany({
        skip,
        take: BATCH_SIZE,
        select: {
          id: true,
          url_title: true,
          company_reg_date: true,
          company_status: true,
        },
        orderBy: {
          id: 'asc',
        },
      })

      for (const company of companies) {
        const url: SitemapUrl = {
          url: `${baseUrl}/company/${company.url_title || company.id}`,
          lastmod: company.company_reg_date?.toISOString() || new Date().toISOString(),
          changefreq: 'monthly',
          priority: company.company_status?.toLowerCase() === 'active' ? 0.8 : 0.5,
        }

        currentBatch.push(url)

        if (currentBatch.length === URLS_PER_SITEMAP) {
          const filename = `sitemap-companies-${currentSitemapIndex}.xml`
          console.log(`Writing sitemap file: ${filename}`)
          await createSitemapXml(currentBatch, filename)
          sitemapFiles.push(filename)
          currentBatch = []
          currentSitemapIndex++
        }
      }

      processedCount += companies.length
      skip += BATCH_SIZE

      const progress = ((processedCount / totalCompanies) * 100).toFixed(2)
      const timeElapsed = ((Date.now() - startTime) / 1000).toFixed(2)
      console.log(`Progress: ${progress}% (${processedCount.toLocaleString()}/${totalCompanies.toLocaleString()})`)
      console.log(`Batch processing time: ${timeElapsed} seconds`)
    }

    // Write remaining URLs if any
    if (currentBatch.length > 0) {
      const filename = `sitemap-companies-${currentSitemapIndex}.xml`
      console.log(`\nWriting final sitemap file: ${filename}`)
      await createSitemapXml(currentBatch, filename)
      sitemapFiles.push(filename)
    }

    // Create sitemap index
    console.log('\nCreating sitemap index...')
    await createSitemapIndex(sitemapFiles)

    return {
      sitemapFiles,
      totalSitemaps: sitemapFiles.length,
    }
  } catch (error) {
    console.error('Error generating sitemaps:', error)
    throw error
  }
} 