import { formatPrice } from '../../lib/utils'
import {
  ORDER_STATUS_LABELS,
  DELIVERY_TYPE_LABELS,
} from '../../lib/constants'
import { formatDateTime } from '../../lib/storage'

export function OrderStatusView({ order }) {
  return (
    <div className="rounded-sm border border-cream/8 bg-bg-secondary/50 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-light text-cream-muted/45">
            Заказ
          </p>
          <p className="font-display text-xl font-light text-cream">
            {order.id}
          </p>
        </div>
        <span className="rounded-sm border border-crust/30 bg-crust/10 px-4 py-2 text-sm font-light text-amber-glow">
          {ORDER_STATUS_LABELS[order.status] || order.status}
        </span>
      </div>

      <p className="mt-4 text-sm font-light text-cream-muted/50">
        {formatDateTime(order.createdAt)}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-light text-cream-muted/45">
            Способ получения
          </p>
          <p className="mt-1 text-sm font-light text-cream">
            {DELIVERY_TYPE_LABELS[order.deliveryType]}
          </p>
        </div>
        {order.deliveryType === 'delivery' && order.customer.address && (
          <div>
            <p className="text-[11px] font-light text-cream-muted/45">
              Адрес
            </p>
            <p className="mt-1 text-sm font-light text-cream">
              {order.customer.address}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-cream/5 pt-6">
        <p className="text-[11px] font-light text-cream-muted/45">Состав</p>
        <ul className="mt-3 space-y-2">
          {order.items.map((item) => (
            <li
              key={`${item.productId}-${item.title}`}
              className="flex justify-between text-sm font-light text-cream-muted/70"
            >
              <span>
                «{item.title}» × {item.quantity}
              </span>
              <span className="tabular-nums">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-cream/5 pt-4">
          <span className="text-sm font-light text-cream">Итого</span>
          <span className="font-display text-lg font-light text-crust">
            {formatPrice(order.subtotal)}
          </span>
        </div>
      </div>

      {order.adminMessage && (
        <div className="mt-6 rounded-sm border border-crust/20 bg-crust/5 p-5">
          <p className="text-[11px] font-light text-cream-muted/45">
            Сообщение от «Тесто и Дым»
          </p>
          <p className="mt-2 text-sm font-light leading-relaxed text-cream/90">
            {order.adminMessage}
          </p>
        </div>
      )}
    </div>
  )
}

export function QuestionStatusView({ question }) {
  return (
    <div className="rounded-sm border border-cream/8 bg-bg-secondary/50 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-light text-cream-muted/45">
            Вопрос
          </p>
          <p className="font-display text-xl font-light text-cream">
            {question.id}
          </p>
        </div>
        <span className="rounded-sm border border-cream/10 bg-bg-tertiary px-4 py-2 text-sm font-light text-cream-muted/70">
          {question.status === 'answered' ? 'Есть ответ' : 'Ожидает ответа'}
        </span>
      </div>

      <p className="mt-4 text-sm font-light text-cream-muted/50">
        {formatDateTime(question.createdAt)}
      </p>

      <div className="mt-6">
        <p className="text-[11px] font-light text-cream-muted/45">
          Ваш вопрос
        </p>
        <p className="mt-2 text-sm font-light leading-relaxed text-cream-muted/75">
          {question.text}
        </p>
      </div>

      {question.adminReply ? (
        <div className="mt-6 rounded-sm border border-crust/20 bg-crust/5 p-5">
          <p className="text-[11px] font-light text-cream-muted/45">
            Ответ от «Тесто и Дым»
          </p>
          <p className="mt-2 text-sm font-light leading-relaxed text-cream/90">
            {question.adminReply}
          </p>
          {question.repliedAt && (
            <p className="mt-3 text-xs font-light text-cream-muted/40">
              {formatDateTime(question.repliedAt)}
            </p>
          )}
        </div>
      ) : (
        <p className="mt-6 text-sm font-light text-cream-muted/45">
          Мы ещё готовим ответ — загляните сюда чуть позже.
        </p>
      )}
    </div>
  )
}
