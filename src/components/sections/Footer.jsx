import { Send, Phone } from 'lucide-react'
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  TELEGRAM_URL,
  VK_URL,
  PHONE,
  PHONE_HREF,
} from '../../lib/utils'
import { Logo } from '../ui/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-cream/5 py-16 pb-28 md:py-20 md:pb-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <a href="#" className="group inline-flex flex-col items-start" data-cursor="hover">
              <Logo
                size="md"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-cream-muted/45">
                {BRAND_TAGLINE}. Готовим небольшими партиями по предзаказу.
              </p>
            </a>
          </div>

          <div>
            <p className="text-[11px] font-light text-cream-muted/40">
              Контакты
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 text-sm font-light text-cream-muted transition-colors duration-300 hover:text-cream"
                  data-cursor="hover"
                >
                  <Phone size={14} className="text-crust/50" />
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-light text-cream-muted transition-colors duration-300 hover:text-cream"
                  data-cursor="hover"
                >
                  <Send size={14} className="text-crust/50" />
                  Написать в Telegram
                </a>
              </li>
              <li>
                <a
                  href={VK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-light text-cream-muted transition-colors duration-300 hover:text-cream"
                  data-cursor="hover"
                >
                  <span className="flex h-3.5 w-3.5 items-center justify-center text-[9px] font-medium text-crust/50">
                    VK
                  </span>
                  ВКонтакте
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-light text-cream-muted/40">
              Навигация
            </p>
            <ul className="mt-4 space-y-3">
              {[
                { href: '#about', label: 'О бренде' },
                { href: '#products', label: 'Гастробоксы' },
                { href: '#delivery', label: 'Доставка' },
                { href: '#how', label: 'Как заказать' },
                { href: '#contact', label: 'Контакты' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-light text-cream-muted transition-colors duration-300 hover:text-cream"
                    data-cursor="hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/5 pt-8 md:flex-row">
          <p className="text-xs font-light text-cream-muted/30">
            © {year} {BRAND_NAME}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
