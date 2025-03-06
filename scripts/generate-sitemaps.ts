import { generateSitemaps } from '../src/utils/generateSitemap.js'

async function main() {
  console.log('Starting sitemap generation...')
  const startTime = Date.now()

  try {
    const result = await generateSitemaps()
    console.log(`\nSuccessfully generated ${result.totalSitemaps} sitemap files:`)
    console.log(result.sitemapFiles.join('\n'))
    console.log(`\nTotal time: ${((Date.now() - startTime) / 1000).toFixed(2)} seconds`)
  } catch (error) {
    console.error('Error generating sitemaps:', error)
    process.exit(1)
  }
}

main() 