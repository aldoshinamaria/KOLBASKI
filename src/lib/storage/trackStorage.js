import { ordersStorage } from './ordersStorage'
import { questionsStorage } from './questionsStorage'

export const trackStorage = {
  findOrder(orderId, phone) {
    return ordersStorage.findByCredentials(orderId.trim(), phone.trim())
  },

  findQuestion(questionId, phone) {
    return questionsStorage.findByCredentials(questionId.trim(), phone.trim())
  },
}
