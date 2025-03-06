import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import fs from 'fs'
import path from 'path'

const URLS_PER_SITEMAP = 50000
const SITEMAP_DIR = 'public/sitemaps'
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

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
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map(file => `  <sitemap>
    <loc>${BASE_URL}/sitemaps/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`

  // Save in sitemaps directory
  await fs.promises.writeFile(path.join(process.cwd(), SITEMAP_DIR, 'sitemap-index.xml'), xml)
  
  // Save main sitemap.xml in public directory
  const mainSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemaps/sitemap-index.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`

  await fs.promises.writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), mainSitemapXml)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ensure sitemaps directory exists
  const sitemapDir = path.join(process.cwd(), SITEMAP_DIR)
  if (!fs.existsSync(sitemapDir)) {
    await fs.promises.mkdir(sitemapDir, { recursive: true })
  }

  // Generate static routes sitemap
  const staticUrls: SitemapUrl[] = [
    { url: BASE_URL, changefreq: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/about`, changefreq: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, changefreq: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, changefreq: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/terms-of-service`, changefreq: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/faq`, changefreq: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/help-center`, changefreq: 'weekly', priority: 0.7 },
  ]

  await createSitemapXml(staticUrls, 'sitemap-static.xml')
  const sitemapFiles = ['sitemap-static.xml']

  // Process companies in batches
  const batchSize = 10000 // Process 10k companies at a time
  let currentBatch: SitemapUrl[] = []
  let currentSitemapIndex = 1
  let skip = 0
  let hasMore = true

  while (hasMore) {
    console.log(`Processing batch starting at offset ${skip}...`)
    
    const companies = await prisma.companiesData.findMany({
      skip,
      take: batchSize,
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

    if (companies.length === 0) {
      hasMore = false
      continue
    }

    for (const company of companies) {
      const url: SitemapUrl = {
        url: `${BASE_URL}/company/${company.url_title || company.id}`,
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

    skip += batchSize
    console.log(`Processed ${skip} companies...`)
  }

  // Write remaining URLs if any
  if (currentBatch.length > 0) {
    const filename = `sitemap-companies-${currentSitemapIndex}.xml`
    console.log(`Writing final sitemap file: ${filename}`)
    await createSitemapXml(currentBatch, filename)
    sitemapFiles.push(filename)
  }

  // Create sitemap index and main sitemap.xml
  console.log('Creating sitemap index and main sitemap.xml...')
  await createSitemapIndex(sitemapFiles)

  // Return the static URLs for Next.js built-in sitemap
  return staticUrls
} 