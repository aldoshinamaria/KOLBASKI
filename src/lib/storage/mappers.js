export function normalizePhone(phone) {
  return (phone || '').replace(/\D/g, '')
}

export function mapOrderFromDb(row) {
  if (!row) return null
  return {
    id: row.id,
    createdAt: row.created_at,
    status: row.status,
    deliveryType: row.delivery_type,
    items: row.items,
    subtotal: row.subtotal,
    paymentStatus: row.payment_status,
    adminMessage: row.admin_message,
    customer: {
      name: row.customer_name,
      phone: row.customer_phone,
      address: row.customer_address,
      comment: row.customer_comment,
    },
  }
}

export function mapOrderToDb(order) {
  return {
    id: order.id,
    created_at: order.createdAt,
    customer_name: order.customer.name,
    customer_phone: order.customer.phone,
    customer_address: order.customer.address || null,
    customer_comment: order.customer.comment || null,
    delivery_type: order.deliveryType,
    items: order.items,
    subtotal: order.subtotal,
    status: order.status,
    admin_message: order.adminMessage || null,
    payment_status: order.paymentStatus || 'not_required',
  }
}

export function mapQuestionFromDb(row) {
  if (!row) return null
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    phone: row.phone,
    text: row.text,
    status: row.status,
    adminReply: row.admin_reply,
    repliedAt: row.replied_at,
  }
}

export function mapQuestionToDb(question) {
  return {
    id: question.id,
    created_at: question.createdAt,
    name: question.name,
    phone: question.phone,
    text: question.text,
    status: question.status,
    admin_reply: question.adminReply || null,
    replied_at: question.repliedAt || null,
  }
}
