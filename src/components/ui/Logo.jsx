import { cn } from '../../lib/utils'

export const LOGO_SRC = '/logo.png'
export const LOGO_ALT = 'Тесто и Дым — домашняя гастрономия ручной работы'

const sizes = {
  sm: 'h-11 w-11 md:h-12 md:w-12',
  md: 'h-16 w-16',
  lg: 'h-44 w-44 md:h-52 md:w-52',
  xl: 'h-56 w-56 md:h-64 md:w-64',
}

export function Logo({ size = 'sm', className, imgClassName }) {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-full',
        sizes[size],
        className,
      )}
    >
      <img
        src={LOGO_SRC}
        alt={LOGO_ALT}
        className={cn('h-full w-full object-cover', imgClassName)}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}
