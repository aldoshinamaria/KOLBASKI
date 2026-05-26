import { STORAGE_KEYS, ORDER_STATUS } from '../constants'
import { readStorage, writeStorage, generateReadableId } from './index'
import { mapOrderFromDb, mapOrderToDb } from './mappers'

function getAllRaw() {
  return readStorage(STORAGE_KEYS.ORDERS, [])
}

const localOrdersStorage = {
  getAll() {
    return getAllRaw().sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    )
  },

  getById(id) {
    return getAllRaw().find((o) => o.id === id) ?? null
  },

  findByCredentials(orderId, phone) {
    const digits = phone.replace(/\D/g, '')
    return (
      getAllRaw().find(
        (o) =>
          o.id === orderId &&
          o.customer.phone.replace(/\D/g, '') === digits,
      ) ?? null
    )
  },

  create(orderData) {
    const orders = getAllRaw()
    const order = {
      id: generateReadableId('TD'),
      createdAt: new Date().toISOString(),
      status: ORDER_STATUS.NEW,
      adminMessage: null,
      ...orderData,
    }
    orders.unshift(order)
    writeStorage(STORAGE_KEYS.ORDERS, orders)
    window.dispatchEvent(new CustomEvent('orders-updated'))
    return order
  },

  updateStatus(id, status, adminMessage) {
    const orders = getAllRaw()
    const index = orders.findIndex((o) => o.id === id)
    if (index === -1) return null
    orders[index] = {
      ...orders[index],
      status,
      ...(adminMessage !== undefined ? { adminMessage } : {}),
    }
    writeStorage(STORAGE_KEYS.ORDERS, orders)
    window.dispatchEvent(new CustomEvent('orders-updated'))
    return orders[index]
  },

  remove(id) {
    const orders = getAllRaw().filter((o) => o.id !== id)
    writeStorage(STORAGE_KEYS.ORDERS, orders)
    window.dispatchEvent(new CustomEvent('orders-updated'))
    return true
  },
}

async function getSupabaseOrdersStorage() {
  const { supabase, getAdminSecret, isSupabaseConfigured } = await import(
    '../supabase/client'
  )
  if (!isSupabaseConfigured) return null

  const secret = getAdminSecret()

  return {
    async getAll() {
      const { data, error } = await supabase.rpc('admin_get_orders', {
        p_secret: secret,
      })
      if (error) throw error
      return (data || []).map(mapOrderFromDb)
    },

    async getById(id) {
      const all = await this.getAll()
      return all.find((o) => o.id === id) ?? null
    },

    async findByCredentials(orderId, phone) {
      const { data, error } = await supabase.rpc('get_order_by_credentials', {
        p_order_id: orderId,
        p_phone: phone,
      })
      if (error) throw error
      const row = Array.isArray(data) ? data[0] : data
      return mapOrderFromDb(row)
    },

    async create(orderData) {
      const order = {
        id: generateReadableId('TD'),
        createdAt: new Date().toISOString(),
        status: ORDER_STATUS.NEW,
        adminMessage: null,
        ...orderData,
      }
      const { error } = await supabase.from('orders').insert(mapOrderToDb(order))
      if (error) throw error
      window.dispatchEvent(new CustomEvent('orders-updated'))
      return order
    },

    async updateStatus(id, status, adminMessage) {
      const payload = {
        p_secret: secret,
        p_order_id: id,
        p_status: status,
      }
      if (adminMessage !== undefined) {
        payload.p_admin_message = adminMessage
        payload.p_update_message = true
      }
      const { data, error } = await supabase.rpc('admin_update_order', payload)
      if (error) throw error
      window.dispatchEvent(new CustomEvent('orders-updated'))
      return mapOrderFromDb(data)
    },

    async remove(id) {
      const { error } = await supabase.rpc('admin_delete_order', {
        p_secret: secret,
        p_order_id: id,
      })
      if (error) throw error
      window.dispatchEvent(new CustomEvent('orders-updated'))
      return true
    },
  }
}

let cachedSupabaseStorage = null

async function resolveStorage(scope = 'client') {
  const { isSupabaseConfigured, isSupabaseBackendReady } = await import(
    '../supabase/client'
  )
  const useCloud =
    scope === 'admin' ? isSupabaseBackendReady() : isSupabaseConfigured
  if (!useCloud) return localOrdersStorage
  if (!cachedSupabaseStorage) {
    cachedSupabaseStorage = await getSupabaseOrdersStorage()
  }
  return cachedSupabaseStorage ?? localOrdersStorage
}

export const ordersStorage = {
  async getAll() {
    const storage = await resolveStorage('admin')
    return storage.getAll()
  },

  async getById(id) {
    const storage = await resolveStorage('admin')
    return storage.getById(id)
  },

  async findByCredentials(orderId, phone) {
    const storage = await resolveStorage('client')
    return storage.findByCredentials(orderId, phone)
  },

  create(orderData) {
    return resolveStorage('client').then((s) => s.create(orderData))
  },

  updateStatus(id, status, adminMessage) {
    return resolveStorage('admin').then((s) =>
      s.updateStatus(id, status, adminMessage),
    )
  },

  remove(id) {
    return resolveStorage('admin').then((s) => s.remove(id))
  },
}
