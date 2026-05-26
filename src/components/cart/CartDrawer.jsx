import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/utils'
import { Button } from '../ui/Button'
import { CartItem } from './CartItem'
import { EmptyCart } from './EmptyCart'

export function CartDrawer() {
  const {
    items,
    cartOpen,
    closeCart,
    openCheckout,
    totalItems,
    subtotal,
  } = useCart()

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen])

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-bg-primary/70 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-bg-secondary shadow-2xl"
            role="dialog"
            aria-label="Корзина"
          >
            <div className="flex items-center justify-between border-b border-cream/5 px-6 py-5">
              <div>
                <h2 className="font-display text-2xl font-light text-cream">
                  Корзина
                </h2>
                {totalItems > 0 && (
                  <p className="mt-0.5 text-xs font-light text-cream-muted/50">
                    {totalItems}{' '}
                    {totalItems === 1
                      ? 'позиция'
                      : totalItems < 5
                        ? 'позиции'
                        : 'позиций'}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="flex h-10 w-10 items-center justify-center text-cream-muted transition-colors hover:text-cream"
                aria-label="Закрыть корзину"
              >
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItem key={item.productId} item={item} />
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-cream/5 bg-bg-secondary/95 p-6 backdrop-blur-xl">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between font-light text-cream-muted/70">
                      <span>Сумма заказа</span>
                      <span className="tabular-nums text-cream">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between font-light text-cream-muted/45">
                      <span>Доставка</span>
                      <span>рассчитывается отдельно</span>
                    </div>
                  </div>

                  <p className="mt-4 text-[11px] font-light leading-relaxed text-cream-muted/35">
                    Все заказы — по предзаказу. После оформления мы свяжемся
                    для подтверждения деталей и уточним стоимость доставки.
                  </p>

                  <Button
                    size="lg"
                    className="mt-5 w-full"
                    onClick={openCheckout}
                  >
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
