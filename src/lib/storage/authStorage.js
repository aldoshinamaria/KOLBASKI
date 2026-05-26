import { STORAGE_KEYS, ADMIN_CREDENTIALS } from '../constants'
import { readStorage, writeStorage, removeStorage } from './index'

export const authStorage = {
  login(login, password) {
    if (
      login === ADMIN_CREDENTIALS.login &&
      password === ADMIN_CREDENTIALS.password
    ) {
      writeStorage(STORAGE_KEYS.ADMIN_SESSION, {
        authenticated: true,
        at: new Date().toISOString(),
      })
      return true
    }
    return false
  },

  logout() {
    removeStorage(STORAGE_KEYS.ADMIN_SESSION)
  },

  isAuthenticated() {
    const session = readStorage(STORAGE_KEYS.ADMIN_SESSION)
    return session?.authenticated === true
  },
}
