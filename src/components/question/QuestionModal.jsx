import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, MessageCircle, X } from 'lucide-react'
import { validateQuestion, submitQuestion } from '../../lib/order'
import { STORAGE_KEYS } from '../../lib/constants'
import { writeStorage } from '../../lib/storage'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'

export function QuestionModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', text: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [questionId, setQuestionId] = useState(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      if (status === 'success') {
        setForm({ name: '', phone: '', text: '' })
        setStatus('idle')
        setQuestionId(null)
        setErrors({})
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, status])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateQuestion(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setStatus('loading')
    try {
      const result = await submitQuestion(form)
      setQuestionId(result.questionId)
      writeStorage(STORAGE_KEYS.LAST_QUESTION, {
        questionId: result.questionId,
        phone: form.phone.trim(),
      })
      setStatus('success')
    } catch {
      setStatus('idle')
      setErrors({ submit: 'Не удалось отправить вопрос. Попробуйте ещё раз.' })
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-bg-primary/80 backdrop-blur-md"
            onClick={status !== 'loading' ? onClose : undefined}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[8vh] z-[90] mx-auto max-h-[84vh] max-w-md overflow-y-auto rounded-sm bg-bg-secondary shadow-2xl md:top-1/2 md:-translate-y-1/2"
            role="dialog"
            aria-label="Задать вопрос"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center px-6 py-12 text-center">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-crust/30 bg-crust/10">
                  <Check size={24} className="text-crust" />
                </div>
                <h3 className="font-display text-xl font-light text-cream">
                  Спасибо!
                </h3>
                {questionId && (
                  <p className="mt-2 text-xs font-light text-cream-muted/40">
                    № {questionId}
                  </p>
                )}
                <p className="mt-3 text-sm font-light leading-relaxed text-cream-muted/65">
                  Мы получили ваш вопрос и скоро свяжемся с вами. Сохраните
                  номер — ответ можно проверить на сайте.
                </p>
                <Link to="/track" onClick={onClose} className="mt-6 w-full">
                  <Button size="lg" className="w-full" variant="outline">
                    Проверить ответ
                  </Button>
                </Link>
                <Button size="lg" className="mt-3 w-full" onClick={onClose}>
                  Хорошо
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-cream/5 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={20} className="text-crust/70" />
                    <h2 className="font-display text-xl font-light text-cream">
                      Задать вопрос
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={status === 'loading'}
                    className="flex h-10 w-10 items-center justify-center text-cream-muted hover:text-cream"
                    aria-label="Закрыть"
                  >
                    <X size={22} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5 p-6">
                  <p className="text-sm font-light leading-relaxed text-cream-muted/55">
                    Уточните состав, доставку или обсудите индивидуальный и
                    корпоративный заказ — мы ответим лично.
                  </p>

                  <Input
                    label="Имя"
                    name="name"
                    placeholder="Как к вам обращаться"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                  />

                  <Input
                    label="Телефон"
                    name="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />

                  <Textarea
                    label="Ваш вопрос"
                    name="text"
                    placeholder="Напишите, что хотите уточнить..."
                    rows={4}
                    value={form.text}
                    onChange={handleChange}
                    error={errors.text}
                  />

                  {errors.submit && (
                    <p className="text-xs font-light text-red-400/80">
                      {errors.submit}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      'Отправить вопрос'
                    )}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
