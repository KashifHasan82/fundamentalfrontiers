/**
 * FF TAB NAV — locked tab navigation.
 *
 * Single visual pattern used by Services, Programs, and any future
 * tabbed accordion content.
 *
 * Layout: chunky title + subtitle cells (NOT slim text-links).
 * Active state: cream-light fill + 2px wine bottom border + wine title.
 * Inactive: hover → cream-light fill, ink title, muted subtitle.
 *
 * Icon: optional Lucide icon rendered above the title at 18px
 * (wine when active, ink-muted when inactive).
 *
 * DESKTOP (locked, ≥ lg): each tab gets equal width via flex-1, 3-up row.
 *
 * MOBILE (< lg): horizontal CENTER-SNAP carousel.
 *   - Active tab snaps to viewport center
 *   - Previous tab peeks on the LEFT
 *   - Next tab peeks on the RIGHT
 *   - User can tap a peeking tab OR swipe to switch
 *   - Two-way sync: external activeId change scrolls TabNav,
 *     and user-scroll fires onChange when a new tab settles in center
 *   - Scrollbar hidden, container extends to viewport edges (-mx-6) so
 *     swipes feel full-bleed
 */

'use client'

import { useEffect, useRef } from 'react'
import type { LucideIcon } from 'lucide-react'

type Tab = {
  id: string | number
  title: string
  subtitle?: string
  icon?: LucideIcon
}

type TabNavProps = {
  tabs: Tab[]
  activeId: string | number
  onChange: (id: string | number) => void
  className?: string
}

export function TabNav({ tabs, activeId, onChange, className = '' }: TabNavProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isProgrammaticRef = useRef(false)
  const total = tabs.length

  const activeIdx = Math.max(0, tabs.findIndex(t => t.id === activeId))

  // External activeId change → center the active tab on mobile
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) return
    const slide = el.children[activeIdx] as HTMLElement | undefined
    if (!slide) return
    isProgrammaticRef.current = true
    const left = slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2
    el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
    const t = window.setTimeout(() => {
      isProgrammaticRef.current = false
    }, 600)
    return () => window.clearTimeout(t)
  }, [activeIdx])

  // User scroll → activate the tab whose center is closest to viewport center
  const onScroll = () => {
    if (isProgrammaticRef.current) return
    const el = ref.current
    if (!el) return
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) return
    const center = el.scrollLeft + el.clientWidth / 2
    const slides = Array.from(el.children) as HTMLElement[]
    let closest = 0
    let minDist = Infinity
    slides.forEach((s, i) => {
      const sCenter = s.offsetLeft + s.offsetWidth / 2
      const dist = Math.abs(sCenter - center)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })
    const newId = tabs[closest]?.id
    if (newId !== undefined && newId !== activeId) onChange(newId)
  }

  return (
    <div
      ref={ref}
      onScroll={onScroll}
      className={[
        // Mobile: full-bleed center-snap scroll strip
        'flex overflow-x-auto snap-x snap-mandatory -mx-6',
        // Desktop: 3-up flex row, no scroll, no negative inset
        'lg:mx-0 lg:overflow-visible lg:snap-none',
        // Bottom hairline (locked) + bottom margin
        'border-b border-ff-ink/10 mb-10 lg:mb-16',
        // Hide scrollbar (mobile)
        '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      ].join(' ')}
    >
      {tabs.map((tab, i) => {
        const isActive = activeId === tab.id
        const Icon = tab.icon
        const isFirst = i === 0
        const isLast = i === total - 1
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={[
              // Mobile carousel sizing — wider peeks (16% each side) so
              // the prev/next tabs are clearly visible. Tabs are simpler
              // visually than cards so a small peek gets missed; this size
              // shows the next icon + first chars of title — clear "more
              // here" signal without arrows.
              'snap-center flex-shrink-0 w-[68%]',
              isFirst ? 'ml-[16%]' : 'ml-2',
              isLast ? 'mr-[16%]' : '',
              // Desktop overrides — equal-flex row, no carousel sizing
              'lg:flex-1 lg:flex-shrink lg:w-auto lg:ml-0 lg:mr-0 lg:snap-none lg:min-w-[200px]',
              // Padding (mobile tighter, desktop locked)
              'py-6 px-5 lg:py-8 lg:px-6',
              // Active vs inactive
              'text-left border-b-2 transition-all',
              isActive
                ? 'border-ff-wine bg-ff-cream-light'
                : 'border-transparent hover:bg-ff-cream-light',
            ].join(' ')}
          >
            {Icon && (
              <Icon
                className={`w-[18px] h-[18px] mb-3 transition-colors ${
                  isActive ? 'text-ff-wine' : 'text-ff-ink-muted'
                }`}
                strokeWidth={1.5}
              />
            )}
            <span
              className={`block text-base lg:text-lg font-semibold mb-1.5 lg:mb-2 ${
                isActive ? 'text-ff-wine' : 'text-ff-ink'
              }`}
            >
              {tab.title}
            </span>
            {tab.subtitle && (
              <span className="block text-sm text-ff-ink-muted leading-snug">
                {tab.subtitle}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
