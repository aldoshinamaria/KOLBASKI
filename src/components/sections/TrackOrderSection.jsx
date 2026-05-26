import { SectionReveal } from '../ui/SectionReveal'
import { OrderTrackForm } from '../track/OrderTrackForm'
import { readStorage } from '../../lib/storage'
import { STORAGE_KEYS } from '../../lib/constants'

export function TrackOrderSection() {
  const lastOrder = readStorage(STORAGE_KEYS.LAST_ORDER, null)

  return (
    <section id="track-order" className="relative py-24 md:py-32 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/5 to-transparent" />

      <div className="mx-auto max-w-lg px-6 md:px-10">
        <SectionReveal className="mb-10 text-center md:mb-12">
          <p className="text-sm font-light text-cream-muted/60">
            Статус заказа
          </p>
          <h2 className="mt-6 font-display text-4xl font-light text-cream md:text-5xl">
            Уже оформили заказ?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-cream-muted/60">
            Введите номер заказа и телефон, указанные при оформлении. Сайт можно
            закрыть — статус сохраняется. Пример номера:{' '}
            <span className="text-cream/75">TD-260526-4829</span>
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="rounded-sm border border-cream/8 bg-bg-secondary/40 p-6 md:p-8">
            <OrderTrackForm
              initialOrderId={lastOrder?.orderId || ''}
              initialPhone={lastOrder?.phone || ''}
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
