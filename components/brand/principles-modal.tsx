/**
 * FF PRINCIPLES MODAL
 *
 * Built using home-page patterns ONLY. No invented sections.
 *
 * Pattern map:
 *   1. Hero          → mirrors HomepageHero (text left, image right)
 *   2. Principles    → mirrors home Standards 4×2 grid (lines 540-584 of page.tsx)
 *                      `grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ff-ink/10 border border-ff-ink/10`
 *                      Cells: `bg-ff-cream-light p-8 lg:p-10`
 *   3. CTA           → CtaStrip wine variant (locked component)
 *   4. Footer        → SiteFooter (locked component)
 *
 * Section bg progression: cream (hero) → white (principles) → wine (CTA) → ink (footer)
 * The previous quote-strip section has been removed — it had no parallel on home.
 */

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { UserCheck, ShieldCheck, Target, CheckCircle2 } from 'lucide-react'
import { ModalShell } from '@/components/brand/modal-shell'
import { SiteFooter } from '@/components/brand/site-footer'
import { CtaStrip } from '@/components/brand/cta-strip'
import { PrimaryCTA } from '@/components/brand/buttons'

const PRINCIPLES = [
  {
    num: '01',
    sector: 'OWNERSHIP',
    name: 'Named Consultant',
    icon: UserCheck,
    desc: 'One senior consultant owns your engagement from kickoff to written closure. No rotation, no handoffs.',
  },
  {
    num: '02',
    sector: 'DELIVERY',
    name: 'No Subcontracting',
    icon: ShieldCheck,
    desc: 'Every deliverable comes from FF consultants directly. We do not source execution to third parties.',
  },
  {
    num: '03',
    sector: 'SCOPE',
    name: 'Scoped to Deliver',
    icon: Target,
    desc: 'Engagements are sized for what can be done with integrity — not sold large and delivered thin.',
  },
  {
    num: '04',
    sector: 'CLOSURE',
    name: 'Structured Close',
    icon: CheckCircle2,
    desc: 'Written verification against every original gap. Handover. Sign-off. No open items left behind.',
  },
]

const CALENDLY_URL =
  'https://calendly.com/admin-fundamentalfrontiers/30min?hide_event_type_details=1&hide_gdpr_banner=1'

export function PrinciplesModal() {
  return (
    <ModalShell modalKey="principles">

      {/* ─── HERO — locked geometry shared with Home + About */}
      <section className="relative pt-28 lg:pt-24 pb-16 lg:pb-0 bg-ff-cream lg:min-h-[78vh] flex items-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 w-full">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 items-center">

            {/* Left: copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="block text-[11px] font-semibold tracking-[0.3em] text-ff-wine font-display mb-8 uppercase">
                  Our Principles
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mb-12"
              >
                <h1 className="-ml-[6px] text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.1] tracking-tight text-ff-ink">
                  Built different.{' '}
                  <span className="font-display font-medium text-ff-wine">
                    Deliberately.
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-12"
              >
                <p className="text-xl text-ff-ink-muted leading-relaxed max-w-xl">
                  Most consulting engagements fail at execution. Senior partners sell, juniors
                  deliver, accountability evaporates. We operate differently — and these are
                  the four rules that make it work.
                </p>
              </motion.div>

              {/* CTA added so Principles hero content height matches Home/About.
                  With items-center on the section, equal content heights mean
                  the eyebrow lands at the same y on every page. */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <PrimaryCTA
                  href="https://calendly.com/admin-fundamentalfrontiers/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                  external
                  trackName="book_call_click"
                  trackSource="principles_hero"
                >
                  Book a 30-minute call
                </PrimaryCTA>
              </motion.div>
            </div>

            {/* Right: hero image (mirrors HomepageHero) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden lg:block"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/hero.jpg"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── PRINCIPLES GRID — mirrors home Standards 4×2 grid pattern ─────── */}
      {/* Reference: app/page.tsx lines 540-584 (Standards section). Verbatim copy
          of the grid mechanics, only content swapped. */}
      <section className="py-16 bg-ff-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

          {/* Header — same eyebrow + h2 pattern as home Standards */}
          <div className="mb-10 lg:mb-16 max-w-3xl">
            <span className="block text-[11px] font-semibold tracking-[0.3em] text-ff-wine font-display mb-6">
              FOUR RULES
            </span>
            <h2 className="text-4xl lg:text-5xl font-light leading-[1.15] text-ff-ink">
              How we deliver{' '}
              <span className="font-display font-medium text-ff-wine">
                with integrity.
              </span>
            </h2>
          </div>

          {/* MOBILE: compact icon row — mirrors About modal "Who We Are"
              expanded pattern (icon + name + sector tag, no description).
              4 principles fit cleanly in a 2x2 grid on mobile. */}
          <div className="lg:hidden grid grid-cols-2 gap-x-6 gap-y-10">
            {PRINCIPLES.map((p) => (
              <div key={p.num} className="text-center">
                <p.icon
                  className="w-5 h-5 text-ff-wine mx-auto mb-2.5"
                  strokeWidth={1.5}
                />
                <div className="font-sans text-lg font-semibold text-ff-ink leading-tight mb-1.5">
                  {p.name}
                </div>
                <span className="block text-[10px] font-semibold tracking-[0.3em] text-ff-ink-muted/70 font-display">
                  {p.sector}
                </span>
              </div>
            ))}
          </div>

          {/* DESKTOP: 4-card grid with ICONS now added (was missing before).
              Same w-6 h-6 mb-4 wine strokeWidth-1.5 icon spec as the home
              Selected Work cards and About modal's desktop card pattern.
              Brand consistency: every card-style block on the site now
              opens with this same icon treatment. */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-px bg-ff-ink/10 border border-ff-ink/10">
            {PRINCIPLES.map((p) => (
              <div key={p.num} className="bg-ff-cream-light p-10 flex flex-col">
                <p.icon
                  className="w-6 h-6 text-ff-wine mb-4"
                  strokeWidth={1.5}
                />
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-3xl font-extralight text-ff-wine/40 font-display tabular-nums leading-none">
                    {p.num}
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.3em] text-ff-wine font-display">
                    {p.sector}
                  </span>
                </div>
                <div className="text-3xl font-light text-ff-ink mb-3">
                  {p.name}
                </div>
                <p className="text-sm text-ff-ink-muted leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Tail note — mirrors home Standards disclaimer pattern */}
          <p className="mt-10 text-sm text-ff-ink-muted/70 max-w-3xl leading-relaxed">
            These rules are non-negotiable. Engagements that cannot honour them are declined at proposal stage.
          </p>
        </div>
      </section>

      {/* ─── CTA — wine strip (locked CtaStrip component) ──────────────────── */}
      <CtaStrip
        variant="wine"
        heading="Ready to work with a different kind of consulting firm?"
        subline="Let's discuss how we can help your organisation."
        ctaLabel="Start a conversation"
        ctaHref={CALENDLY_URL}
        trackSource="principles_cta_strip"
      />

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <SiteFooter />

    </ModalShell>
  )
}
