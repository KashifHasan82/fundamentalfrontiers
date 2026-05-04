/**
 * UNIFIED EVENT TRACKING
 *
 * One function — trackEvent() — that pushes a structured event to:
 *   1. GA4 (via window.gtag)         — for Google Analytics reports
 *   2. dataLayer (GTM picks this up) — for LinkedIn Insight, Meta Pixel,
 *                                       and any other tag wired through
 *                                       your GTM container
 *
 * Why both? GA4 fires its own events directly via gtag(). GTM-managed
 * tags (LinkedIn, Meta, etc.) listen to the dataLayer. By pushing to
 * both we cover every tracking destination from a single call site.
 *
 * Safe before consent: if analytics isn't loaded yet, both calls are
 * no-ops. So adding trackEvent() to a CTA never creates an error or
 * a 404 — it just silently does nothing until the user accepts cookies.
 *
 * EVENT NAMING CONVENTION:
 *   Use snake_case verb_noun pairs. Examples:
 *     book_call_click
 *     enquiry_submit
 *     case_study_request
 *     company_profile_open
 *     about_modal_open
 *     principles_modal_open
 *
 * SOURCE PROPERTY:
 *   Always pass a `source` property — tells you WHERE on the site
 *   the event fired. Lets you split, e.g., "book_call clicks from the
 *   home hero" vs "book_call clicks from the about modal CTA strip"
 *   in GA4 segments and GTM triggers.
 *
 * EXTENDING:
 *   Add new params freely — GA4 and GTM both accept arbitrary key/value
 *   pairs on events. Keep keys snake_case, values short.
 */

export interface TrackEventParams {
  /** Where on the site the event fired (e.g. 'home_hero', 'footer'). */
  source: string
  /** Optional extra context — a study title, modal name, etc. */
  [key: string]: string | number | boolean | undefined
}

/**
 * Push an event to GA4 + GTM dataLayer.
 * No-op if analytics is not loaded (user hasn't accepted cookies yet).
 *
 * @param eventName  — snake_case verb_noun, e.g. 'book_call_click'
 * @param params     — { source, ...extras }
 */
export function trackEvent(eventName: string, params: TrackEventParams): void {
  if (typeof window === 'undefined') return

  // Push to GA4 (gtag is set by lib/analytics.ts after consent)
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params)
    } catch {
      // never let analytics break UX
    }
  }

  // Push to dataLayer (GTM listens here — LinkedIn, Meta Pixel, etc.)
  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: eventName,
        ...params,
      })
    } catch {
      // never let analytics break UX
    }
  }
}
