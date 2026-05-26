import { motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/utils'

export function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 border-b border-cream/5 py-5 last:border-0"
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-sm">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-lg font-light text-cream">
              «{item.title}»
            </p>
            {item.subtitle && (
              <p className="mt-0.5 text-xs font-light text-cream-muted/50">
                {item.subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            className="shrink-0 p-1 text-cream-muted/40 transition-colors hover:text-red-400/70"
            aria-label="Удалить из корзины"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-cream/10 text-cream-muted transition-colors hover:border-crust/30 hover:text-cream"
              aria-label="Уменьшить количество"
            >
              <Minus size={14} />
            </button>
            <span className="min-w-[1.5rem] text-center text-sm tabular-nums text-cream">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-cream/10 text-cream-muted transition-colors hover:border-crust/30 hover:text-cream"
              aria-label="Увеличить количество"
            >
              <Plus size={14} />
            </button>
          </div>
          <p className="font-display text-lg font-light text-crust">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
