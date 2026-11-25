import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { notFoundMeta, pageMeta } from './src/pageMeta.js'

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Search and sharing files, written at build time:
 *
 * - One HTML file per page (dist/timeline.html, ...), the same app with that page's title,
 *   description and sharing tags in the <head>. Link previews don't run JavaScript, so they
 *   only see these. The host serves /timeline from timeline.html (cleanUrls in vercel.json).
 * - 404.html, which the host sends with a real 404 status for any other address.
 * - robots.txt, and sitemap.xml once the site's address is known.
 *
 * `siteUrl` is the one place the production address comes from (VITE_SITE_URL). While it's
 * empty, everything that needs an absolute address (canonical, og:url, sitemap, social image)
 * is left out. `socialImage` is a path in public/, e.g. /social.png (VITE_SOCIAL_IMAGE).
 */
export function sitePlugin({ siteUrl = '', socialImage = '' } = {}) {
  let outDir

  function headFor(html, meta) {
    const set = (current, pattern, value) => current.replace(pattern, (_, before, after) => before + escapeHtml(value) + after)
    let page = html
    page = set(page, /(<title>)[^<]*(<\/title>)/, meta.title)
    page = set(page, /(<meta name="description" content=")[^"]*(")/, meta.description)
    page = set(page, /(<meta property="og:title" content=")[^"]*(")/, meta.title)
    page = set(page, /(<meta property="og:description" content=")[^"]*(")/, meta.description)

    const extra = []
    if (meta.path && siteUrl) {
      extra.push(`<link rel="canonical" href="${siteUrl}${meta.path}" />`)
      extra.push(`<meta property="og:url" content="${siteUrl}${meta.path}" />`)
      if (socialImage) {
        extra.push(`<meta property="og:image" content="${siteUrl}${socialImage}" />`)
        extra.push('<meta property="og:image:width" content="1200" />')
        extra.push('<meta property="og:image:height" content="630" />')
        page = page.replace('name="twitter:card" content="summary"', 'name="twitter:card" content="summary_large_image"')
      }
    }
    if (!meta.path) extra.push('<meta name="robots" content="noindex" />')
    return page.replace('</head>', extra.map((tag) => `  ${tag}\n  `).join('') + '</head>')
  }

  return {
    name: 'firehorse-site',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const html = readFileSync(path.join(outDir, 'index.html'), 'utf8')
      const write = (file, text) => {
        const target = path.join(outDir, file)
        mkdirSync(path.dirname(target), { recursive: true })
        writeFileSync(target, text)
      }

      const pages = Object.values(pageMeta)
      for (const meta of pages) {
        write(meta.path === '/' ? 'index.html' : `${meta.path.slice(1)}.html`, headFor(html, meta))
      }
      write('404.html', headFor(html, notFoundMeta))

      write('robots.txt', `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`)
      if (siteUrl) {
        const urls = pages.map((meta) => `  <url><loc>${siteUrl}${meta.path}</loc></url>`).join('\n')
        write(
          'sitemap.xml',
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        )
      }
    },
  }
}
