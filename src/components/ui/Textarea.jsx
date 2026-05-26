import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Textarea = forwardRef(function Textarea(
  { className, label, error, id, ...props },
  ref,
) {
  const textareaId = id || props.name

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-light tracking-wide text-cream-muted"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'w-full resize-none rounded-sm border bg-bg-tertiary/50 px-4 py-3.5 text-cream',
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
