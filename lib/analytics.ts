/**
 * FF ANALYTICS LOADER
 *
 * Direct port of the old HTML site's `window.ffLoadAnalytics` function.
 * Loads Google Tag Manager + Google Analytics 4 only when called —
 * never on page load. Designed to be invoked from the cookie banner's
 * OK button, or auto-invoked on subsequent visits if the user
 * previously accepted.
 *
 * Same IDs as the old HTML site:
 *   GTM:  GTM-KQBRPRDF  (centralized container — handles LinkedIn,
 *                        Meta Pixel, conversion tags, etc. via GTM dashboard)
 *   GA4:  G-DX954J7XDQ  (hardcoded direct tag, fires alongside GTM)
 *
 * Behavior matches the old site exactly:
 *   - Initializes window.dataLayer if not already present
 *   - Adds <link rel="preconnect"> hint to googletagmanager.com
 *   - Injects GTM container script
 *   - Injects GA4 gtag.js script
 *   - Calls gtag('js', new Date()) + gtag('config', GA_ID)
 *   - Guards against double-loading via window.__ffAnalyticsLoaded flag
 *
 * Why this lives in lib/ and not as a Next <Script> component:
 *   <Script> components fire on mount. We don't want analytics to mount
 *   until the user explicitly consents — so we use plain DOM script
 *   injection, called from the cookie banner click handler.
 */

// IDs — change here if Anthropic IDs ever rotate
const GTM_ID = 'GTM-KQBRPRDF'
const GA_ID = 'G-DX954J7XDQ'

// localStorage key for persisting consent decision across visits
export const CONSENT_KEY = 'ff_cookie_consent_v1'
export type ConsentState = 'accepted' | 'rejected'

// TypeScript shims for the global properties we touch
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
    __ffAnalyticsLoaded?: boolean
    FF_ANALYTICS?: { gtmId: string; gaId: string }
  }
}

/**
 * Load GTM + GA4. Idempotent — safe to call multiple times.
 * Does nothing on the server (SSR safety).
 */
export function loadAnalytics(): void {
  if (typeof window === 'undefined') return
  if (window.__ffAnalyticsLoaded) return
  window.__ffAnalyticsLoaded = true

  // Make IDs visible on window for debugging — same as old site
  window.FF_ANALYTICS = { gtmId: GTM_ID, gaId: GA_ID }

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

  // GA4 (gtag.js) — separate from GTM, fires its own pageview on load
  const gaScript = document.createElement('script')
  gaScript.async = true
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID
  document.head.appendChild(gaScript)

  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer.push(args)
    }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
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
