/**
 * COOKIE BANNER — bottom-left floating card.
 *
 * Premium minimal style matching the FF design system:
 *   • Cream bg + ink/10 border + soft shadow
 *   • Sharp corners (no border-radius)
 *   • Wine eyebrow → ink heading → ink-muted body
 *   • PrimaryCTA-style "OK" button + small × close icon
 *
 * Behavior:
 *   • First visit: appears 600ms after mount (lets the hero settle)
 *   • Click OK   → loads GTM + GA4, persists consent='accepted'
 *   • Click ×    → no analytics, persists consent='rejected'
 *   • Returning visitor who accepted: analytics auto-loads on mount,
 *     banner does not show
 *   • Returning visitor who rejected: nothing loads, banner does not show
 *
 * Mounted globally in app/layout.tsx so it appears on every page
 * AND inside open modals.
 */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { loadAnalytics, getConsent, setConsent } from '@/lib/analytics'
import { Eyebrow } from '@/components/brand/typography'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const consent = getConsent()

    // Returning visitor who already accepted — auto-load analytics
    // without showing the banner. This is the key UX detail: people
    // who've consented shouldn't see the banner again.
    if (consent === 'accepted') {
      loadAnalytics()
      return
    }

    // Returning visitor who rejected — do nothing. No analytics, no
    // banner. Their choice is honored across visits.
    if (consent === 'rejected') {
      return
    }

    // First-time visitor — show banner after 600ms so the hero loads first
    const t = setTimeout(() => setVisible(true), 600)
    return () => clearTimeout(t)
  }, [])

  const handleAccept = () => {
    loadAnalytics()
    setConsent('accepted')
    setVisible(false)
  }

  const handleReject = () => {
    setConsent('rejected')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 z-[100] sm:max-w-sm"
          role="dialog"
          aria-label="Cookie notice"
        >
          <div className="relative bg-ff-cream border border-ff-ink/10 shadow-[0_10px_40px_rgba(23,27,36,0.12)] p-6 lg:p-7">
            {/* Close icon — top right, small + understated. Acts as REJECT. */}
            <button
              onClick={handleReject}
              aria-label="Reject cookies and dismiss notice"
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-ff-ink-muted hover:text-ff-ink transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {/* Eyebrow */}
            <Eyebrow className="mb-3">
              COOKIES
            </Eyebrow>

            {/* Headline */}
            <h2 className="text-lg font-light text-ff-ink leading-snug mb-3 pr-6">
              We use cookies to improve your experience.
            </h2>

            {/* Body */}
            <p className="text-sm text-ff-ink-muted leading-relaxed mb-5">
              This site uses cookies for analytics and to enhance how we
              present our services. Click OK to continue.
            </p>

            {/* OK button — PrimaryCTA spec scaled for compact card.
                Same text/tracking/colors as PrimaryCTA from buttons.tsx,
                slightly tighter padding (py-3 vs py-4) since the banner
                is a confined max-w-sm card. Loads analytics + persists
                consent on click. */}
            <button
              onClick={handleAccept}
              className="group relative inline-flex items-center gap-3 bg-ff-wine text-ff-white text-sm font-semibold tracking-wide px-8 py-3 overflow-hidden"
            >
              <span className="relative z-10">OK</span>
              <div className="absolute inset-0 bg-ff-wine-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
