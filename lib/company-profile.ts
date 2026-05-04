/**
 * COMPANY PROFILE CONFIG
 *
 * Single source of truth for the Company Profile (firm catalog) link.
 * Used by every "Company Profile" CTA across the site:
 *   • Home page inline section (between hero and Services)
 *   • About modal (near consultant profiles)
 *   • Footer (legal/links row, every page + modal)
 *
 * DEPLOYMENT FLOW:
 *   1. Place the PDF at: public/company-profile.pdf
 *   2. Push to GitHub
 *   3. Vercel auto-deploys, file is served at /company-profile.pdf
 *   4. All CTAs become live automatically — no code change needed
 *
 * If the filename ever changes, edit COMPANY_PROFILE_URL below.
 *
 * Until the PDF exists, CTAs show a graceful "coming soon" inline
 * message instead of a 404. The component does a runtime HEAD check
 * on mount and updates state accordingly.
 */

import { trackEvent } from '@/lib/track'

export const COMPANY_PROFILE_URL = '/company-profile.pdf'
export const COMPANY_PROFILE_LABEL = 'Company Profile'

/**
 * Fire a GA4/GTM event when user clicks a Company Profile CTA.
 * No-op if analytics is not loaded (i.e. user hasn't consented yet).
 *
 * Event name:  company_profile_open
 * Params:      { source }
 */
export function trackCompanyProfileClick(source: string): void {
  trackEvent('company_profile_open', { source })
}
