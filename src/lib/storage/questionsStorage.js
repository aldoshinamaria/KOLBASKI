import { STORAGE_KEYS, QUESTION_STATUS } from '../constants'
import { readStorage, writeStorage, generateId } from './index'

function getAllRaw() {
  return readStorage(STORAGE_KEYS.QUESTIONS, [])
}

export const questionsStorage = {
  getAll() {
    return getAllRaw().sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    )
  },

  create(data) {
    const questions = getAllRaw()
    const question = {
      id: generateId('Q'),
      createdAt: new Date().toISOString(),
      status: QUESTION_STATUS.NEW,
      name: data.name.trim(),
      phone: data.phone.trim(),
      text: data.text.trim(),
    }
    questions.unshift(question)
    writeStorage(STORAGE_KEYS.QUESTIONS, questions)
    window.dispatchEvent(new CustomEvent('questions-updated'))
    return question
  },

  markAnswered(id) {
    const questions = getAllRaw()
    const index = questions.findIndex((q) => q.id === id)
    if (index === -1) return null
    questions[index] = {
      ...questions[index],
      status: QUESTION_STATUS.ANSWERED,
    }
    writeStorage(STORAGE_KEYS.QUESTIONS, questions)
    window.dispatchEvent(new CustomEvent('questions-updated'))
    return questions[index]
  },

  remove(id) {
    const questions = getAllRaw().filter((q) => q.id !== id)
    writeStorage(STORAGE_KEYS.QUESTIONS, questions)
    window.dispatchEvent(new CustomEvent('questions-updated'))
    return true
  },
}
