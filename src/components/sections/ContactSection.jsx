import { Send, MessageCircle } from 'lucide-react'
import { SectionReveal } from '../ui/SectionReveal'
import { Button } from '../ui/Button'
import { TELEGRAM_URL, VK_URL } from '../../lib/utils'

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 pb-32 md:py-32 md:pb-40 lg:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/5 to-transparent" />

      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <SectionReveal>
          <p className="text-sm font-light text-cream-muted/60">
            Остались вопросы?
          </p>
          <h2 className="mt-6 font-display text-4xl font-light text-cream md:text-5xl">
            Напишите нам
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-cream-muted/65">
            Telegram и ВКонтакте — для уточнения деталей, индивидуальных
            заказов, корпоративных наборов и консультации по составу.
            Оформить заказ удобнее через корзину на сайте.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(TELEGRAM_URL, '_blank')}
              data-cursor="hover"
            >
              <Send size={16} />
              Написать в Telegram
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(VK_URL, '_blank')}
              data-cursor="hover"
            >
              <MessageCircle size={16} />
              Написать ВКонтакте
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
