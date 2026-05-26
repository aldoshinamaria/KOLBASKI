import { motion } from 'framer-motion'
import { ArrowRight, Send } from 'lucide-react'
import { Button } from '../ui/Button'
import { TELEGRAM_URL, assetUrl, scrollToProducts } from '../../lib/utils'

function HeroVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-sm">
      <img
        src={assetUrl('/gallery/hero.png')}
        alt="Колбасы, выпечка и гастрономия ручной работы — Тесто и Дым"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />

      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-bg-primary/40 lg:to-bg-primary/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-bg-primary/20" />
      <div className="pointer-events-none absolute inset-0 vignette" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="glass rounded-sm p-4 md:p-5">
          <p className="font-display text-base font-light italic text-cream/90 md:text-lg">
            «Красивый домашний стол — без лишней суеты»
          </p>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-24 md:pt-0 md:pb-16">
      <div className="pointer-events-none absolute inset-0 vignette" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-6 text-sm font-light text-cream-muted/70"
          >
            Ремесленный гастробренд
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-4xl font-light leading-[1.15] tracking-tight text-cream sm:text-5xl md:text-6xl lg:text-[3.75rem]"
          >
            Домашняя гастрономия{' '}
            <span className="italic text-amber-glow">ручной работы</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 max-w-lg text-base font-light leading-relaxed text-cream-muted/80 md:text-lg md:leading-relaxed"
          >
            Колбасы, выпечка, гастробоксы и сезонные наборы для красивого
            домашнего стола
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button size="lg" onClick={scrollToProducts} data-cursor="hover">
              Выбрать бокс
              <ArrowRight size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(TELEGRAM_URL, '_blank')}
              data-cursor="hover"
            >
              <Send size={16} />
              Написать в Telegram
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-14 flex flex-wrap items-center gap-6 border-t border-cream/5 pt-8 sm:gap-8"
          >
            {[
              { value: '4', label: 'гастробокса' },
              { value: '100%', label: 'ручная работа' },
              { value: 'Мало', label: 'партии — свежее' },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-6">
                {i > 0 && <div className="hidden h-8 w-px bg-cream/10 sm:block" />}
                <div>
                  <p className="font-display text-2xl font-light text-cream">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-light text-cream-muted/50">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 aspect-[4/5] w-full lg:order-2 lg:aspect-auto lg:h-[78vh]"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-light tracking-widest text-cream-muted/30">
            Листайте вниз
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-cream/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
