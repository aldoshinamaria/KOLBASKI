/** @typedef {'yookassa' | 'tbank' | 'sbp' | 'acquiring'} PaymentProvider */

/** @typedef {'not_required' | 'awaiting_payment' | 'paid' | 'failed'} PaymentStatus */

/** @typedef {'pending_confirmation' | 'confirmed' | 'preparing' | 'completed' | 'cancelled'} OrderStatus */

/**
 * Заглушка для будущей интеграции оплаты.
 * Подключение: ЮKassa, Т-Банк, СБП, эквайринг.
 *
 * @param {string} orderId
 * @param {PaymentProvider} provider
 * @param {number} amount
 * @returns {Promise<{ paymentUrl: string }>}
 */
export async function initPayment(orderId, provider, amount) {
  void orderId
  void provider
  void amount
  throw new Error(
    'Онлайн-оплата пока не подключена. Заказ оформляется по предзаказу.',
  )
}

/**
 * @param {string} paymentId
 * @param {PaymentProvider} provider
 * @returns {Promise<{ status: PaymentStatus }>}
 */
export async function checkPaymentStatus(paymentId, provider) {
  void paymentId
  void provider
  return { status: 'not_required' }
}

export const PAYMENT_PROVIDERS = {
  YOOKASSA: 'yookassa',
  TBANK: 'tbank',
  SBP: 'sbp',
  ACQUIRING: 'acquiring',
}

export const PAYMENT_STATUS = {
  NOT_REQUIRED: 'not_required',
  AWAITING: 'awaiting_payment',
  PAID: 'paid',
  FAILED: 'failed',
}
