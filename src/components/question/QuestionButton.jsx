import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { QuestionModal } from './QuestionModal'

export function QuestionButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={() => setOpen(true)}
        className="fixed right-5 bottom-24 z-40 flex items-center gap-2 rounded-sm border border-cream/10 bg-bg-secondary/95 px-4 py-3 text-sm font-light text-cream shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-crust/30 hover:text-amber-glow md:bottom-8 md:right-8 md:px-5 md:py-3.5"
        aria-label="Задать вопрос"
        data-cursor="hover"
      >
        <MessageCircle size={18} className="text-crust/70" />
        <span className="hidden sm:inline">Задать вопрос</span>
      </motion.button>

      <QuestionModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
