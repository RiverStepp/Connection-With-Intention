import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Site configuration
const SITE_URL = 'https://sproutandstar.com' // TODO: Update with actual domain
const LAST_MODIFIED = new Date().toISOString().split('T')[0]

// Define all routes with their priorities and change frequencies
const routes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly'
  },
  {
    path: '/about',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/services',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    path: '/contact',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/resources',
    priority: '0.7',
    changefreq: 'weekly'
  },
  {
    path: '/faq',
    priority: '0.6',
    changefreq: 'monthly'
  },
  {
    path: '/testimonials',
    priority: '0.6',
    changefreq: 'monthly'
  },
  {
    path: '/policies',
    priority: '0.5',
    changefreq: 'yearly'
  },
  {
    path: '/legal',
    priority: '0.4',
    changefreq: 'yearly'
  }
]

// Generate sitemap XML
function generateSitemap() {
  const urlset = routes.map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`

  return sitemap
}

// Generate robots.txt
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin/internal pages (add as needed)
# Disallow: /admin/
# Disallow: /_internal/

# Crawl delay (optional)
# Crawl-delay: 1`
}

// Write files
function writeFiles() {
  const publicDir = join(__dirname, '..', 'public')
  
  try {
    // Generate and write sitemap.xml
    const sitemap = generateSitemap()
    writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8')
    console.log('✅ sitemap.xml generated successfully')
    
    // Generate and write robots.txt
    const robotsTxt = generateRobotsTxt()
    writeFileSync(join(publicDir, 'robots.txt'), robotsTxt, 'utf8')
    console.log('✅ robots.txt generated successfully')
    
    console.log(`\n📊 Sitemap includes ${routes.length} pages`)
    console.log(`🌐 Site URL: ${SITE_URL}`)
    console.log(`📅 Last modified: ${LAST_MODIFIED}`)
    
    console.log('\n⚠️  TODO: Update SITE_URL in scripts/generate-sitemap.mjs with your actual domain')
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    process.exit(1)
  }
}

// Run the script
writeFiles()
