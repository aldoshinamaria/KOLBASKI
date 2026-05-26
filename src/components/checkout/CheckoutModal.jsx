import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, X, MapPin, Store } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import {
  DELIVERY_TYPES,
  validateCheckout,
  submitOrder,
} from '../../lib/order'
import { STORAGE_KEYS } from '../../lib/constants'
import { writeStorage } from '../../lib/storage'
import { formatPrice, cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'

function SuccessState({ orderId, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center px-6 py-12 text-center md:px-10 md:py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-crust/30 bg-crust/10"
      >
        <Check size={28} className="text-crust" />
      </motion.div>
      <h3 className="font-display text-2xl font-light text-cream md:text-3xl">
        Заказ принят
      </h3>
      <p className="mt-1 text-xs font-light text-cream-muted/40">
        № {orderId}
      </p>
      <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-cream-muted/65">
        Спасибо! Ваш заказ принят. Мы свяжемся с вами для подтверждения
        деталей. Сохраните номер заказа — статус можно проверить на сайте.
      </p>
      <Link to="/track" onClick={onClose} className="mt-6 w-full">
        <Button size="lg" className="w-full" variant="outline">
          Отслеживать заказ
        </Button>
      </Link>
      <Button size="lg" className="mt-3 w-full" onClick={onClose}>
        Хорошо
      </Button>
    </motion.div>
  )
}

export function CheckoutModal() {
  const {
    items,
    subtotal,
    checkoutOpen,
    closeCheckout,
    clearCart,
  } = useCart()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
    deliveryType: DELIVERY_TYPES.DELIVERY,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    if (checkoutOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      if (status === 'success') {
        setForm({
          name: '',
          phone: '',
          address: '',
          comment: '',
          deliveryType: DELIVERY_TYPES.DELIVERY,
        })
        setStatus('idle')
        setOrderId(null)
        setErrors({})
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [checkoutOpen, status])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleDeliveryType = (type) => {
    setForm((prev) => ({ ...prev, deliveryType: type }))
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: undefined }))
    }
  }

  const handleClose = () => {
    closeCheckout()
  }

  const handleSuccessClose = () => {
    clearCart()
    closeCheckout()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateCheckout({ ...form, items })
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')

    try {
      const result = await submitOrder({
        items: items.map((i) => ({
          productId: i.productId,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
        })),
        subtotal,
        deliveryType: form.deliveryType,
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          address:
            form.deliveryType === DELIVERY_TYPES.DELIVERY
              ? form.address.trim()
              : null,
          comment: form.comment.trim() || null,
        },
        paymentStatus: 'not_required',
      })

      setOrderId(result.orderId)
      writeStorage(STORAGE_KEYS.LAST_ORDER, {
        orderId: result.orderId,
        phone: form.phone.trim(),
      })
      setStatus('success')
    } catch {
      setStatus('idle')
      setErrors({ submit: 'Не удалось оформить заказ. Попробуйте ещё раз.' })
    }
  }

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-bg-primary/80 backdrop-blur-md"
            onClick={status !== 'loading' ? handleClose : undefined}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[5vh] z-[90] mx-auto flex max-h-[90vh] max-w-lg flex-col overflow-hidden rounded-sm bg-bg-secondary shadow-2xl md:inset-x-auto md:top-1/2 md:w-full md:-translate-y-1/2"
            role="dialog"
            aria-label="Оформление заказа"
          >
            {status !== 'success' && (
              <div className="flex items-center justify-between border-b border-cream/5 px-6 py-4">
                <h2 className="font-display text-xl font-light text-cream md:text-2xl">
                  Оформление заказа
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={status === 'loading'}
                  className="flex h-10 w-10 items-center justify-center text-cream-muted transition-colors hover:text-cream disabled:opacity-50"
                  aria-label="Закрыть"
                >
                  <X size={22} />
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              {status === 'success' ? (
                <SuccessState orderId={orderId} onClose={handleSuccessClose} />
              ) : (
                <form onSubmit={handleSubmit} noValidate className="p-6 md:p-8">
                  <div className="mb-6 rounded-sm border border-cream/5 bg-bg-tertiary/30 p-4">
                    <p className="text-[11px] font-light text-cream-muted/45">
                      Ваш заказ
                    </p>
                    <ul className="mt-2 space-y-1">
                      {items.map((item) => (
                        <li
                          key={item.productId}
                          className="flex justify-between text-sm font-light text-cream-muted/70"
                        >
                          <span>
                            «{item.title}» × {item.quantity}
                          </span>
                          <span className="tabular-nums">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex justify-between border-t border-cream/5 pt-3">
                      <span className="text-sm font-light text-cream">Итого</span>
                      <span className="font-display text-lg font-light text-crust">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] font-light text-cream-muted/35">
                      Доставка оплачивается отдельно — уточним при подтверждении
                    </p>
                  </div>

                  <p className="mb-4 text-[11px] font-light leading-relaxed text-cream-muted/40">
                    Предзаказ: мы готовим небольшими партиями вручную. После
                    оформления свяжемся для подтверждения деталей.
                  </p>

                  <div className="mb-6 grid grid-cols-2 gap-3">
                    {[
                      {
                        type: DELIVERY_TYPES.DELIVERY,
                        icon: MapPin,
                        label: 'Доставка',
                      },
                      {
                        type: DELIVERY_TYPES.PICKUP,
                        icon: Store,
                        label: 'Самовывоз',
                      },
                    ].map(({ type, icon: Icon, label }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleDeliveryType(type)}
                        className={cn(
                          'flex flex-col items-center gap-2 rounded-sm border px-4 py-4 transition-all duration-300',
                          form.deliveryType === type
                            ? 'border-crust/40 bg-crust/5 text-cream'
                            : 'border-cream/8 text-cream-muted/60 hover:border-cream/15',
                        )}
                      >
                        <Icon size={20} strokeWidth={1.5} />
                        <span className="text-sm font-light">{label}</span>
                      </button>
                    ))}
                  </div>

                  <p className="mb-5 text-xs font-light leading-relaxed text-cream-muted/45">
                    Доставка возможна по Обнинску и в радиусе до 10 км от
                    города. Стоимость доставки рассчитывается отдельно.
                  </p>

                  <div className="space-y-5">
                    <Input
                      label="Имя"
                      name="name"
                      placeholder="Как к вам обращаться"
                      value={form.name}
                      onChange={handleChange}
                      error={errors.name}
                      autoComplete="name"
                    />

                    <Input
                      label="Телефон"
                      name="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={form.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      autoComplete="tel"
                    />

                    {form.deliveryType === DELIVERY_TYPES.DELIVERY && (
                      <Input
                        label="Адрес доставки"
                        name="address"
                        placeholder="Обнинск, улица, дом, квартира"
                        value={form.address}
                        onChange={handleChange}
                        error={errors.address}
                        autoComplete="street-address"
                      />
                    )}

                    <Textarea
                      label="Комментарий к заказу"
                      name="comment"
                      placeholder="Пожелания по составу, удобное время, дополнительные детали..."
                      rows={3}
                      value={form.comment}
                      onChange={handleChange}
                    />
                  </div>

                  {errors.submit && (
                    <p className="mt-4 text-xs font-light text-red-400/80">
                      {errors.submit}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-6 w-full"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Оформляем...
                      </>
                    ) : (
                      'Оформить заказ'
                    )}
                  </Button>

                  <p className="mt-4 text-center text-[11px] font-light text-cream-muted/30">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных
                    данных. Онлайн-оплата будет доступна позже.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
