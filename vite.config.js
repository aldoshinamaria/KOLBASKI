import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

/** GitHub Pages: https://aldoshinamaria.github.io/KOLBASKI/ */
const GH_PAGES_BASE = '/KOLBASKI/'

function devIndexPlugin() {
  return {
    name: 'dev-index-html',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          req.url = '/index.dev.html'
        }
        next()
      })
    },
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? GH_PAGES_BASE : '/',
  plugins: [
    react(),
    tailwindcss(),
    command === 'serve' ? devIndexPlugin() : null,
    {
      name: 'gh-pages-spa-fallback',
      closeBundle() {
        if (command !== 'build') return
        const dist = join(process.cwd(), 'dist')
        const html = join(dist, 'index.dev.html')
        if (existsSync(html)) {
          copyFileSync(html, join(dist, '404.html'))
        }
      },
    },
  ].filter(Boolean),
  build: {
    rollupOptions: {
      input: join(process.cwd(), 'index.dev.html'),
    },
  },
}))
