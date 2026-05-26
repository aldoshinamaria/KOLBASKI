import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const variants = {
  primary:
    'bg-cream text-bg-primary hover:bg-amber-glow focus-visible:ring-crust/50 shadow-[0_0_30px_rgb(196_149_106/0.18)]',
  secondary:
    'glass text-cream hover:border-crust/30 hover:bg-bg-tertiary/80 focus-visible:ring-crust/30',
  ghost:
    'text-cream-muted hover:text-cream hover:bg-bg-tertiary/50 focus-visible:ring-crust/20',
  outline:
    'border border-cream/12 text-cream hover:border-crust/40 hover:bg-crust/5 focus-visible:ring-crust/30',
}

const sizes = {
  sm: 'px-5 py-2.5 text-sm min-h-[44px]',
  md: 'px-7 py-3.5 text-sm tracking-wide min-h-[48px]',
  lg: 'px-9 py-4 text-base tracking-wide min-h-[52px]',
}

export const Button = forwardRef(function Button(
  {
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-all duration-500 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        'active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})
