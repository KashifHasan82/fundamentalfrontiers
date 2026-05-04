/**
 * FF CTA STRIP — locked pattern for "ready to talk" call-outs.
 *
 * Single source of truth for closing CTA strips. Used in:
 *  - Homepage bottom (before footer)
 *  - Principles modal bottom (before footer)
 *  - Future modals (About, Services, etc.)
 *
 * Two variants:
 *  - 'wine'  — solid wine bg, white headline, white-pill CTA (high-emphasis closer)
 *  - 'cream' — cream-light bg, ink headline, wine CTA (softer closer)
 *
 * Layout is always: heading + subline on left, CTA on right.
 * On mobile, stacks vertically.
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { trackEvent } from '@/lib/track'

type CtaStripProps = {
  variant?: 'wine' | 'cream'
  eyebrow?: string
  heading: string
  subline?: string
  ctaLabel: string
  /** Optional override; defaults to the locked Calendly URL constant */
  ctaHref?: string
  external?: boolean
  /** Optional secondary CTA — renders as outline button next to primary */
  secondaryCtaLabel?: string
  onSecondaryCta?: () => void
  /** Required for analytics — where on the site this strip lives. */
  trackSource: string
}

const CALENDLY_URL =
  'https://calendly.com/admin-fundamentalfrontiers/30min?hide_event_type_details=1&hide_gdpr_banner=1'

export function CtaStrip({
  variant = 'wine',
  eyebrow,
  heading,
  subline,
  ctaLabel,
  ctaHref = CALENDLY_URL,
  external = true,
  secondaryCtaLabel,
  onSecondaryCta,
  trackSource,
}: CtaStripProps) {
  const isWine = variant === 'wine'

  // Token sets per variant — all locked
  const sectionBg = isWine ? 'bg-ff-wine' : 'bg-ff-cream-light'
  const headingColor = isWine ? 'text-ff-white' : 'text-ff-ink'
  const sublineColor = isWine ? 'text-ff-white/70' : 'text-ff-ink-muted'
  const eyebrowColor = isWine ? 'text-ff-white/60' : 'text-ff-wine'

  // CTA: white-on-wine OR wine-on-cream
  const ctaBase =
    'group relative inline-flex items-center gap-3 px-8 py-4 lg:px-10 lg:py-5 overflow-hidden shrink-0'
  const ctaSurface = isWine
    ? 'bg-ff-white text-ff-wine'
    : 'bg-ff-wine text-ff-white'
  const ctaSlideOverlay = isWine
    ? 'bg-ff-cream-dark'
    : 'bg-ff-wine-dark'

  // Secondary CTA: outline style, lower visual weight than primary
  const secondaryBase =
    'inline-flex items-center justify-center gap-3 px-8 py-4 lg:px-10 lg:py-5 border transition-colors shrink-0 cursor-pointer'
  const secondarySurface = isWine
    ? 'border-ff-white/40 text-ff-white hover:bg-ff-white/10'
    : 'border-ff-wine/40 text-ff-wine hover:bg-ff-wine/5'

  const hasSecondary = Boolean(secondaryCtaLabel && onSecondaryCta)

  return (
    <section className={`py-16 ${sectionBg}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            {eyebrow && (
              <span
                className={`block text-[11px] font-semibold tracking-[0.3em] uppercase leading-none font-display mb-3 ${eyebrowColor}`}
              >
                {eyebrow}
              </span>
            )}
            <h2
              className={`text-3xl lg:text-4xl font-light leading-[1.15] mb-4 ${headingColor}`}
            >
              {heading}
            </h2>
            {subline && (
              <p className={`text-xl leading-relaxed ${sublineColor}`}>{subline}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href={ctaHref}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              onClick={() => trackEvent('book_call_click', { source: trackSource })}
              className={`${ctaBase} ${ctaSurface}`}
            >
              <span className="relative z-10 text-sm font-semibold tracking-wide">
                {ctaLabel}
              </span>
              <svg
                className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <div
                className={`absolute inset-0 ${ctaSlideOverlay} translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
              />
            </Link>

            {hasSecondary && (
              <button
                type="button"
                onClick={() => {
                  trackEvent('enquiry_open', { source: trackSource })
                  onSecondaryCta?.()
                }}
                className={`${secondaryBase} ${secondarySurface}`}
              >
                <span className="text-sm font-semibold tracking-wide">
                  {secondaryCtaLabel}
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
