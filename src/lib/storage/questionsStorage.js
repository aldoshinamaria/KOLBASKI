import { STORAGE_KEYS, QUESTION_STATUS } from '../constants'
import { readStorage, writeStorage, generateId } from './index'
import { mapQuestionFromDb, mapQuestionToDb } from './mappers'

function getAllRaw() {
  return readStorage(STORAGE_KEYS.QUESTIONS, [])
}

const localQuestionsStorage = {
  getAll() {
    return getAllRaw().sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    )
  },

  findByCredentials(questionId, phone) {
    const digits = phone.replace(/\D/g, '')
    return (
      getAllRaw().find(
        (q) =>
          q.id === questionId && q.phone.replace(/\D/g, '') === digits,
      ) ?? null
    )
  },

  create(data) {
    const questions = getAllRaw()
    const question = {
      id: generateId('Q'),
      createdAt: new Date().toISOString(),
      status: QUESTION_STATUS.NEW,
      adminReply: null,
      repliedAt: null,
      name: data.name.trim(),
      phone: data.phone.trim(),
      text: data.text.trim(),
    }
    questions.unshift(question)
    writeStorage(STORAGE_KEYS.QUESTIONS, questions)
    window.dispatchEvent(new CustomEvent('questions-updated'))
    return question
  },

  reply(id, adminReply) {
    const questions = getAllRaw()
    const index = questions.findIndex((q) => q.id === id)
    if (index === -1) return null
    questions[index] = {
      ...questions[index],
      status: QUESTION_STATUS.ANSWERED,
      adminReply: adminReply.trim(),
      repliedAt: new Date().toISOString(),
    }
    writeStorage(STORAGE_KEYS.QUESTIONS, questions)
    window.dispatchEvent(new CustomEvent('questions-updated'))
    return questions[index]
  },

  markAnswered(id) {
    return this.reply(id, '')
  },

  remove(id) {
    const questions = getAllRaw().filter((q) => q.id !== id)
    writeStorage(STORAGE_KEYS.QUESTIONS, questions)
    window.dispatchEvent(new CustomEvent('questions-updated'))
    return true
  },
}

async function getSupabaseQuestionsStorage() {
  const { supabase, getAdminSecret, isSupabaseConfigured } = await import(
    '../supabase/client'
  )
  if (!isSupabaseConfigured) return null

  const secret = getAdminSecret()

  return {
    async getAll() {
      const { data, error } = await supabase.rpc('admin_get_questions', {
        p_secret: secret,
      })
      if (error) throw error
      return (data || []).map(mapQuestionFromDb)
    },

    async findByCredentials(questionId, phone) {
      const { data, error } = await supabase.rpc('get_question_by_credentials', {
        p_question_id: questionId,
        p_phone: phone,
      })
      if (error) throw error
      const row = Array.isArray(data) ? data[0] : data
      return mapQuestionFromDb(row)
    },

    async create(data) {
      const question = {
        id: generateId('Q'),
        createdAt: new Date().toISOString(),
        status: QUESTION_STATUS.NEW,
        adminReply: null,
        repliedAt: null,
        name: data.name.trim(),
        phone: data.phone.trim(),
        text: data.text.trim(),
      }
      const { error } = await supabase
        .from('questions')
        .insert(mapQuestionToDb(question))
      if (error) throw error
      window.dispatchEvent(new CustomEvent('questions-updated'))
      return question
    },

    async reply(id, adminReply) {
      const { data, error } = await supabase.rpc('admin_reply_question', {
        p_secret: secret,
        p_question_id: id,
        p_admin_reply: adminReply.trim(),
      })
      if (error) throw error
      window.dispatchEvent(new CustomEvent('questions-updated'))
      return mapQuestionFromDb(data)
    },

    async markAnswered(id) {
      return this.reply(id, '')
    },

    async remove(id) {
      const { error } = await supabase.rpc('admin_delete_question', {
        p_secret: secret,
        p_question_id: id,
      })
      if (error) throw error
      window.dispatchEvent(new CustomEvent('questions-updated'))
      return true
    },
  }
}

let cachedSupabaseStorage = null

async function resolveStorage() {
  const { isSupabaseConfigured } = await import('../supabase/client')
  if (!isSupabaseConfigured) return localQuestionsStorage
  if (!cachedSupabaseStorage) {
    cachedSupabaseStorage = await getSupabaseQuestionsStorage()
  }
  return cachedSupabaseStorage
}

export const questionsStorage = {
  async getAll() {
    const storage = await resolveStorage()
    return storage.getAll()
  },

  async findByCredentials(questionId, phone) {
    const storage = await resolveStorage()
    return storage.findByCredentials(questionId, phone)
  },

  create(data) {
    return resolveStorage().then((s) => s.create(data))
  },

  reply(id, adminReply) {
    return resolveStorage().then((s) => s.reply(id, adminReply))
  },

  markAnswered(id) {
    return resolveStorage().then((s) => s.markAnswered(id))
  },

  remove(id) {
    return resolveStorage().then((s) => s.remove(id))
  },
}
