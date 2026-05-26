import { useEffect, useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { questionsStorage } from '../../lib/storage/questionsStorage'
import { QUESTION_STATUS_LABELS } from '../../lib/constants'
import { formatDateTime } from '../../lib/storage'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'

export function AdminQuestionsTab() {
  const [questions, setQuestions] = useState([])

  const refresh = () => setQuestions(questionsStorage.getAll())

  useEffect(() => {
    refresh()
    const handler = () => refresh()
    window.addEventListener('questions-updated', handler)
    return () => window.removeEventListener('questions-updated', handler)
  }, [])

  const handleMarkAnswered = (id) => {
    questionsStorage.markAnswered(id)
    refresh()
  }

  const handleDelete = (id) => {
    if (window.confirm('Удалить этот вопрос?')) {
      questionsStorage.remove(id)
      refresh()
    }
  }

  if (questions.length === 0) {
    return (
      <p className="py-12 text-center text-sm font-light text-cream-muted/50">
        Вопросов пока нет
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <div
          key={q.id}
          className="rounded-sm border border-cream/8 bg-bg-secondary/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-light text-cream">{q.name}</span>
                <span className="text-sm font-light text-cream-muted/50">
                  {q.phone}
                </span>
                <span
                  className={cn(
                    'rounded-sm px-2 py-0.5 text-[11px] font-light',
                    q.status === 'new'
                      ? 'bg-crust/20 text-amber-glow'
                      : 'bg-bg-tertiary text-cream-muted/50',
                  )}
                >
                  {QUESTION_STATUS_LABELS[q.status]}
                </span>
              </div>
              <p className="mt-1 text-xs font-light text-cream-muted/40">
                {formatDateTime(q.createdAt)}
              </p>
              <p className="mt-3 text-sm font-light leading-relaxed text-cream-muted/75">
                {q.text}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              {q.status === 'new' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkAnswered(q.id)}
                >
                  <Check size={14} />
                  Отвечен
                </Button>
              )}
              <button
                type="button"
                onClick={() => handleDelete(q.id)}
                className="flex h-9 w-9 items-center justify-center text-cream-muted/40 hover:text-red-400/70"
                aria-label="Удалить вопрос"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
