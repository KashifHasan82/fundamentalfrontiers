/**
 * FF BRAND — CTA buttons
 *
 * Three variants only:
 *  - PrimaryCTA  → wine fill, white text, slide-up hover overlay
 *  - OutlineCTA  → bordered, dark text, hover border darkens
 *  - GhostCTA    → text + arrow only (used inside cards)
 *
 * Sharp corners always (no border-radius). Brand voice = industrial, not friendly.
 *
 * ANALYTICS:
 *   Optional `trackName` and `trackSource` props on every variant.
 *   When set, clicking the button fires a GA4/GTM event via lib/track.
 *   No-op until user has accepted cookies (loadAnalytics not yet called).
 *   Backwards compatible — buttons without these props don't track.
 */

'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/lib/track'

type CTAProps = {
  children: ReactNode
  href: string
  external?: boolean
  className?: string
  /** Optional event name (snake_case verb_noun). If set, fires on click. */
  trackName?: string
  /** Optional source location (e.g. 'home_hero'). Required if trackName is set. */
  trackSource?: string
}

function fireTracking(trackName: string | undefined, trackSource: string | undefined) {
  if (!trackName || !trackSource) return
  trackEvent(trackName, { source: trackSource })
}

// ─── Primary CTA — wine fill, slide-up hover ───────────────────
export function PrimaryCTA({
  children,
  href,
  external = false,
  className = '',
  trackName,
  trackSource,
}: CTAProps) {
  const target = external ? '_blank' : undefined
  const rel = external ? 'noopener noreferrer' : undefined

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      onClick={() => fireTracking(trackName, trackSource)}
      className={`group relative inline-flex items-center gap-3 bg-ff-wine text-ff-white px-8 py-4 lg:px-10 lg:py-5 overflow-hidden ${className}`}
    >
      <span className="relative z-10 text-sm font-semibold tracking-wide">
        {children}
      </span>
      <svg
        className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
      <div className="absolute inset-0 bg-ff-wine-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </Link>
  )
}

// ─── Outline CTA — bordered, hover border darkens ──────────────
export function OutlineCTA({
  children,
  href,
  external = false,
  className = '',
  trackName,
  trackSource,
}: CTAProps) {
  const target = external ? '_blank' : undefined
  const rel = external ? 'noopener noreferrer' : undefined

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      onClick={() => fireTracking(trackName, trackSource)}
      className={`group inline-flex items-center gap-3 text-ff-ink px-8 py-4 lg:px-10 lg:py-5 border border-ff-ink/20 hover:border-ff-ink transition-colors ${className}`}
    >
      <span className="text-sm font-semibold tracking-wide">{children}</span>
      <svg
        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  )
}

// ─── Ghost CTA — text only, used inside cards ──────────────────
export function GhostCTA({
  children,
  href,
  external = false,
  className = '',
  trackName,
  trackSource,
}: CTAProps) {
  const target = external ? '_blank' : undefined
  const rel = external ? 'noopener noreferrer' : undefined

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      onClick={() => fireTracking(trackName, trackSource)}
      className={`group inline-flex items-center gap-2 text-ff-wine text-sm font-semibold tracking-wide hover:gap-3 transition-all ${className}`}
    >
      <span>{children}</span>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  )
}
