import { DELIVERY_TYPES } from '../constants'
import { ordersStorage } from '../storage/ordersStorage'
import { questionsStorage } from '../storage/questionsStorage'

export { DELIVERY_TYPES }

export function validateCheckout(data) {
  const errors = {}

  if (!data.name?.trim()) {
    errors.name = 'Пожалуйста, укажите имя'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Имя слишком короткое'
  }

  const phoneDigits = (data.phone || '').replace(/\D/g, '')
  if (!data.phone?.trim()) {
    errors.phone = 'Пожалуйста, укажите телефон'
  } else if (phoneDigits.length < 10) {
    errors.phone = 'Некорректный номер телефона'
  }

  if (!data.items?.length) {
    errors.items = 'Добавьте хотя бы один гастробокс в корзину'
  }

  if (data.deliveryType === DELIVERY_TYPES.DELIVERY) {
    if (!data.address?.trim()) {
      errors.address = 'Укажите адрес доставки'
    } else if (data.address.trim().length < 5) {
      errors.address = 'Адрес слишком короткий'
    }
  }

  return errors
}

export function validateQuestion(data) {
  const errors = {}

  if (!data.name?.trim()) errors.name = 'Пожалуйста, укажите имя'
  if (!data.phone?.trim()) errors.phone = 'Пожалуйста, укажите телефон'
  else if (data.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Некорректный номер телефона'
  }
  if (!data.text?.trim()) errors.text = 'Напишите ваш вопрос'
  else if (data.text.trim().length < 5) {
    errors.text = 'Вопрос слишком короткий'
  }

  return errors
}

export async function submitOrder(order) {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const saved = ordersStorage.create({
    items: order.items,
    subtotal: order.subtotal,
    deliveryType: order.deliveryType,
    customer: order.customer,
    paymentStatus: order.paymentStatus || 'not_required',
  })

  return {
    orderId: saved.id,
    status: saved.status,
  }
}

export async function submitQuestion(data) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const saved = questionsStorage.create(data)
  return { questionId: saved.id }
}
