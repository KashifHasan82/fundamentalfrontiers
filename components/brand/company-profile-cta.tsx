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
 * AVAILABILITY CHECK — IMPORTANT (patch 37 fix):
 *   Previous version used a HEAD request to /company-profile.pdf.
 *   Vercel's CDN returns 404 for HEAD requests on static PDFs even
 *   when the file exists and GET works fine. This caused all buttons
 *   site-wide to show "coming soon" even after the PDF was deployed.
 *
 *   New approach (fail-open):
 *     1. Default state: assume PDF is available — button works immediately.
 *     2. Background check: issue a GET request with AbortController and
 *        cancel as soon as response headers arrive. Confirms the file
 *        exists without downloading the 2+ MB body.
 *     3. Only flip to "coming soon" on a DEFINITIVE 404 from GET.
 *     4. On any other error (network failure, timeout, abort outside
 *        our control, etc.) — keep button working. Better UX to let
 *        a click through to a 404 than to lock the button.
 *
 *   This matches how production sites handle file availability checks —
 *   you want the button to "just work" in 99.9% of cases, not be
 *   defensively hidden because of a CDN edge case.
 *
 * BEHAVIOR:
 *   • PDF available  → click opens PDF in new tab + fires GA4 event.
 *   • PDF missing    → click shows inline "coming soon — contact us"
 *                       message below the button. Auto-hides after 4s.
 *   • Check pending  → button is fully clickable (assumed available).
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

// Module-level cache — checked once per page load, shared across instances.
// Default value = true (fail-open). Background check can flip it to false
// only on a definitive 404. Any other failure mode keeps it as true.
let availabilityCache: boolean = true
let availabilityCheckRan: boolean = false
let availabilityCheckPromise: Promise<boolean> | null = null

async function checkAvailability(): Promise<boolean> {
  // Return cached result if check already ran this page-load
  if (availabilityCheckRan) return availabilityCache
  if (availabilityCheckPromise) return availabilityCheckPromise

  // Fresh check via GET-with-cancel. We use AbortController to cancel
  // the body download as soon as headers arrive — this avoids actually
  // downloading the (potentially several MB) PDF just to check existence.
  const controller = new AbortController()

  availabilityCheckPromise = fetch(COMPANY_PROFILE_URL, {
    method: 'GET',
    signal: controller.signal,
  })
    .then((res) => {
      // Cancel body download immediately — we only needed the status
      controller.abort()

      // Only flip to "missing" on a definitive 404. Other status codes
      // (200, 304, 5xx, etc.) all leave the button as "available".
      if (res.status === 404) {
        availabilityCache = false
      }
      // any other status → leave as true (fail-open)

      availabilityCheckRan = true
      return availabilityCache
    })
    .catch(() => {
      // Network error, AbortError after we already got status, etc.
      // Leave button as "available" — better than locking it on a flaky
      // CDN response. If the file truly doesn't exist, the user will
      // see the browser's own 404 page when they click, which is rare.
      availabilityCheckRan = true
      return availabilityCache
    })

  return availabilityCheckPromise
}

type Variant = 'primary' | 'secondary' | 'minimal'

interface Props {
  source: string
  variant?: Variant
  className?: string
}

export function CompanyProfileCTA({
  source,
  variant = 'secondary',
  className = '',
}: Props) {
  // Default state: available (fail-open). Background check might flip
  // this to false only on a definitive 404.
  const [available, setAvailable] = useState<boolean>(true)
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
    if (!available) {
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
  // color via parent class).
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
