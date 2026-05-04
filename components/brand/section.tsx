/**
 * FF BRAND — Section wrapper
 *
 * Locks:
 *  - max-width 1400px
 *  - side padding (32px → 64px)
 *  - vertical padding (py-32 default, can override)
 *  - top border (optional)
 *
 * Use this for EVERY section on EVERY page. No exceptions, no inline overrides.
 * If a section needs different padding, add a variant here — never bypass.
 */

import { type ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  id?: string
  className?: string
  divider?: boolean
  background?: 'cream' | 'cream-light' | 'cream-dark' | 'white' | 'wine' | 'ink' | 'transparent'
  padding?: 'default' | 'compact' | 'none'
}

const bgMap = {
  cream: 'bg-ff-cream',
  'cream-light': 'bg-ff-cream-light',
  'cream-dark': 'bg-ff-cream-dark',
  white: 'bg-ff-white',
  wine: 'bg-ff-wine text-ff-white',
  ink: 'bg-ff-ink text-ff-white',
  transparent: '',
}

const padMap = {
  default: 'py-32',
  compact: 'py-16',
  none: '',
}

export function Section({
  children,
  id,
  className = '',
  divider = false,
  background = 'transparent',
  padding = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${bgMap[background]} ${padMap[padding]} ${
        divider ? 'border-t border-ff-ink/10' : ''
      } ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {children}
      </div>
    </section>
  )
}
