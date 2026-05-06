/**
 * FF HOMEPAGE HERO — Variation C (Editorial / Industrial)
 *
 * Locked design:
 *  - Cream background (#F6F1ED)
 *  - 2-column grid (left: copy, right: real photograph)
 *  - Single CTA (confident, not optionful)
 *  - Eyebrow → H1 → Lead → CTA cadence with locked spacing
 *  - Static hero image (no Ken Burns — restraint is the brand voice)
 *
 * Every measurement comes from /lib/design-tokens.ts via scaffolds.
 */

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eyebrow, HeroH1, HeroAccent, Lead } from '@/components/brand/typography'
import { PrimaryCTA } from '@/components/brand/buttons'

export function HomepageHero() {
  return (
    <section className="relative pt-28 lg:pt-24 pb-16 lg:pb-0 bg-ff-cream lg:min-h-[78vh] flex items-center overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 w-full">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 items-center">

          {/* ─── LEFT: COPY ───────────────────────────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Eyebrow className="mb-8">Risk · Quality · Operations</Eyebrow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-12"
            >
              <HeroH1 className="-ml-[6px]">
                Built for organisations that need{' '}
                <HeroAccent>steadier execution.</HeroAccent>
              </HeroH1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-12"
            >
              <Lead className="max-w-xl">
                Senior-led engagements with named accountability. One consultant
                owns your file from start to finish — no rotation, no
                subcontracting, no handoffs.
              </Lead>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <PrimaryCTA
                href="https://calendly.com/admin-fundamentalfrontiers/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                external
                trackName="book_call_click"
                trackSource="home_hero"
              >
                Book a readiness call
              </PrimaryCTA>
            </motion.div>

            {/* ─── LOCATION SIGNAL ──────────────────────────────────
                Small ink-muted line below the CTA. Establishes US base
                + service region without adding visual weight. Uses
                eyebrow-style tracking but ink-muted color so it doesn't
                compete with the wine eyebrow above. Same component is
                used in About and Principles modal heroes. */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 lg:mt-16"
            >
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-ff-ink-muted font-display leading-relaxed">
                Atlanta · Raleigh · Houston, USA
                <span className="hidden lg:inline mx-3 text-ff-ink-muted/50">|</span>
                <span className="block lg:inline mt-1 lg:mt-0 text-ff-ink-muted/80 normal-case tracking-normal text-sm">
                  Serving North America and beyond
                </span>
              </p>
            </motion.div>
          </div>

          {/* ─── RIGHT: HERO IMAGE (static) ─────────────────── */}
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
  )
}
