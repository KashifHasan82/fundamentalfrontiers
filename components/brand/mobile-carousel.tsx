/**
 * FF MOBILE CAROUSEL — center-snap horizontal scroll-snap pattern.
 *
 * Single source for mobile carousels (Selected Work cards; potentially
 * future galleries). Use ONLY inside a `lg:hidden` parent — desktop
 * keeps its own grid layout.
 *
 * MECHANICS:
 *  - Children become slides (one each)
 *  - Slides are w-[78%] with snap-center → active slide centers in viewport
 *  - First slide gets ml-[11%] buffer, last slide gets mr-[11%] buffer
 *    so they can scroll to a centered position
 *  - Adjacent slides have a small inter-slide gap (ml-2 on non-first)
 *    so the cream parent bg is visible between cards
 *  - Result: when slide N is centered, slide N-1 peeks on the left and
 *    slide N+1 peeks on the right (~11% each — clear "more this side"
 *    affordance without arrows)
 *  - Two-way sync between activeIndex prop and scroll position:
 *      external setActive → carousel scrolls
 *      user swipe       → onIndexChange fires when scroll settles
 *  - Scrollbar hidden (matches TabNav pattern)
 *
 * DESIGN:
 *  - No injected chrome (no arrows, no dots inside the strip)
 *  - The peeks ARE the affordance
 *  - Counter rendered separately by parent via <CarouselCounter />
 *  - Negative inset margin (-mx-6) so slides scroll edge-to-edge inside
 *    a section that has px-6 padding. Mobile-only via `lg:hidden`.
 */

'use client'

import { Children, type ReactNode, useEffect, useRef } from 'react'

type Props = {
  activeIndex: number
  onIndexChange: (i: number) => void
  children: ReactNode
  className?: string
}

export function MobileCarousel({
  activeIndex,
  onIndexChange,
  children,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isProgrammaticRef = useRef(false)

  // External activeIndex change → smooth-scroll so that slide is centered
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const slide = el.children[activeIndex] as HTMLElement | undefined
    if (!slide) return
    isProgrammaticRef.current = true
    const left = slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2
    el.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
    const t = window.setTimeout(() => {
      isProgrammaticRef.current = false
    }, 600)
    return () => window.clearTimeout(t)
  }, [activeIndex])

  // User scroll → find slide whose center is closest to viewport center
  const onScroll = () => {
    if (isProgrammaticRef.current) return
    const el = ref.current
    if (!el) return
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
    if (closest !== activeIndex) onIndexChange(closest)
  }

  const total = Children.count(children)

  return (
    <div
      ref={ref}
      onScroll={onScroll}
      className={`flex overflow-x-auto snap-x snap-mandatory -mx-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {Children.map(children, (child, i) => {
        const isFirst = i === 0
        const isLast = i === total - 1
        return (
          <div
            key={i}
            className={[
              'snap-center flex-shrink-0 w-[78%]',
              isFirst ? 'ml-[11%]' : 'ml-2',
              isLast ? 'mr-[11%]' : '',
            ].join(' ')}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}

/**
 * Counter — discreet "01 / 03" display below a carousel.
 * Style mirrors the brand eyebrow: 11px, uppercase, wine, 0.3em tracking.
 */
export function CarouselCounter({
  activeIndex,
  total,
  className = '',
}: {
  activeIndex: number
  total: number
  className?: string
}) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div
      className={`flex justify-center items-center mt-8 text-[11px] font-semibold tracking-[0.3em] font-display ${className}`}
    >
      <span className="text-ff-wine tabular-nums">{pad(activeIndex + 1)}</span>
      <span className="mx-2 text-ff-ink/30">/</span>
      <span className="text-ff-ink-muted tabular-nums">{pad(total)}</span>
    </div>
  )
}
