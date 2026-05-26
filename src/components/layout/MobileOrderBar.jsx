import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice, scrollToProducts } from '../../lib/utils'
import { Button } from '../ui/Button'

export function MobileOrderBar() {
  const { totalItems, subtotal, openCart, openCheckout } = useCart()

  const handleClick = () => {
    if (totalItems > 0) {
      openCart()
    } else {
      scrollToProducts()
    }
  }

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-cream/8 bg-bg-secondary/95 p-4 backdrop-blur-xl md:hidden"
    >
      {totalItems > 0 ? (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={openCart}
            className="relative flex h-[52px] min-w-[52px] items-center justify-center rounded-sm border border-cream/10 text-cream-muted"
            aria-label="Открыть корзину"
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-crust px-1 text-[10px] font-medium text-bg-primary">
              {totalItems}
            </span>
          </button>
          <Button size="lg" className="flex-1" onClick={openCheckout}>
            Оформить · {formatPrice(subtotal)}
          </Button>
        </div>
      ) : (
        <Button size="lg" className="w-full" onClick={handleClick}>
          Выбрать бокс
        </Button>
      )}
    </motion.div>
  )
}
