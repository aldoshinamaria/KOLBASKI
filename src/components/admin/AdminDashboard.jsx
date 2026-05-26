import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Package, MessageCircle, ShoppingBag } from 'lucide-react'
import { authStorage } from '../../lib/storage/authStorage'
import { ordersStorage } from '../../lib/storage/ordersStorage'
import { questionsStorage } from '../../lib/storage/questionsStorage'
import { cn } from '../../lib/utils'
import { AdminOrdersTab } from './AdminOrdersTab'
import { AdminProductsTab } from './AdminProductsTab'
import { AdminQuestionsTab } from './AdminQuestionsTab'

const tabs = [
  { id: 'orders', label: 'Заказы', icon: ShoppingBag },
  { id: 'products', label: 'Гастробоксы', icon: Package },
  { id: 'questions', label: 'Вопросы', icon: MessageCircle },
]

export function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('orders')
  const [counts, setCounts] = useState({ orders: 0, questions: 0 })

  const refreshCounts = async () => {
    try {
      const [orders, questions] = await Promise.all([
        ordersStorage.getAll(),
        questionsStorage.getAll(),
      ])
      setCounts({
        orders: orders.filter((o) => o.status === 'new').length,
        questions: questions.filter((q) => q.status === 'new').length,
      })
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    refreshCounts()
    const handler = () => refreshCounts()
    window.addEventListener('orders-updated', handler)
    window.addEventListener('questions-updated', handler)
    return () => {
      window.removeEventListener('orders-updated', handler)
      window.removeEventListener('questions-updated', handler)
    }
  }, [])

  const handleLogout = () => {
    authStorage.logout()
    onLogout()
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="border-b border-cream/5 bg-bg-secondary/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-light text-cream">
              «Тесто и Дым»
            </h1>
            <p className="text-xs font-light text-cream-muted/45">
              Панель администратора
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm font-light text-cream-muted transition-colors hover:text-cream"
            >
              На сайт
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-light text-cream-muted transition-colors hover:text-cream"
            >
              <LogOut size={16} />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-8 flex flex-wrap gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={cn(
                'flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm font-light transition-all duration-300',
                activeTab === id
                  ? 'border-crust/40 bg-crust/5 text-cream'
                  : 'border-cream/8 text-cream-muted/60 hover:border-cream/15',
              )}
            >
              <Icon size={16} />
              {label}
              {id === 'orders' && counts.orders > 0 && (
                <span className="rounded-full bg-crust/80 px-1.5 text-[10px] text-bg-primary">
                  {counts.orders}
                </span>
              )}
              {id === 'questions' && counts.questions > 0 && (
                <span className="rounded-full bg-crust/80 px-1.5 text-[10px] text-bg-primary">
                  {counts.questions}
                </span>
              )}
            </button>
          ))}
        </nav>

        {activeTab === 'orders' && <AdminOrdersTab />}
        {activeTab === 'products' && <AdminProductsTab />}
        {activeTab === 'questions' && <AdminQuestionsTab />}
      </div>
    </div>
  )
}
