/**
 * FF BRAND — Typography scaffolds
 *
 * Every text style on every page comes from these components.
 * If you find yourself writing className="text-[11px] tracking-[0.3em]..."
 * — STOP. Use <Eyebrow> instead. That's how the math stays locked.
 */

import { type ReactNode, type ElementType } from 'react'

// ─── Eyebrow / Kicker ──────────────────────────────────────────
// 11px · uppercase · wine · 0.3em tracking · Barlow Condensed
// Used above every section H2, in stats, in card categories
export function Eyebrow({
  children,
  className = '',
  as: As = 'span' as ElementType,
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  return (
    <As
      className={`block text-[11px] font-semibold tracking-[0.3em] uppercase leading-none text-ff-wine font-display ${className}`}
    >
      {children}
    </As>
  )
}

// ─── Hero H1 ───────────────────────────────────────────────────
// clamp(2.5rem, 5vw, 4.5rem) · light weight · tight tracking · 1.1 leading
// Locked y-position: directly below eyebrow with mb-8 gap above
export function HeroH1({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h1
      className={`text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.1] tracking-tight text-ff-ink ${className}`}
    >
      {children}
    </h1>
  )
}

// Display accent — for emphasized words inside hero headlines.
// Replaces v0's Playfair-italic flourish with brand-correct Barlow Condensed.
export function HeroAccent({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={`font-display font-medium text-ff-wine ${className}`}>
      {children}
    </span>
  )
}

// ─── Section H2 ────────────────────────────────────────────────
// 3xl/4xl · light · ff-ink
export function H2({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={`text-3xl lg:text-4xl font-light leading-[1.15] text-ff-ink ${className}`}
    >
      {children}
    </h2>
  )
}

export function H2Large({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={`text-4xl lg:text-5xl font-light leading-[1.15] text-ff-ink ${className}`}
    >
      {children}
    </h2>
  )
}

// ─── Card H3 ───────────────────────────────────────────────────
export function H3({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h3 className={`text-xl font-semibold text-ff-ink ${className}`}>
      {children}
    </h3>
  )
}

// ─── Body copy ─────────────────────────────────────────────────
// Lead = oversized intro paragraph (under hero headline, under section H2)
export function Lead({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`text-xl text-ff-ink-muted leading-relaxed ${className}`}
    >
      {children}
    </p>
  )
}

export function Body({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={`text-base text-ff-ink-muted leading-relaxed ${className}`}>
      {children}
    </p>
  )
}
