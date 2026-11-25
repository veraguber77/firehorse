import { useEffect } from 'react'

const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, '')

function setAttribute(selector, name, value) {
  document.head.querySelector(selector)?.setAttribute(name, value)
}

/**
 * Keeps the <head> right while moving between pages in the app. The build already wrote the
 * first page's own tags (vite-plugin-site.js); `meta` is an entry of src/pageMeta.js.
 */
export function usePageMeta(meta) {
  useEffect(() => {
    document.title = meta.title
    setAttribute('meta[name="description"]', 'content', meta.description)
    setAttribute('meta[property="og:title"]', 'content', meta.title)
    setAttribute('meta[property="og:description"]', 'content', meta.description)

    if (siteUrl && meta.path) {
      setAttribute('link[rel="canonical"]', 'href', siteUrl + meta.path)
      setAttribute('meta[property="og:url"]', 'content', siteUrl + meta.path)
    }

    // Unknown addresses shouldn't be indexed, even on a host that answers 200 for them.
    let robots = document.head.querySelector('meta[name="robots"]')
    if (meta.path) {
      robots?.remove()
    } else if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      robots.content = 'noindex'
      document.head.append(robots)
    }
  }, [meta])
}
