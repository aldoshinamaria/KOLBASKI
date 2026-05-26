import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { Button } from '../ui/Button'
import { scrollToProducts } from '../../lib/utils'
import { useCart } from '../../context/CartContext'

export function EmptyCart({ onClose }) {
  const { closeCart } = useCart()

  const handleBrowse = () => {
    closeCart()
    onClose?.()
    scrollToProducts()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center px-6 py-16 text-center"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-cream/10 bg-bg-tertiary/50">
        <ShoppingBag size={28} className="text-cream-muted/30" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-2xl font-light text-cream">
        Корзина пуста
      </h3>
      <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-cream-muted/55">
        Выберите гастробокс — мы соберём его вручную и свяжемся для
        подтверждения заказа.
      </p>
      <Button size="lg" className="mt-8" onClick={handleBrowse}>
        Выбрать бокс
      </Button>
    </motion.div>
  )
}
