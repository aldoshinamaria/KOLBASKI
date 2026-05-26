import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { trackStorage } from '../../lib/storage/trackStorage'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { QuestionStatusView } from './TrackViews'

export function QuestionTrackForm({ initialQuestionId = '', initialPhone = '' }) {
  const [questionId, setQuestionId] = useState(initialQuestionId)
  const [phone, setPhone] = useState(initialPhone)
  const [question, setQuestion] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setQuestion(null)
    setLoading(true)
    try {
      const found = await trackStorage.findQuestion(questionId, phone)
      if (!found) {
        setError('Вопрос не найден. Проверьте номер и телефон.')
      } else {
        setQuestion(found)
      }
    } catch {
      setError('Не удалось найти вопрос. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Номер вопроса"
          name="questionId"
          placeholder="Q-..."
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          required
        />
        <Input
          label="Телефон"
          name="phone"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {error && (
          <p className="text-sm font-light text-red-400/80">{error}</p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Ищем...
            </>
          ) : (
            'Проверить ответ'
          )}
        </Button>
      </form>

      {question && (
        <div className="mt-8">
          <QuestionStatusView question={question} />
        </div>
      )}
    </div>
  )
}
