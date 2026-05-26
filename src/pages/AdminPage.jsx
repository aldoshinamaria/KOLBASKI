import { useState } from 'react'
import { authStorage } from '../lib/storage/authStorage'
import { AdminLogin } from '../components/admin/AdminLogin'
import { AdminDashboard } from '../components/admin/AdminDashboard'

export function AdminPage() {
  const [authenticated, setAuthenticated] = useState(() =>
    authStorage.isAuthenticated(),
  )

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />
}
