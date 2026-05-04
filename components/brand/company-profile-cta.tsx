/**
 * COMPANY PROFILE CTA — reusable button.
 *
 * Visual spec MIRRORS buttons.tsx (PrimaryCTA / OutlineCTA / GhostCTA).
 * Single brand button language across the entire site.
 *
 * Used in three places:
 *   • Home page inline section between hero and Services (variant='secondary')
 *   • About modal at bottom of OUR TEAM section (variant='secondary')
 *   • Footer legal row (variant='minimal')
 *
 * BEHAVIOR:
 *   1. On mount, checks if /company-profile.pdf exists (HEAD request,
 *      cached at module level so it only runs once per page load).
 *   2. If file exists → button opens PDF in new tab + fires GA4 event.
 *   3. If file does NOT exist → button shows a small inline message
 *      ("Company Profile coming soon — contact us to request a copy")
 *      below itself when clicked. Auto-hides after 4 seconds.
 *
 * VARIANTS — visual spec matches buttons.tsx exactly:
 *
 *   'primary'   → MIRRORS PrimaryCTA from buttons.tsx
 *                 (wine fill · text-sm tracking-wide · sharp corners
 *                  · arrow icon · slide-up hover overlay)
 *
 *   'secondary' → MIRRORS OutlineCTA from buttons.tsx
 *                 (bordered · text-sm tracking-wide · sharp corners
 *                  · arrow icon · border darkens on hover)
 *
 *   'minimal'   → MIRRORS GhostCTA from buttons.tsx
 *                 (text + arrow only · wine color · text-sm font-semibold
 *                  tracking-wide · gap widens on hover)
 *                 Used inside footer legal row.
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import {
  COMPANY_PROFILE_URL,
  COMPANY_PROFILE_LABEL,
  trackCompanyProfileClick,
} from '@/lib/company-profile'

// Module-level cache — checked once per page load, shared across instances
let availabilityCache: boolean | null = null
let availabilityCheckPromise: Promise<boolean> | null = null

async function checkAvailability(): Promise<boolean> {
  if (availabilityCache !== null) return availabilityCache
  if (availabilityCheckPromise) return availabilityCheckPromise

  availabilityCheckPromise = fetch(COMPANY_PROFILE_URL, { method: 'HEAD' })
    .then((res) => {
      availabilityCache = res.ok
      return res.ok
    })
    .catch(() => {
      availabilityCache = false
      return false
    })

  return availabilityCheckPromise
}

type Variant = 'primary' | 'secondary' | 'minimal'

interface Props {
  source: string
  variant?: Variant
  className?: string
}

// Shared arrow SVG — matches buttons.tsx exactly
const Arrow = ({ minimal = false }: { minimal?: boolean }) => (
  <svg
    className={
      minimal
        ? 'w-4 h-4'
        : 'relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform'
    }
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
)

export function CompanyProfileCTA({
  source,
  variant = 'secondary',
  className = '',
}: Props) {
  const [available, setAvailable] = useState<boolean | null>(null)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let mounted = true
    checkAvailability().then((ok) => {
      if (mounted) setAvailable(ok)
    })
    return () => {
      mounted = false
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    if (available === false) {
      e.preventDefault()
      setShowComingSoon(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setShowComingSoon(false), 4000)
      return
    }
    trackCompanyProfileClick(source)
  }

  // ─── PRIMARY — mirrors PrimaryCTA from buttons.tsx ─────────────
  if (variant === 'primary') {
    return (
      <span className={`inline-flex flex-col items-start gap-2 ${className}`}>
        <a
          href={COMPANY_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="group relative inline-flex items-center gap-3 bg-ff-wine text-ff-white px-8 py-4 lg:px-10 lg:py-5 overflow-hidden"
        >
          <span className="relative z-10 text-sm font-semibold tracking-wide">
            {COMPANY_PROFILE_LABEL}
          </span>
          <Arrow />
          <div className="absolute inset-0 bg-ff-wine-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>
        {showComingSoon && <ComingSoonMessage />}
      </span>
    )
  }

  // ─── SECONDARY — mirrors OutlineCTA from buttons.tsx ───────────
  if (variant === 'secondary') {
    return (
      <span className={`inline-flex flex-col items-start gap-2 ${className}`}>
        <a
          href={COMPANY_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="group inline-flex items-center gap-3 text-ff-ink px-8 py-4 lg:px-10 lg:py-5 border border-ff-ink/20 hover:border-ff-ink transition-colors"
        >
          <span className="text-sm font-semibold tracking-wide">
            {COMPANY_PROFILE_LABEL}
          </span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
        </a>
        {showComingSoon && <ComingSoonMessage />}
      </span>
    )
  }

  // ─── MINIMAL — mirrors GhostCTA from buttons.tsx ───────────────
  // Used inside the footer legal row. Footer is dark bg, so inherits
  // text-ff-ink-muted from parent context (footer overrides the wine
  // color via parent class). Falls back to text-ff-wine elsewhere.
  return (
    <span className={`inline-flex flex-col items-start gap-2 ${className}`}>
      <a
        href={COMPANY_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group inline-flex items-center gap-2 text-sm text-ff-ink-muted hover:text-ff-white transition-colors"
      >
        <span>{COMPANY_PROFILE_LABEL}</span>
      </a>
      {showComingSoon && <ComingSoonMessage minimal />}
    </span>
  )
}

// Coming-soon message — shown inline below button when file isn't live
function ComingSoonMessage({ minimal = false }: { minimal?: boolean }) {
  return (
    <span
      className={`text-xs leading-relaxed ${
        minimal ? 'text-ff-ink-muted/70' : 'text-ff-ink-muted'
      }`}
      role="status"
      aria-live="polite"
    >
      Company Profile coming soon — contact us at{' '}
      <a
        href="mailto:admin@fundamentalfrontiers.com"
        className="underline hover:text-ff-wine"
      >
        admin@fundamentalfrontiers.com
      </a>{' '}
      to request a copy.
    </span>
  )
}
