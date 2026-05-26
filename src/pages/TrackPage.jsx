import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { cn } from '../lib/utils'
import { OrderTrackForm } from '../components/track/OrderTrackForm'
import { QuestionTrackForm } from '../components/track/QuestionTrackForm'
import { readStorage } from '../lib/storage'
import { STORAGE_KEYS } from '../lib/constants'

export function TrackPage() {
  const [tab, setTab] = useState('order')
  const lastOrder = readStorage(STORAGE_KEYS.LAST_ORDER, null)
  const lastQuestion = readStorage(STORAGE_KEYS.LAST_QUESTION, null)

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto max-w-lg px-6 py-12 md:py-16">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-light text-cream-muted transition-colors hover:text-cream"
        >
          <ArrowLeft size={16} />
          На главную
        </Link>

        <h1 className="font-display text-3xl font-light text-cream md:text-4xl">
          Проверить заказ
        </h1>
        <p className="mt-4 text-sm font-light leading-relaxed text-cream-muted/60">
          Введите номер и телефон, указанные при оформлении. Статус заказа и
          наш ответ обновляются здесь — сохраните номер после оформления.
        </p>

        <div className="mt-8 flex gap-2 border-b border-cream/5">
          {[
            { id: 'order', label: 'Мой заказ' },
            { id: 'question', label: 'Мой вопрос' },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                'border-b-2 px-4 py-3 text-sm font-light transition-colors',
                tab === id
                  ? 'border-crust text-cream'
                  : 'border-transparent text-cream-muted/50 hover:text-cream-muted',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === 'order' ? (
            <OrderTrackForm
              initialOrderId={lastOrder?.orderId || ''}
              initialPhone={lastOrder?.phone || ''}
            />
          ) : (
            <QuestionTrackForm
              initialQuestionId={lastQuestion?.questionId || ''}
              initialPhone={lastQuestion?.phone || ''}
            />
          )}
        </div>
      </div>
    </div>
  )
}
