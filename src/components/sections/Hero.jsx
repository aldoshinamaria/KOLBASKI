import { motion } from 'framer-motion'
import { ArrowRight, Send } from 'lucide-react'
import { Button } from '../ui/Button'
import { TELEGRAM_URL, scrollToProducts } from '../../lib/utils'

function SmokeLayer({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-t from-smoke/40 to-transparent blur-2xl ${className}`}
      animate={{
        opacity: [0.2, 0.45, 0.2],
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

function HeroVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-bg-secondary to-bg-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgb(196_149_106/0.12),transparent_60%)]" />

      {/* деревянная доска */}
      <div className="absolute inset-x-6 bottom-16 top-24 rounded-sm bg-gradient-to-b from-wood/20 via-wood/10 to-transparent opacity-60" />
      <div className="absolute inset-x-8 bottom-20 top-28 rounded-sm border border-cream/5 bg-bg-tertiary/30" />

      {/* тёплый свет */}
      <motion.div
        className="absolute right-1/4 top-16 h-32 w-32 rounded-full bg-amber-soft/15 blur-3xl"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* огонь */}
      <motion.div
        className="absolute bottom-28 left-1/3 h-16 w-10 rounded-full bg-gradient-to-t from-red-900/30 via-orange-600/20 to-transparent blur-md"
        animate={{ opacity: [0.5, 0.8, 0.5], scaleY: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* дым */}
      <SmokeLayer className="bottom-32 left-1/4 h-24 w-32" delay={0} />
      <SmokeLayer className="bottom-40 left-1/3 h-20 w-28" delay={1.5} />
      <SmokeLayer className="bottom-36 right-1/3 h-28 w-36" delay={0.8} />

      {/* колбаски */}
      <div className="absolute bottom-32 left-12 flex rotate-[-8deg] flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-3 rounded-full bg-gradient-to-r from-crust/80 to-caramel/60 shadow-lg"
            style={{ width: `${72 - i * 8}px`, marginLeft: `${i * 4}px` }}
          />
        ))}
      </div>

      {/* хлеб */}
      <div className="absolute right-10 bottom-28">
        <div className="relative h-20 w-24 rotate-6 rounded-full bg-gradient-to-br from-crust/70 via-amber-glow/50 to-caramel/40 shadow-xl">
          <div className="absolute inset-2 rounded-full border border-cream/10 opacity-40" />
          <div className="absolute top-3 left-1/2 h-px w-12 -translate-x-1/2 bg-cream/20" />
          <div className="absolute top-5 left-1/2 h-px w-10 -translate-x-1/2 bg-cream/15" />
        </div>
      </div>

      {/* пампушки */}
      <div className="absolute top-1/3 right-16 flex gap-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-glow/60 to-cream/30 shadow-md"
            style={{ transform: `translateY(${i * 6}px)` }}
          />
        ))}
      </div>

      {/* лепёшка */}
      <div className="absolute top-1/2 left-16 h-14 w-14 rounded-full border-2 border-crust/30 bg-gradient-to-br from-caramel/30 to-transparent opacity-70" />

      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/30" />
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
