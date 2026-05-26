import { STORAGE_KEYS } from '../constants'
import { initialProducts } from '../../data/initialProducts'
import { readStorage, writeStorage, generateId } from './index'

const IMAGE_MIGRATION = {
  '/boxes/domashniy.png': '/boxes/domashniy.jpg',
  '/boxes/semeinyy.png': '/boxes/semeinyy.jpg',
  '/boxes/prazdnichnyy.png': '/boxes/prazdnichnyy.jpg',
  '/boxes/na-uglyah.png': '/boxes/na-uglyah.jpg',
}

function mergeWithInitialImages(products) {
  const templates = Object.fromEntries(initialProducts.map((p) => [p.id, p]))
  let changed = false

  const merged = products.map((product) => {
    const template = templates[product.id]
    let image = product.image

    if (IMAGE_MIGRATION[image]) {
      image = IMAGE_MIGRATION[image]
    } else if (template) {
      const legacyPng = template.image.replace(/\.jpg$/, '.png')
      if (!image || image === legacyPng) {
        image = template.image
      }
    }

    const next = {
      ...product,
      image,
      imageAlt: template?.imageAlt || product.imageAlt,
    }

    if (next.image !== product.image || next.imageAlt !== product.imageAlt) {
      changed = true
    }

    return next
  })

  if (changed) {
    writeStorage(STORAGE_KEYS.PRODUCTS, merged)
  }

  return merged
}

function getAllRaw() {
  const stored = readStorage(STORAGE_KEYS.PRODUCTS)
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    writeStorage(STORAGE_KEYS.PRODUCTS, initialProducts)
    return initialProducts
  }
  return mergeWithInitialImages(stored).map((p) => ({
    ...p,
    available: p.available !== false,
    seasonal: p.seasonal === true,
  }))
}

export const productsStorage = {
  getAll() {
    return getAllRaw()
  },

  getAvailable() {
    return getAllRaw().filter((p) => p.available !== false)
  },

  getById(id) {
    return getAllRaw().find((p) => p.id === id) ?? null
  },

  saveAll(products) {
    writeStorage(STORAGE_KEYS.PRODUCTS, products)
    window.dispatchEvent(new CustomEvent('products-updated'))
    return products
  },

  update(id, updates) {
    const products = getAllRaw()
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) return null
    products[index] = { ...products[index], ...updates, id }
    return this.saveAll(products)[index]
  },

  create(product) {
    const products = getAllRaw()
    const newProduct = {
      ...product,
      id: product.id || generateId('box'),
      available: product.available !== false,
      seasonal: product.seasonal === true,
    }
    products.push(newProduct)
    this.saveAll(products)
    return newProduct
  },

  remove(id) {
    const products = getAllRaw().filter((p) => p.id !== id)
    return this.saveAll(products)
  },
}
