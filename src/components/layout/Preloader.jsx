import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BRAND_NAME, BRAND_TAGLINE } from '../../lib/utils'
import { Logo } from '../ui/Logo'

export function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setDone(true), 400)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (done) {
      const timer = setTimeout(onComplete, 600)
      return () => clearTimeout(timer)
    }
  }, [done, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <Logo size="xl" className="shadow-[0_0_60px_rgb(196_149_106/0.12)]" />
            <p className="sr-only">{BRAND_NAME}</p>
            <p className="mt-6 text-sm font-light text-cream-muted/60">
              {BRAND_TAGLINE}
            </p>
          </motion.div>

          <div className="absolute bottom-16 left-1/2 w-48 -translate-x-1/2">
            <div className="h-px w-full overflow-hidden bg-cream/10">
              <motion.div
                className="h-full bg-crust/60"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crust/5 blur-[120px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
