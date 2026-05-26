import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

/** Supabase + секрет админки — иначе заказы только в localStorage этого браузера */
export function isSupabaseBackendReady() {
  return Boolean(url && anonKey && getAdminSecret())
}

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null

export function getAdminSecret() {
  return import.meta.env.VITE_ADMIN_SECRET || 'your-admin-secret'
}
