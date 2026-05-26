import { useEffect, useState } from 'react'
import { ChevronDown, Trash2 } from 'lucide-react'
import { ordersStorage } from '../../lib/storage/ordersStorage'
import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  DELIVERY_TYPE_LABELS,
} from '../../lib/constants'
import { formatDateTime } from '../../lib/storage'
import { formatPrice, cn } from '../../lib/utils'
import { Button } from '../ui/Button'

export function AdminOrdersTab() {
  const [orders, setOrders] = useState([])
  const [expanded, setExpanded] = useState(null)

  const refresh = () => setOrders(ordersStorage.getAll())

  useEffect(() => {
    refresh()
    const handler = () => refresh()
    window.addEventListener('orders-updated', handler)
    return () => window.removeEventListener('orders-updated', handler)
  }, [])

  const handleStatusChange = (id, status) => {
    ordersStorage.updateStatus(id, status)
    refresh()
  }

  const handleDelete = (id) => {
    if (window.confirm('Удалить этот заказ?')) {
      ordersStorage.remove(id)
      if (expanded === id) setExpanded(null)
      refresh()
    }
  }

  if (orders.length === 0) {
    return (
      <p className="py-12 text-center text-sm font-light text-cream-muted/50">
        Заказов пока нет
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-sm border border-cream/8 bg-bg-secondary/40"
        >
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-lg font-light text-cream">
                  {order.id}
                </span>
                <span
                  className={cn(
                    'rounded-sm px-2 py-0.5 text-[11px] font-light',
                    order.status === ORDER_STATUS.NEW
                      ? 'bg-crust/20 text-amber-glow'
                      : 'bg-bg-tertiary text-cream-muted/60',
                  )}
                >
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
              </div>
              <p className="mt-1 text-sm font-light text-cream-muted/60">
                {formatDateTime(order.createdAt)} · {order.customer.name} ·{' '}
                {order.customer.phone}
              </p>
              <p className="mt-1 text-sm font-light text-crust">
                {formatPrice(order.subtotal)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                  className="appearance-none rounded-sm border border-cream/10 bg-bg-tertiary/50 py-2 pr-8 pl-3 text-sm font-light text-cream focus:border-crust/40 focus:outline-none"
                >
                  {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-cream-muted/40"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setExpanded(expanded === order.id ? null : order.id)
                }
              >
                {expanded === order.id ? 'Скрыть' : 'Подробнее'}
              </Button>
              <button
                type="button"
                onClick={() => handleDelete(order.id)}
                className="flex h-9 w-9 items-center justify-center text-cream-muted/40 hover:text-red-400/70"
                aria-label="Удалить заказ"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {expanded === order.id && (
            <div className="border-t border-cream/5 px-5 py-5 text-sm font-light">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-cream-muted/45">Способ получения</p>
                  <p className="mt-1 text-cream">
                    {DELIVERY_TYPE_LABELS[order.deliveryType]}
                  </p>
                </div>
                {order.deliveryType === 'delivery' && order.customer.address && (
                  <div>
                    <p className="text-cream-muted/45">Адрес доставки</p>
                    <p className="mt-1 text-cream">{order.customer.address}</p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <p className="text-cream-muted/45">Состав заказа</p>
                <ul className="mt-2 space-y-1">
                  {order.items.map((item) => (
                    <li
                      key={`${item.productId}-${item.title}`}
                      className="flex justify-between text-cream-muted/75"
                    >
                      <span>
                        «{item.title}» × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {order.customer.comment && (
                <div className="mt-4">
                  <p className="text-cream-muted/45">Комментарий</p>
                  <p className="mt-1 text-cream-muted/75">
                    {order.customer.comment}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
