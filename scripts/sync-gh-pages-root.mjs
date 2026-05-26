import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')

function copyDirSafe(src, dest) {
  if (!existsSync(src)) return
  mkdirSync(dest, { recursive: true })
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const from = join(src, entry.name)
    const to = join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirSafe(from, to)
    } else {
      writeFileSync(to, readFileSync(from))
    }
  }
}

const builtHtml = ['index.html', 'index.dev.html'].find((name) =>
  existsSync(join(dist, name)),
)

if (!builtHtml) {
  console.error('Built HTML not found in dist/. Run npm run build first.')
  process.exit(1)
}

writeFileSync(
  join(root, 'index.html'),
  readFileSync(join(dist, builtHtml), 'utf8'),
  'utf8',
)

for (const dir of ['assets', 'boxes', 'gallery']) {
  copyDirSafe(join(dist, dir), join(root, dir))
}

for (const file of ['logo.png', '.nojekyll', '404.html', 'favicon.svg']) {
  const from = join(dist, file)
  if (existsSync(from)) {
    writeFileSync(join(root, file), readFileSync(from))
  }
}

console.log('Production build synced to repo root for GitHub Pages.')
