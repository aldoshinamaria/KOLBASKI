import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/** Публичные файлы из /public с учётом base (GitHub Pages: /KOLBASKI/) */
export function assetUrl(path) {
  if (!path) return path
  if (
    path.startsWith('data:') ||
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return path
  }
  const base = import.meta.env.BASE_URL
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${base}${normalized}`
}

export function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

export const BRAND_NAME = 'Тесто и Дым'
export const BRAND_TAGLINE = 'Домашняя гастрономия ручной работы'

export const TELEGRAM_URL = 'https://t.me/testo_i_dym'
export const VK_URL = 'https://vk.com/testo_i_dym'
export const PHONE = '+7 (999) 123-45-67'
export const PHONE_HREF = 'tel:+79991234567'

export function scrollToOrder() {
  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
}

export function scrollToProducts() {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
