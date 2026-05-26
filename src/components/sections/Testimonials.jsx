import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import { SectionReveal } from '../ui/SectionReveal'

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  const testimonial = testimonials[current]

  return (
    <section id="reviews" className="relative py-24 md:py-32 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionReveal className="mb-16 text-center md:mb-20">
          <p className="text-sm font-light text-cream-muted/60">
            Отзывы
          </p>
          <h2 className="mt-6 font-display text-4xl font-light text-cream md:text-5xl">
            Что говорят те, кто уже пробовал
          </h2>
        </SectionReveal>

        <SectionReveal>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute -inset-4 rounded-sm bg-crust/4 blur-2xl" />

            <div className="glass-strong relative rounded-sm p-8 md:p-12 glow-warm">
              <Quote
                size={32}
                className="text-crust/25"
                strokeWidth={1}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6"
                >
                  <p className="font-display text-xl font-light leading-relaxed text-cream/90 md:text-2xl md:leading-relaxed">
                    «{testimonial.text}»
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    <p className="text-sm font-light text-cream">
                      {testimonial.name}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={prev}
                        className="flex h-11 w-11 items-center justify-center rounded-sm border border-cream/10 text-cream-muted transition-all duration-300 hover:border-crust/30 hover:text-cream"
                        aria-label="Предыдущий отзыв"
                        data-cursor="hover"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        className="flex h-11 w-11 items-center justify-center rounded-sm border border-cream/10 text-cream-muted transition-all duration-300 hover:border-crust/30 hover:text-cream"
                        aria-label="Следующий отзыв"
                        data-cursor="hover"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-crust/60'
                      : 'w-4 bg-cream/10 hover:bg-cream/20'
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
