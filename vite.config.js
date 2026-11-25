import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { sitePlugin } from './vite-plugin-site.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      sitePlugin({
        // The production address, e.g. https://example.com. Unset: no canonical, og:url or sitemap.
        siteUrl: env.VITE_SITE_URL?.replace(/\/+$/, ''),
        // The 1200 x 630 sharing image, a path in public/ (e.g. /social.png), once it exists.
        socialImage: env.VITE_SOCIAL_IMAGE,
      }),
    ],
  }
})
