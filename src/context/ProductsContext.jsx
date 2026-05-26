import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { productsStorage } from '../lib/storage/productsStorage'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => productsStorage.getAll())

  const refresh = useCallback(() => {
    setProducts(productsStorage.getAll())
  }, [])

  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener('products-updated', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('products-updated', handler)
      window.removeEventListener('storage', handler)
    }
  }, [refresh])

  const availableProducts = useMemo(
    () => products.filter((p) => p.available !== false),
    [products],
  )

  const value = useMemo(
    () => ({
      products,
      availableProducts,
      refresh,
      updateProduct: (id, updates) => {
        productsStorage.update(id, updates)
        refresh()
      },
      createProduct: (data) => {
        const created = productsStorage.create(data)
        refresh()
        return created
      },
      deleteProduct: (id) => {
        productsStorage.remove(id)
        refresh()
      },
    }),
    [products, availableProducts, refresh],
  )

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) {
    throw new Error('useProducts должен использоваться внутри ProductsProvider')
  }
  return ctx
}
