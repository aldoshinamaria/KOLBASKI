import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { questionsStorage } from '../../lib/storage/questionsStorage'
import { QUESTION_STATUS_LABELS } from '../../lib/constants'
import { formatDateTime } from '../../lib/storage'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'

export function AdminQuestionsTab() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [replies, setReplies] = useState({})
  const [expanded, setExpanded] = useState(null)
  const [saving, setSaving] = useState(null)

  const refresh = async () => {
    setLoading(true)
    try {
      const data = await questionsStorage.getAll()
      setQuestions(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
    const handler = () => refresh()
    window.addEventListener('questions-updated', handler)
    return () => window.removeEventListener('questions-updated', handler)
  }, [])

  const handleReply = async (id) => {
    const text = (replies[id] ?? '').trim()
    if (!text) {
      alert('Напишите ответ клиенту')
      return
    }
    setSaving(id)
    try {
      await questionsStorage.reply(id, text)
      setExpanded(null)
      refresh()
    } finally {
      setSaving(null)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Удалить этот вопрос?')) {
      await questionsStorage.remove(id)
      refresh()
    }
  }

  if (loading) {
    return (
      <p className="py-12 text-center text-sm font-light text-cream-muted/50">
        Загрузка вопросов...
      </p>
    )
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
                <span className="text-xs font-light text-cream-muted/40">
                  {q.id}
                </span>
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
              {q.adminReply && (
                <div className="mt-4 rounded-sm border border-crust/20 bg-crust/5 p-4">
                  <p className="text-[11px] font-light text-cream-muted/45">
                    Ваш ответ
                  </p>
                  <p className="mt-1 text-sm font-light text-cream/85">
                    {q.adminReply}
                  </p>
                </div>
              )}
            </div>

            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setExpanded(expanded === q.id ? null : q.id)
                }
              >
                {expanded === q.id ? 'Скрыть' : 'Ответить'}
              </Button>
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

          {expanded === q.id && (
            <div className="mt-5 border-t border-cream/5 pt-5">
              <Textarea
                label="Ответ клиенту (будет виден на странице «Мой вопрос»)"
                value={replies[q.id] ?? q.adminReply ?? ''}
                onChange={(e) =>
                  setReplies((prev) => ({ ...prev, [q.id]: e.target.value }))
                }
                rows={4}
                placeholder="Напишите ответ..."
              />
              <Button
                size="sm"
                className="mt-3"
                disabled={saving === q.id}
                onClick={() => handleReply(q.id)}
              >
                {saving === q.id ? 'Сохраняем...' : 'Отправить ответ'}
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
