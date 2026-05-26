import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/utils'
import { Button } from '../ui/Button'

export function ProductCard({ product, index }) {
  const { addItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const priceDisplay = product.priceLabel ?? formatPrice(product.price)

  const handleAdd = () => {
    addItem(product)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-sm craft-border craft-border-hover bg-bg-secondary/50 transition-all duration-500 glow-warm-hover"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.imageAlt || `Гастробокс «${product.title}»`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/20 to-transparent" />

        {(product.badge || product.seasonal) && (
          <div className="absolute top-4 right-4">
            <span className="rounded-sm bg-caramel/20 px-3 py-1.5 text-[11px] font-light text-amber-glow backdrop-blur-sm">
              {product.badge || 'Сезонный'}
            </span>
          </div>
        )}

        <div className="absolute top-4 left-4">
          <span className="glass rounded-sm px-3 py-1.5 text-[11px] font-light text-cream-muted/70">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-light text-cream">
              «{product.title}»
            </h3>
            {product.subtitle && (
              <p className="mt-1 text-xs font-light text-cream-muted/50">
                {product.subtitle}
              </p>
            )}
          </div>
          <p className="shrink-0 font-display text-xl font-light text-crust">
            {priceDisplay}
          </p>
        </div>

        <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-cream-muted/65">
          {product.description}
        </p>

        <div className="mt-6 border-t border-cream/5 pt-6">
          <p className="mb-3 text-[11px] font-light text-cream-muted/45">
            Состав
          </p>
          <ul className="space-y-2">
            {product.composition.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs font-light text-cream-muted/55"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crust/50" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Button
          size="sm"
          className="mt-8 w-full"
          onClick={handleAdd}
          variant={justAdded ? 'secondary' : 'primary'}
        >
          {justAdded ? (
            <>
              <Check size={14} />
              Добавлено
            </>
          ) : (
            <>
              <ShoppingBag size={14} />
              Добавить в корзину
            </>
          )}
        </Button>
      </div>
    </motion.article>
  )
}
