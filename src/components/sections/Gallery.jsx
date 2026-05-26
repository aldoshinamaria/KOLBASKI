import { motion } from 'framer-motion'
import { galleryItems } from '../../data/gallery'
import { SectionReveal } from '../ui/SectionReveal'
import { cn } from '../../lib/utils'

const aspectClasses = {
  tall: 'row-span-2',
  wide: 'col-span-2',
  square: '',
}

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionReveal className="mb-16 md:mb-20">
          <p className="text-sm font-light text-cream-muted/60">
            Галерея
          </p>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-4xl font-light text-cream md:text-5xl">
              Вкус, текстура, атмосфера
            </h2>
            <p className="max-w-sm text-sm font-light leading-relaxed text-cream-muted/60">
              Колбасы, выпечка, дым от огня и следы ручной работы — всё, из
              чего складывается наш стол.
            </p>
          </div>
        </SectionReveal>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:gap-4 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <SectionReveal
              key={item.id}
              delay={index * 0.05}
              className={cn(
                aspectClasses[item.aspect],
                'group relative overflow-hidden rounded-sm',
              )}
            >
              <motion.div
                className="relative h-full w-full overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                data-cursor="hover"
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                  <p className="text-[11px] font-light text-cream-muted/45">
                    {item.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-light text-cream/85 transition-colors duration-500 group-hover:text-cream">
                    {item.title}
                  </p>
                </div>

                <div className="absolute inset-0 border border-cream/0 transition-colors duration-500 group-hover:border-crust/15" />
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
