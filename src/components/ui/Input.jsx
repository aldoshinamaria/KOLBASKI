import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Input = forwardRef(function Input(
  { className, label, error, id, ...props },
  ref,
) {
  const inputId = id || props.name

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-light tracking-wide text-cream-muted"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'w-full rounded-sm border bg-bg-tertiary/50 px-4 py-3.5 text-cream',
          'placeholder:text-cream-muted/40',
          'transition-all duration-300',
          'border-cream/8 focus:border-crust/40 focus:bg-bg-tertiary/80',
          'focus:outline-none focus:ring-2 focus:ring-crust/15',
          error && 'border-red-400/40 focus:border-red-400/60 focus:ring-red-400/10',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs font-light text-red-400/80">{error}</p>
      )}
    </div>
  )
})
