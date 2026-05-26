import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { trackStorage } from '../../lib/storage/trackStorage'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { OrderStatusView } from './TrackViews'

export function OrderTrackForm({ initialOrderId = '', initialPhone = '' }) {
  const [orderId, setOrderId] = useState(initialOrderId)
  const [phone, setPhone] = useState(initialPhone)
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setOrder(null)
    setLoading(true)
    try {
      const found = await trackStorage.findOrder(orderId, phone)
      if (!found) {
        setError('Заказ не найден. Проверьте номер и телефон.')
      } else {
        setOrder(found)
      }
    } catch {
      setError('Не удалось найти заказ. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Номер заказа"
          name="orderId"
          placeholder="TD-..."
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        <Input
          label="Телефон"
          name="phone"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {error && (
          <p className="text-sm font-light text-red-400/80">{error}</p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Ищем...
            </>
          ) : (
            'Проверить статус'
          )}
        </Button>
      </form>

      {order && (
        <div className="mt-8">
          <OrderStatusView order={order} />
        </div>
      )}
    </div>
  )
}
