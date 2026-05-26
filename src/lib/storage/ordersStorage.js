import { STORAGE_KEYS, ORDER_STATUS } from '../constants'
import { readStorage, writeStorage, generateId } from './index'

function getAllRaw() {
  return readStorage(STORAGE_KEYS.ORDERS, [])
}

export const ordersStorage = {
  getAll() {
    return getAllRaw().sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    )
  },

  getById(id) {
    return getAllRaw().find((o) => o.id === id) ?? null
  },

  create(orderData) {
    const orders = getAllRaw()
    const order = {
      id: generateId('TD'),
      createdAt: new Date().toISOString(),
      status: ORDER_STATUS.NEW,
      ...orderData,
    }
    orders.unshift(order)
    writeStorage(STORAGE_KEYS.ORDERS, orders)
    window.dispatchEvent(new CustomEvent('orders-updated'))
    return order
  },

  updateStatus(id, status) {
    const orders = getAllRaw()
    const index = orders.findIndex((o) => o.id === id)
    if (index === -1) return null
    orders[index] = { ...orders[index], status }
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
