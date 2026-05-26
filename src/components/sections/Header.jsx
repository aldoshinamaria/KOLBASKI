import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn, scrollToProducts } from '../../lib/utils'
import { useCart } from '../../context/CartContext'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { CartButton } from '../cart/CartButton'

const navLinks = [
  { href: '#about', label: 'О бренде' },
  { href: '#products', label: 'Гастробоксы' },
  { href: '#delivery', label: 'Доставка' },
  { href: '#how', label: 'Как заказать' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#reviews', label: 'Отзывы' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, openCart, openCheckout } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleOrder = () => {
    if (totalItems > 0) {
      openCheckout()
    } else {
      scrollToProducts()
    }
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={cn(
          'fixed top-0 right-0 left-0 z-50 transition-all duration-500',
          scrolled ? 'glass-strong py-3' : 'bg-transparent py-5 md:py-6',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <a href="#" className="group flex items-center" data-cursor="hover">
            <Logo
              size="sm"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-light tracking-wide text-cream-muted transition-colors duration-300 hover:text-cream"
                data-cursor="hover"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/track"
              className="text-sm font-light tracking-wide text-cream-muted transition-colors duration-300 hover:text-cream"
              data-cursor="hover"
            >
              Мой заказ
            </Link>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <CartButton showLabel />
            <Button size="sm" onClick={handleOrder}>
              {totalItems > 0 ? 'Оформить заказ' : 'Выбрать бокс'}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <CartButton className="h-11 w-11 justify-center" />
            <button
              className="flex h-11 w-11 items-center justify-center text-cream"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg-primary/96 backdrop-blur-xl lg:hidden"
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="font-display text-3xl font-light text-cream"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navLinks.length * 0.08 }}
          >
            <Link
              to="/track"
              className="font-display text-3xl font-light text-cream"
              onClick={() => setMobileOpen(false)}
            >
              Мой заказ
            </Link>
          </motion.div>
          <Button size="lg" onClick={handleOrder}>
            {totalItems > 0 ? 'Оформить заказ' : 'Выбрать бокс'}
          </Button>
        </motion.div>
      )}
    </>
  )
}
