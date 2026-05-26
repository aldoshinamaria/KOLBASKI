import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useProducts } from '../../context/ProductsContext'
import { formatPrice } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'

const emptyForm = {
  title: '',
  subtitle: '',
  price: '',
  description: '',
  composition: '',
  image: '',
  badge: '',
  available: true,
  seasonal: false,
}

function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? {
          ...initial,
          price: String(initial.price),
          composition: initial.composition.join('\n'),
          badge: initial.badge || '',
          subtitle: initial.subtitle || '',
        }
      : emptyForm,
  )

  const handleImageFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }))
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || null,
      price: Number(form.price),
      priceLabel: null,
      description: form.description.trim(),
      composition: form.composition
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      image: form.image,
      imageAlt: `Гастробокс «${form.title.trim()}»`,
      badge: form.badge.trim() || null,
      available: form.available,
      seasonal: form.seasonal,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-sm border border-cream/8 bg-bg-secondary/50 p-6"
    >
      <h3 className="font-display text-xl font-light text-cream">
        {initial ? 'Редактировать бокс' : 'Новый бокс'}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Название"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <Input
          label="Цена, ₽"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
      </div>

      <Input
        label="Подпись (необязательно)"
        value={form.subtitle}
        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        placeholder="Например: Летний сезонный бокс"
      />

      <Textarea
        label="Описание"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows={3}
        required
      />

      <Textarea
        label="Состав (каждый пункт с новой строки)"
        value={form.composition}
        onChange={(e) => setForm({ ...form, composition: e.target.value })}
        rows={5}
        required
      />

      <div className="space-y-2">
        <label className="block text-sm font-light text-cream-muted">
          Изображение
        </label>
        <Input
          value={form.image.startsWith('data:') ? '' : form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="/boxes/example.png или загрузите файл"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFile}
          className="text-xs font-light text-cream-muted/60"
        />
        {form.image && (
          <img
            src={form.image}
            alt=""
            className="mt-2 h-24 w-32 rounded-sm object-cover"
          />
        )}
      </div>

      <Input
        label="Бейдж (необязательно)"
        value={form.badge}
        onChange={(e) => setForm({ ...form, badge: e.target.value })}
        placeholder="Ограниченная летняя партия"
      />

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-light text-cream-muted">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => setForm({ ...form, available: e.target.checked })}
            className="rounded border-cream/20"
          />
          Доступен для заказа
        </label>
        <label className="flex items-center gap-2 text-sm font-light text-cream-muted">
          <input
            type="checkbox"
            checked={form.seasonal}
            onChange={(e) => setForm({ ...form, seasonal: e.target.checked })}
            className="rounded border-cream/20"
          />
          Сезонный бокс
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" size="sm">
          Сохранить
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  )
}

export function AdminProductsTab() {
  const { products, createProduct, updateProduct, deleteProduct } =
    useProducts()
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)

  const handleDelete = (id, title) => {
    if (window.confirm(`Удалить бокс «${title}»?`)) {
      deleteProduct(id)
    }
  }

  return (
    <div className="space-y-6">
      {!creating && !editing && (
        <Button size="sm" onClick={() => setCreating(true)}>
          <Plus size={16} />
          Добавить бокс
        </Button>
      )}

      {creating && (
        <ProductForm
          onSave={(data) => {
            createProduct(data)
            setCreating(false)
          }}
          onCancel={() => setCreating(false)}
        />
      )}

      {editing && (
        <ProductForm
          initial={editing}
          onSave={(data) => {
            updateProduct(editing.id, data)
            setEditing(null)
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-4 rounded-sm border border-cream/8 bg-bg-secondary/40 p-5 sm:flex-row sm:items-center"
          >
            <img
              src={product.image}
              alt=""
              className="h-20 w-28 shrink-0 rounded-sm object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display text-lg font-light text-cream">
                  «{product.title}»
                </p>
                {!product.available && (
                  <span className="rounded-sm bg-red-900/20 px-2 py-0.5 text-[10px] text-red-300/70">
                    Недоступен
                  </span>
                )}
                {product.seasonal && (
                  <span className="rounded-sm bg-crust/15 px-2 py-0.5 text-[10px] text-amber-glow">
                    Сезонный
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm font-light text-crust">
                {formatPrice(product.price)}
              </p>
              <p className="mt-1 line-clamp-2 text-xs font-light text-cream-muted/50">
                {product.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCreating(false)
                  setEditing(product)
                }}
              >
                <Pencil size={14} />
                Изменить
              </Button>
              <button
                type="button"
                onClick={() => handleDelete(product.id, product.title)}
                className="flex h-9 w-9 items-center justify-center text-cream-muted/40 hover:text-red-400/70"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
