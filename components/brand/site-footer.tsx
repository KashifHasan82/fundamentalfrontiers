/**
 * FF SITE FOOTER — single source of truth for the footer.
 *
 * Used on the homepage AND inside every modal. Pixel-identical chrome.
 *
 * Editorial 3-zone structure that picks up the CtaStrip's closing rhythm:
 *   Zone 1 — Brand statement: FF mark + editorial tagline as light heading
 *   Zone 2 — Info row: CONTACT + FRAMEWORKS columns, wine eyebrows
 *   Zone 3 — Legal row: copyright + legal links
 *
 * All typography drawn from the locked site inventory:
 *   • text-[11px] tracking-[0.3em] font-display = eyebrow (text-ff-wine)
 *   • text-2xl lg:text-3xl font-light leading-[1.2] = footer-scale heading
 *   • text-base lg:text-lg leading-relaxed = subline body
 *   • border-ff-ink-soft = hairline (between zones)
 *
 * Footer is one tone darker than the page (bg-ff-ink), so:
 *   • Wine eyebrows still read as the site's accent color on dark
 *   • White headings, ink-muted body
 *   • CONSULTING line stays muted as in the deck cover
 */

'use client'

import Link from 'next/link'
import { useNav } from '@/lib/nav-context'
import { CompanyProfileCTA } from '@/components/brand/company-profile-cta'
import { Eyebrow } from '@/components/brand/typography'
import { trackEvent } from '@/lib/track'

const LINKEDIN_URL = 'https://www.linkedin.com/company/fundamental-frontiers/'

export function SiteFooter() {
  const { setOpenModal } = useNav()

  return (
    <footer className="bg-ff-ink text-ff-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* ─── ZONE 1 — Brand statement ──────────────────────────────
            Editorial closing voice: brand mark anchors the column,
            then the tagline reads as a font-light heading (smaller than
            section H2 so it doesn't compete with the CtaStrip directly
            above). Subline picks up CtaStrip's text-xl leading-relaxed.
            Padding matches site-wide section standard (py-16). */}
        <div className="py-12 lg:py-16">

          {/* FF + wordmark cluster — same as header pattern.
              Bottom margin reduced (was mb-16) now that Zone 1 padding
              is the standard py-16 — keeps internal rhythm balanced. */}
          <div className="flex items-stretch gap-3 mb-8 lg:mb-10">
            <span className="text-4xl font-display font-medium text-ff-white tracking-tight leading-none">
              FF
            </span>
            <span className="flex flex-col justify-between text-left pt-[7px] pb-[5px]">
              <span className="text-[11px] font-semibold tracking-[0.3em] text-ff-white font-display whitespace-nowrap leading-none">
                FUNDAMENTAL FRONTIERS
              </span>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-ff-ink-muted font-display whitespace-nowrap leading-none">
                CONSULTING
              </span>
            </span>
          </div>

          {/* Editorial brand statement.
              text-2xl lg:text-3xl deliberately smaller than the CtaStrip
              text-3xl lg:text-4xl heading directly above — keeps the footer
              from echoing the closing CTA at the same volume. */}
          <p className="text-2xl lg:text-3xl font-light leading-[1.2] text-ff-white max-w-2xl mb-6">
            Consulting on risk, quality, and operations.
          </p>
          <p className="text-base lg:text-lg text-ff-ink-muted leading-relaxed max-w-xl">
            Senior consultants. Direct deployment. Structured closure.
          </p>
        </div>

        {/* ─── ZONE 2 — Info row ─────────────────────────────────────
            CONTACT and FRAMEWORKS spread via flex justify-between.
            Wine eyebrows (text-ff-wine) match the rest of the site's
            eyebrow color — this is the first place wine appears in the
            footer, used as accent. */}
        <div className="py-8 lg:py-16 border-t border-ff-ink-soft">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-12">

            {/* CONTACT */}
            <div>
              <Eyebrow className="mb-3">
                CONTACT
              </Eyebrow>
              <div className="space-y-3">
                <a
                  href="mailto:contact@fundamentalfrontiers.com"
                  onClick={() => trackEvent('email_click', { source: 'footer' })}
                  className="block text-base text-ff-ink-muted leading-relaxed hover:text-ff-white transition-colors"
                >
                  contact@fundamentalfrontiers.com
                </a>
                <a
                  href="tel:+14047799001"
                  onClick={() => trackEvent('phone_click', { source: 'footer' })}
                  className="block text-base text-ff-ink-muted leading-relaxed hover:text-ff-white transition-colors"
                >
                  +1 404 779 9001
                </a>
              </div>
            </div>

            {/* FRAMEWORKS */}
            <div>
              <Eyebrow className="mb-3">
                FRAMEWORKS
              </Eyebrow>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['ISO 9001', 'AS 9100', 'IATF 16949', 'Lean 6σ'].map((fw) => (
                  <span key={fw} className="text-sm text-ff-ink-muted leading-relaxed">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ─── ZONE 3 — Legal row ────────────────────────────────────
            Compact: just copyright + legal links. Hairline above keeps
            the rhythm consistent. */}
        <div className="py-6 lg:py-8 border-t border-ff-ink-soft flex flex-col lg:flex-row justify-between items-center gap-4">
          <span className="text-sm text-ff-ink-muted">
            © 2026 Fundamental Frontiers. All rights reserved.
          </span>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <CompanyProfileCTA source="footer" variant="minimal" />
            <button
              onClick={() => {
                trackEvent('principles_modal_open', { source: 'footer' })
                setOpenModal('principles')
              }}
              className="text-sm text-ff-ink-muted hover:text-ff-white transition-colors"
            >
              Principles
            </button>
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('linkedin_click', { source: 'footer' })}
              className="text-sm text-ff-ink-muted hover:text-ff-white transition-colors"
            >
              LinkedIn
            </Link>
            <a href="#" className="text-sm text-ff-ink-muted hover:text-ff-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-ff-ink-muted hover:text-ff-white transition-colors">
              Terms
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
