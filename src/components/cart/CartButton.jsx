import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { cn } from '../../lib/utils'

export function CartButton({ className, showLabel = false }) {
  const { totalItems, openCart } = useCart()

  return (
    <button
      type="button"
      onClick={openCart}
      className={cn(
        'relative flex items-center gap-2 rounded-sm transition-colors duration-300',
        'text-cream-muted hover:text-cream',
        className,
      )}
      aria-label={`Корзина${totalItems > 0 ? `, ${totalItems} поз.` : ''}`}
      data-cursor="hover"
    >
      <ShoppingBag size={20} strokeWidth={1.5} />
      {showLabel && (
        <span className="hidden text-sm font-light xl:inline">Корзина</span>
      )}
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-crust px-1 text-[10px] font-medium text-bg-primary"
        >
          {totalItems}
        </motion.span>
      )}
    </button>
  )
}
