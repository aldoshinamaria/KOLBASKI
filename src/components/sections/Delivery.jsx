import { MapPin, Clock, Package, PhoneCall } from 'lucide-react'
import { SectionReveal } from '../ui/SectionReveal'

const deliveryPoints = [
  {
    icon: MapPin,
    text: 'Доставка по Обнинску',
  },
  {
    icon: MapPin,
    text: 'Доставка за пределы Обнинска в радиусе до 10 км',
  },
  {
    icon: Package,
    text: 'Стоимость доставки рассчитывается отдельно',
  },
  {
    icon: Clock,
    text: 'Все заказы оформляются по предзаказу',
  },
  {
    icon: Package,
    text: 'Мы готовим небольшими партиями вручную',
  },
  {
    icon: PhoneCall,
    text: 'После оформления заказа мы связываемся для подтверждения деталей',
  },
]

export function Delivery() {
  return (
    <section id="delivery" className="relative py-24 md:py-32 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionReveal>
            <p className="text-sm font-light text-cream-muted/60">
              Доставка и предзаказ
            </p>
            <h2 className="mt-6 font-display text-4xl font-light text-cream md:text-5xl">
              Работаем локально —{' '}
              <span className="italic text-amber-glow">готовим вручную</span>
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-cream-muted/65">
              Мы не массовая доставка. Каждый заказ собираем сами, небольшими
              партиями — поэтому все боксы оформляются заранее, по предзаказу.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <ul className="space-y-4">
              {deliveryPoints.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-4 rounded-sm craft-border bg-bg-secondary/30 p-5 transition-colors duration-300 hover:bg-bg-secondary/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-cream/5 bg-bg-tertiary/50">
                    <Icon
                      size={18}
                      className="text-crust/70"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="pt-2 text-sm font-light leading-relaxed text-cream-muted/75">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
