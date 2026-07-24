/**
 * FF ANALYTICS LOADER
 *
 * Direct port of the old HTML site's `window.ffLoadAnalytics` function.
 * Loads Google Tag Manager only when called —
 * never on page load. Designed to be invoked from the cookie banner's
 * OK button, or auto-invoked on subsequent visits if the user
 * previously accepted.
 *
 * Client-owned GTM container:
 *   GTM: GTM-P2T39422
 *
 * GA4 and LinkedIn are deployed from that container. GA4 is deliberately
 * not loaded directly here, which prevents duplicate page views.
 *
 * Behavior matches the old site exactly:
 *   - Initializes window.dataLayer if not already present
 *   - Adds <link rel="preconnect"> hint to googletagmanager.com
 *   - Injects GTM container script
 *   - Guards against double-loading via window.__ffAnalyticsLoaded flag
 *
 * Why this lives in lib/ and not as a Next <Script> component:
 *   <Script> components fire on mount. We don't want analytics to mount
 *   until the user explicitly consents — so we use plain DOM script
 *   injection, called from the cookie banner click handler.
 */

// IDs — change here if Anthropic IDs ever rotate
const GTM_ID = 'GTM-P2T39422'

// localStorage key for persisting consent decision across visits
export const CONSENT_KEY = 'ff_cookie_consent_v1'
export type ConsentState = 'accepted' | 'rejected'

// TypeScript shims for the global properties we touch
declare global {
  interface Window {
    dataLayer: unknown[]
    __ffAnalyticsLoaded?: boolean
    FF_ANALYTICS?: { gtmId: string }
  }
}

/**
 * Load GTM. Idempotent — safe to call multiple times.
 * Does nothing on the server (SSR safety).
 */
export function loadAnalytics(): void {
  if (typeof window === 'undefined') return
  if (window.__ffAnalyticsLoaded) return
  window.__ffAnalyticsLoaded = true

  // Make IDs visible on window for debugging — same as old site
  window.FF_ANALYTICS = { gtmId: GTM_ID }

  // dataLayer — must exist before GTM script runs
  window.dataLayer = window.dataLayer || []

  // Preconnect hint — warms the DNS/TLS connection before scripts fetch
  const preconnect = document.createElement('link')
  preconnect.rel = 'preconnect'
  preconnect.href = 'https://www.googletagmanager.com'
  document.head.appendChild(preconnect)

  // GTM container — fires gtm.start event, then injects async script tag
  // Snippet matches Google's official GTM install snippet exactly.
  ;(function (w: Window, d: Document, s: 'script', l: string, i: string) {
    ;(w as unknown as Record<string, unknown[]>)[l] =
      (w as unknown as Record<string, unknown[]>)[l] || []
    ;(w as unknown as Record<string, unknown[]>)[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    })
    const f = d.getElementsByTagName(s)[0]
    const j = d.createElement(s)
    const dl = l !== 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
    f.parentNode?.insertBefore(j, f)
  })(window, document, 'script', 'dataLayer', GTM_ID)

}

/**
 * Read the persisted consent decision. Returns null if user has not
 * decided yet (first visit, or localStorage cleared).
 */
export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    if (v === 'accepted' || v === 'rejected') return v
    return null
  } catch {
    return null
  }
}

/** Persist the consent decision so the banner doesn't re-prompt. */
export function setConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CONSENT_KEY, state)
  } catch {
    // localStorage blocked (private mode etc) — degrade gracefully
  }
}
