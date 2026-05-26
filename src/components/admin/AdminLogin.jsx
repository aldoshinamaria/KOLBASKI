import { useState } from 'react'
import { authStorage } from '../../lib/storage/authStorage'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export function AdminLogin({ onSuccess }) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (authStorage.login(login, password)) {
      onSuccess()
    } else {
      setError('Неверный логин или пароль')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-light text-cream">
          Панель управления
        </h1>
        <p className="mt-2 text-sm font-light text-cream-muted/55">
          «Тесто и Дым»
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <Input
            label="Логин"
            name="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            autoComplete="username"
          />
          <Input
            label="Пароль"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && (
            <p className="text-xs font-light text-red-400/80">{error}</p>
          )}
          <Button type="submit" size="lg" className="w-full">
            Войти
          </Button>
        </form>
      </div>
    </div>
  )
}
