import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const touchDevice =
      'ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches
    setIsTouch(touchDevice)
    if (touchDevice) return

    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleEnter = () => setIsVisible(true)
    const handleLeave = () => setIsVisible(false)

    const handleHoverStart = (e) => {
      const target = e.target.closest('a, button, [data-cursor="hover"]')
      setIsHovering(!!target)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseenter', handleEnter)
    window.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseover', handleHoverStart)

    document.body.classList.add('hide-cursor')

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseenter', handleEnter)
      window.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseover', handleHoverStart)
      document.body.classList.remove('hide-cursor')
    }
  }, [isVisible])

  if (isTouch) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
          y: { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 },
          scale: { duration: 0.3 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="h-3 w-3 rounded-full bg-cream" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 0.15 : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: 150, damping: 20, mass: 0.8 },
          y: { type: 'spring', stiffness: 150, damping: 20, mass: 0.8 },
          scale: { duration: 0.4 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="h-10 w-10 rounded-full border border-amber-soft/30" />
      </motion.div>
    </>
  )
}
