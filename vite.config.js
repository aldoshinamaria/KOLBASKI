import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

/** GitHub Pages: https://aldoshinamaria.github.io/KOLBASKI/ */
const GH_PAGES_BASE = '/KOLBASKI/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? GH_PAGES_BASE : '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'gh-pages-spa-fallback',
      closeBundle() {
        if (command !== 'build') return
        const dist = join(process.cwd(), 'dist')
        copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
      },
    },
  ],
}))
