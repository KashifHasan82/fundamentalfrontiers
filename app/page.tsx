"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck, BadgeCheck, BarChart3,
  ShieldAlert, Gauge, Search,
  Wrench, Car, Zap, Package, Stethoscope, RefreshCw, Home,
  Award, Leaf, HardHat, Fingerprint, Rocket, HeartPulse, Cog, Target,
  type LucideIcon,
} from "lucide-react"
import { HomepageHero } from "@/components/brand/homepage-hero"
import { SiteFooter } from "@/components/brand/site-footer"
import { CtaStrip } from "@/components/brand/cta-strip"
import { TabNav } from "@/components/brand/tab-nav"
import { MobileCarousel, CarouselCounter } from "@/components/brand/mobile-carousel"
import { RequestModal, type RequestModalState } from "@/components/brand/request-modal"
import { CompanyProfileCTA } from "@/components/brand/company-profile-cta"
import { Eyebrow } from "@/components/brand/typography"
import { CommonQuestions } from "@/components/brand/common-questions"
import { trackEvent } from "@/lib/track"

// ============================================================
// FUNDAMENTAL FRONTIERS — HOMEPAGE (LOCKED REFERENCE)
//
// This file is the locked design reference for every other surface
// (modals, future pages). Patterns used here are the only patterns
// allowed elsewhere; deviation = drift.
//
// LOCKED PATTERNS INCLUDE:
//  - Hero geometry (HomepageHero)
//  - Section header (Insights-style: eyebrow + H2 left, lead right)
//  - Cards (Insights-style: bg-ff-white, p-10, hover:shadow-xl)
//  - Hairline grid (Standards-style: gap-px on bg-ff-ink/10)
//  - Slim flex-wrap credential strip (Frameworks)
//  - CtaStrip variant="wine" + SiteFooter
//  - Wine accent: HeroAccent — Title Case, no UPPERCASE, no tracking-tight
//  - Container: max-w-[1400px] mx-auto px-6 lg:px-16 (mobile px-6, desktop locked lg:px-16)
//  - Section padding: py-32 default, py-24 compact
//  - Lucide line icons (strokeWidth 1.5) for Services tabs, Programs
//    tabs, Industries cells, Standards strip — wine on rest, ink-muted
//    or white on hover/active per local pattern
//
// MOBILE PATTERNS (< lg, additive — desktop unchanged):
//  - TabNav (Services / Programs): center-snap carousel — active tab in
//    focus, prev + next tabs peek on left and right. Tap a peek OR swipe
//    to switch. Tab CONTENT stays static (only active tab body shown).
//  - Services / Programs side credential panel: cream-light BOX dropped;
//    eyebrow + chips shown as slim inline list (` · `-joined typography)
//    matching the Frameworks/Standards editorial pattern.
//  - Industries: Standards-style centered icon + name strip (NOT a grid,
//    NOT a carousel) — same minimal pattern as the Frameworks section.
//  - Selected Work: center-snap carousel — active card in focus with
//    prev + next cards peeking on both sides. Counter "01 / 03" below.
// ============================================================

// ─── DATA ──────────────────────────────────────────────────────

type ServiceTab = {
  id: number
  title: string
  subtitle: string
  icon: LucideIcon
  lead: string
  items: string[]
  panelEyebrow: string
  panelChips: string[]
}

const services: ServiceTab[] = [
  {
    id: 0,
    title: "Readiness & Governance",
    subtitle: "Framework alignment and compliance architecture",
    icon: ShieldCheck,
    lead: "Support for organisations that need clearer risk visibility, stronger compliance discipline, better controls, and a steadier response under audit or regulatory review.",
    items: [
      "Compliance certification support",
      "Audit readiness and internal review",
      "Control strengthening and governance support",
      "Risk and accountability improvement",
    ],
    panelEyebrow: "FRAMEWORKS WE WORK WITH",
    panelChips: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "AS 9100", "ISO 13485", "IATF 16949"],
  },
  {
    id: 1,
    title: "Quality & Execution",
    subtitle: "Process optimization and operational excellence",
    icon: BadgeCheck,
    lead: "Support for organisations that need stronger operating discipline, better standard work, faster issue resolution, and more reliable follow through in day to day execution.",
    items: [
      "SOP and standard work development and review",
      "Training alignment and role clarity",
      "Root cause and CAPA improvement",
      "Operational excellence through Kaizen sprints",
    ],
    panelEyebrow: "METHODOLOGIES",
    panelChips: ["Lean Six Sigma", "8D Problem Solving", "5-Why Analysis", "DMAIC", "Kaizen", "FMEA"],
  },
  {
    id: 2,
    title: "Visibility & Reporting",
    subtitle: "KPI dashboards and performance measurement",
    icon: BarChart3,
    lead: "Support for organisations that need clearer supplier visibility, stronger review rhythm, and faster management decisions.",
    items: [
      "Supplier performance support",
      "Dashboard and reporting",
      "Balanced scorecard",
      "Management visibility support",
    ],
    panelEyebrow: "TOOLS & PLATFORMS",
    panelChips: ["Power BI", "Balanced Scorecard", "OKR Frameworks", "Supplier Scorecards", "Executive Summaries"],
  },
]

type Program = {
  title: string
  icon: LucideIcon
  duration: string
  desc: string
  outputs: string[]
  scope: string[]
}

const programs: Program[] = [
  {
    title: "Risk & Compliance",
    icon: ShieldAlert,
    duration: "60–90 days",
    desc: "A focused program that clarifies risk exposure, strengthens evidence, and builds a steadier response under audit or regulatory review.",
    outputs: [
      "Current state review of risk, controls, and compliance exposure",
      "Evidence and accountability mapping across priority focus areas",
      "Structured action plan with ownership and review cadence",
    ],
    scope: [
      "Current-state audit",
      "Evidence mapping",
      "Risk register",
      "Gap analysis",
      "Action planning",
      "Readiness review",
    ],
  },
  {
    title: "Kaizen Blitz",
    icon: Gauge,
    duration: "90–120 days",
    desc: "A focused improvement sprint that targets visible bottlenecks, aligns teams, and drives measurable gains in a short cycle.",
    outputs: [
      "Rapid review of visible process inefficiencies and bottlenecks",
      "Focused team workshops and improvement actions on priority areas",
      "Short cycle tracking of actions, gains, and follow through",
    ],
    scope: [
      "Waste review",
      "Process mapping",
      "Priority workshops",
      "Standard work",
      "Gain tracking",
      "Sustainment plan",
    ],
  },
  {
    title: "Root Cause & CAPA",
    icon: Search,
    duration: "30–60 days",
    desc: "A structured program that strengthens root cause thinking, corrective action design, and closure discipline on repeat issues.",
    outputs: [
      "Structured issue review and root cause analysis on priority cases",
      "Corrective and preventive action design with ownership clarity",
      "Follow up tracking to strengthen closure discipline and effectiveness",
    ],
    scope: [
      "Issue review",
      "5-Why analysis",
      "Fishbone facilitation",
      "CAPA design",
      "Effectiveness check",
      "Prevention controls",
    ],
  },
]

type Industry = {
  /** Full official name — used on desktop where there's room. */
  name: string
  /** Short single-word display name — used on the mobile Frameworks-style strip
   *  so visual density matches "ISO 9001" / "AS 9100". Multi-word full names
   *  wrap to two lines on phones and read inconsistently next to the short
   *  framework codes; this shortens to one word per cell. */
  short: string
  icon: LucideIcon
  /** Short uppercase sector tag — drives the [10px] tracking-[0.3em] eyebrow
   *  underneath the name. Matches the `sector` field in the Frameworks data
   *  shape one-to-one. */
  sector: string
  desc: string
}

const industries: Industry[] = [
  { name: "Engineering",            short: "Engineering",  icon: Wrench,      sector: "INDUSTRIAL", desc: "Manufacturing, industrial programs, and technical service operations under quality systems." },
  { name: "Automotive",             short: "Automotive",   icon: Car,         sector: "SUPPLIER",   desc: "Tiered supplier networks, production part approval, and IATF quality system audits." },
  { name: "Power & Utilities",      short: "Utilities",    icon: Zap,         sector: "POWER",      desc: "Generation, transmission, and distribution under strict safety and compliance regimes." },
  { name: "Supply Chain",           short: "Logistics",    icon: Package,     sector: "SUPPLY",     desc: "Logistics visibility, supplier performance management, and end-to-end governance." },
  { name: "Environmental Services", short: "Environmental",icon: Leaf,        sector: "ENVIRONMENT", desc: "ISO 14001 environments with permit-driven compliance and reportable emissions risk." },
  { name: "Medical Technology",     short: "MedTech",      icon: Stethoscope, sector: "MEDTECH",    desc: "Imaging systems, diagnostic instrumentation, and regulated device integration across clinical environments." },
  { name: "Process Manufacturing",  short: "Process",      icon: RefreshCw,   sector: "MFG",        desc: "Continuous and batch production with integrated quality, safety, and throughput." },
  { name: "Hospitality & Services", short: "Hospitality",  icon: Home,        sector: "SERVICES",   desc: "Service environments where repeatable SOP discipline directly drives outcome quality." },
]

type Study = {
  slug: string
  metric: string
  label: string
  title: string
  industry: string
  icon: LucideIcon
  desc: string
}

const studies: Study[] = [
  {
    slug: "5s-workplace-organisation",
    metric: "50%",
    label: "Search time reduced",
    title: "5S Workplace Organisation",
    industry: "Automotive",
    icon: Car,
    desc: "Fifteen work areas. Twelve weeks. The problem was never effort — it was control. By cycle one: search time halved, audit scores up 60%, 5S now part of the operating discipline.",
  },
  {
    slug: "wind-turbine-capa-programme",
    metric: "50%",
    label: "Failure rate cut",
    title: "Wind Turbine CAPA Programme",
    industry: "Power & Utilities",
    icon: Zap,
    desc: "A wind farm was losing 15% of energy output to repeat component failures. The trail led to one supplier — inconsistent materials, missing certifications. New supplier, tighter vetting, scheduled audits. Failure rate halved within the quarter.",
  },
  {
    slug: "contract-lifecycle-management",
    metric: "67%",
    label: "Contract cycle reduced",
    title: "Contract Lifecycle Management",
    industry: "Supply Chain",
    icon: Package,
    desc: "A 1,200-person enterprise was eighteen days from request to signature. Missed renewals, scattered records, Legal pulled into routine work. After standard templates, integrated systems, and clear escalation rules — six days to signature, $420K recovered, Legal back on the contracts that mattered.",
  },
]

// ─── TAB CONTENT BODIES ────────────────────────────────────────
// One render per tab. All panels stay in the HTML for crawlability while
// only the selected panel is visible to the visitor. Inside each body we
// branch the side credential panel: cream-light BOX on desktop, slim
// inline list on mobile (matches Frameworks editorial pattern).

function ServicesTabBody({ tab }: { tab: ServiceTab }) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
      <div>
        <p className="text-xl text-ff-ink-muted leading-relaxed mb-8">
          {tab.lead}
        </p>
        <div className="space-y-4">
          {tab.items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 py-3 border-b border-ff-ink/5">
              <span className="w-6 h-6 rounded-full bg-ff-wine/10 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-ff-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-ff-ink-muted">{item}</span>
            </div>
          ))}
        </div>

        {/* MOBILE inline credential list — slim, no box (matches Frameworks
            editorial pattern). Hidden on desktop where the side panel takes over. */}
        <div className="lg:hidden mt-10 pt-8 border-t border-ff-ink/10">
          <Eyebrow className="mb-3">
            {tab.panelEyebrow}
          </Eyebrow>
          <p className="text-sm text-ff-ink-muted leading-relaxed">
            {tab.panelChips.join(' · ')}
          </p>
        </div>
      </div>

      {/* DESKTOP credential panel — cream-light box, locked. Hidden on mobile. */}
      <div className="hidden lg:block bg-ff-cream-light p-10">
        <Eyebrow className="mb-3">
          {tab.panelEyebrow}
        </Eyebrow>
        <div className="flex flex-wrap gap-2.5">
          {tab.panelChips.map((chip) => (
            <span
              key={chip}
              className="px-4 py-2 bg-ff-white border border-ff-ink/10 text-sm font-medium text-ff-ink hover:border-ff-wine/40 hover:text-ff-wine transition-colors cursor-default"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProgramsTabBody({ tab }: { tab: Program }) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left: Content */}
      <div>
        <div className="mb-8">
          <span className="text-[11px] font-semibold tracking-[0.3em] text-ff-wine block font-display mb-2">
            ENGAGEMENT WINDOW
          </span>
          <span className="text-2xl font-light text-ff-ink">
            {tab.duration}
          </span>
        </div>

        <h3 className="text-3xl lg:text-4xl font-light text-ff-ink mb-6">
          {tab.title}
        </h3>

        <p className="text-xl text-ff-ink-muted leading-relaxed mb-10">
          {tab.desc}
        </p>

        <div>
          <Eyebrow className="mb-3">
            DELIVERABLES
          </Eyebrow>
          <ul className="space-y-4">
            {tab.outputs.map((output, j) => (
              <li key={j} className="flex items-start gap-4 text-ff-ink-muted">
                <span className="w-6 h-6 rounded-full bg-ff-wine/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-ff-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {output}
              </li>
            ))}
          </ul>
        </div>

        {/* MOBILE inline scope list */}
        <div className="lg:hidden mt-10 pt-8 border-t border-ff-ink/10">
          <Eyebrow className="mb-3">
            ENGAGEMENT SCOPE
          </Eyebrow>
          <p className="text-sm text-ff-ink-muted leading-relaxed">
            {tab.scope.join(' · ')}
          </p>
        </div>
      </div>

      {/* DESKTOP scope panel — cream-light box, locked. Hidden on mobile. */}
      <div className="hidden lg:block bg-ff-cream-light p-10">
        <Eyebrow className="mb-3">
          ENGAGEMENT SCOPE
        </Eyebrow>
        <div className="flex flex-wrap gap-2.5">
          {tab.scope.map((item, j) => (
            <span
              key={j}
              className="px-4 py-2 bg-ff-white border border-ff-ink/10 text-sm font-medium text-ff-ink hover:border-ff-wine/40 hover:text-ff-wine transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────

const homepageStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.fundamentalfrontiers.com/#organization',
      name: 'Fundamental Frontiers',
      alternateName: 'Fundamental Frontiers Consulting',
      url: 'https://www.fundamentalfrontiers.com/',
      logo: 'https://www.fundamentalfrontiers.com/icon.svg',
      description:
        'Senior-led consulting across risk, quality, compliance, operations, and continuous improvement.',
      email: 'contact@fundamentalfrontiers.com',
      telephone: '+1-404-779-9001',
      sameAs: ['https://www.linkedin.com/company/fundamental-frontiers/'],
      address: [
        {
          '@type': 'PostalAddress',
          addressLocality: 'Atlanta',
          addressRegion: 'GA',
          addressCountry: 'US',
        },
        {
          '@type': 'PostalAddress',
          addressLocality: 'Raleigh',
          addressRegion: 'NC',
          addressCountry: 'US',
        },
        {
          '@type': 'PostalAddress',
          addressLocality: 'Houston',
          addressRegion: 'TX',
          addressCountry: 'US',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer enquiries',
        email: 'contact@fundamentalfrontiers.com',
        telephone: '+1-404-779-9001',
      },
      knowsAbout: [
        'Risk management',
        'Quality management systems',
        'Operational excellence',
        'ISO standards',
        'Lean Six Sigma',
        'Compliance readiness',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Consulting services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Readiness and governance consulting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Quality and execution consulting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance visibility and reporting' } },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.fundamentalfrontiers.com/#website',
      url: 'https://www.fundamentalfrontiers.com/',
      name: 'Fundamental Frontiers',
      publisher: {
        '@id': 'https://www.fundamentalfrontiers.com/#organization',
      },
      inLanguage: 'en-US',
    },
  ],
}

export default function HomePage() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [activeProgramTab, setActiveProgramTab] = useState(0)
  const [activeStudy, setActiveStudy] = useState(0)
  const [modalState, setModalState] = useState<RequestModalState>(null)

  const toggleSection = (section: string) => {
    const isSwitching = openSection !== null && openSection !== section
    const isOpening = openSection !== section
    setOpenSection(isOpening ? section : null)
    if (!isOpening) return

    const delay = isSwitching ? 520 : 30
    setTimeout(() => {
      const el = document.getElementById(section)
      if (!el) return
      // Header is h-20 on mobile, h-24 on desktop
      const headerOffset = window.innerWidth >= 1024 ? 96 : 80
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }, delay)
  }

  return (
    <div className="bg-ff-white text-ff-ink antialiased">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData).replace(/</g, '\\u003c'),
        }}
      />

      {/* Header is rendered globally by app/layout.tsx via <SiteHeader />. */}

      {/* ============ HERO ============ */}
      <HomepageHero />

      {/* ============ COMPANY PROFILE STRIP ============
          Compact strip directly below the hero. Visually a closing
          footnote to the hero rather than a new section — same cream
          bg, no border-t (the strip below it has its own).
          Container, max-w, and px values match the locked grid. */}
      <section className="py-8 lg:py-10 bg-ff-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
            <div>
              <Eyebrow className="mb-3">
                COMPANY PROFILE
              </Eyebrow>
              <p className="text-base text-ff-ink-muted leading-relaxed">
                A complete overview of our services, frameworks, and recent work.
              </p>
            </div>
            <CompanyProfileCTA source="home_inline" variant="secondary" />
          </div>
        </div>
      </section>

      {/* ============ SERVICES - TWO-TIER DISCOVERY ============ */}
      <section id="services" className="border-t border-ff-ink/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <button
            type="button"
            onClick={() => toggleSection("services")}
            aria-expanded={openSection === "services"}
            aria-controls="services-content"
            className="w-full py-12 flex items-center justify-between group"
          >
            <div className="flex items-start gap-5 lg:gap-12 text-left">
              <span className="text-4xl lg:text-5xl font-extralight text-ff-wine/30 group-hover:text-ff-wine/60 transition-colors font-display tabular-nums leading-none pt-2">
                01
              </span>
              <div>
                <Eyebrow className="mb-3">
                  WHAT WE DO
                </Eyebrow>
                <h2 className="text-3xl lg:text-4xl font-light group-hover:text-ff-wine transition-colors">
                  Services
                </h2>
                {openSection !== "services" && (
                  <p className="text-ff-ink-muted mt-3 max-w-xl">
                    Consulting and implementation services across risk, quality, and continuous improvement — built to move both the top and bottom lines.
                  </p>
                )}
              </div>
            </div>
            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
              openSection === "services"
                ? 'bg-ff-wine border-ff-wine rotate-0'
                : 'border-ff-ink/20 group-hover:border-ff-wine'
            }`}>
              <svg className={`w-6 h-6 transition-all duration-300 ${openSection === "services" ? 'text-ff-white rotate-45' : 'text-ff-ink-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>

          <motion.div
            id="services-content"
            initial={false}
            animate={openSection === "services"
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden={openSection !== "services"}
            inert={openSection !== "services"}
            className="overflow-hidden"
          >
                <div className="pb-16">
                  {/* Tab Navigation — center-snap carousel on mobile,
                      3-up flex grid on desktop. The TabNav itself is the
                      carousel: active tab in focus, prev/next peeking. */}
                  <TabNav
                    tabs={services.map(s => ({ id: s.id, title: s.title, subtitle: s.subtitle, icon: s.icon }))}
                    activeId={activeTab}
                    onChange={(id) => setActiveTab(id as number)}
                  />

                  {/* All panels remain in the DOM; only the selected panel is visible. */}
                  {services.map((service, index) => (
                    <div
                      key={service.id}
                      hidden={index !== activeTab}
                      aria-hidden={index !== activeTab}
                    >
                      <ServicesTabBody tab={service} />
                    </div>
                  ))}
                </div>
          </motion.div>
        </div>
      </section>

      {/* ============ PROGRAMS - TWO-TIER DISCOVERY ============ */}
      <section id="programs" className="border-t border-ff-ink/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <button
            type="button"
            onClick={() => toggleSection("programs")}
            aria-expanded={openSection === "programs"}
            aria-controls="programs-content"
            className="w-full py-12 flex items-center justify-between group"
          >
            <div className="flex items-start gap-5 lg:gap-12 text-left">
              <span className="text-4xl lg:text-5xl font-extralight text-ff-wine/30 group-hover:text-ff-wine/60 transition-colors font-display tabular-nums leading-none pt-2">
                02
              </span>
              <div>
                <Eyebrow className="mb-3">
                  HOW WE ENGAGE
                </Eyebrow>
                <h2 className="text-3xl lg:text-4xl font-light group-hover:text-ff-wine transition-colors">
                  Programs
                </h2>
                {openSection !== "programs" && (
                  <p className="text-ff-ink-muted mt-3 max-w-xl">
                    Flagship engagements designed to move risk, process, quality, and execution discipline — for organisations that need demonstrable progress.
                  </p>
                )}
              </div>
            </div>
            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
              openSection === "programs"
                ? 'bg-ff-wine border-ff-wine'
                : 'border-ff-ink/20 group-hover:border-ff-wine'
            }`}>
              <svg className={`w-6 h-6 transition-all duration-300 ${openSection === "programs" ? 'text-ff-white rotate-45' : 'text-ff-ink-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>

          <motion.div
            id="programs-content"
            initial={false}
            animate={openSection === "programs"
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden={openSection !== "programs"}
            inert={openSection !== "programs"}
            className="overflow-hidden"
          >
                <div className="pb-16">
                  <TabNav
                    tabs={programs.map((p, i) => ({
                      id: i,
                      title: p.title,
                      subtitle: p.duration,
                      icon: p.icon,
                    }))}
                    activeId={activeProgramTab}
                    onChange={(id) => setActiveProgramTab(id as number)}
                  />

                  {/* All panels remain in the DOM; only the selected panel is visible. */}
                  {programs.map((program, index) => (
                    <div
                      key={program.title}
                      hidden={index !== activeProgramTab}
                      aria-hidden={index !== activeProgramTab}
                    >
                      <ProgramsTabBody tab={program} />
                    </div>
                  ))}
                </div>
          </motion.div>
        </div>
      </section>

      {/* ============ INDUSTRIES - TWO-TIER DISCOVERY ============ */}
      <section id="industries" className="border-t border-ff-ink/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <button
            type="button"
            onClick={() => toggleSection("industries")}
            aria-expanded={openSection === "industries"}
            aria-controls="industries-content"
            className="w-full py-12 flex items-center justify-between group"
          >
            <div className="flex items-start gap-5 lg:gap-12 text-left">
              <span className="text-4xl lg:text-5xl font-extralight text-ff-wine/30 group-hover:text-ff-wine/60 transition-colors font-display tabular-nums leading-none pt-2">
                03
              </span>
              <div>
                <Eyebrow className="mb-3">
                  WHERE WE WORK
                </Eyebrow>
                <h2 className="text-3xl lg:text-4xl font-light group-hover:text-ff-wine transition-colors">
                  Industries
                </h2>
                {openSection !== "industries" && (
                  <p className="text-ff-ink-muted mt-3 max-w-xl">
                    Eight sectors where our consultants have deep operational experience.
                  </p>
                )}
              </div>
            </div>
            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
              openSection === "industries"
                ? 'bg-ff-wine border-ff-wine'
                : 'border-ff-ink/20 group-hover:border-ff-wine'
            }`}>
              <svg className={`w-6 h-6 transition-all duration-300 ${openSection === "industries" ? 'text-ff-white rotate-45' : 'text-ff-ink-muted'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>

          <motion.div
            id="industries-content"
            initial={false}
            animate={openSection === "industries"
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden={openSection !== "industries"}
            inert={openSection !== "industries"}
            className="overflow-hidden"
          >
                <div className="pb-16">
                  {/* MOBILE: byte-for-byte replica of the Frameworks/Standards
                      cell. Same flex container, same gap-x-10 gap-y-8, same
                      icon size/colour/stroke, same text-xl font-semibold name,
                      same [10px] tracking-[0.3em] sector eyebrow.
                      Uses `industry.short` (single-word display name) so the
                      character density matches the framework codes — "ISO
                      9001" and "Engineering" are roughly the same width;
                      "Hospitality & Services" wrapping to two lines was the
                      visual mismatch the user flagged.
                      `font-sans` is set explicitly to lock the body Barlow
                      family — no inheritance ambiguity. */}
                  <div className="lg:hidden flex flex-wrap items-start justify-center gap-x-10 gap-y-8">
                    {industries.map((industry, i) => (
                      <div key={i} className="text-center">
                        <industry.icon
                          className="w-5 h-5 text-ff-wine mx-auto mb-2.5"
                          strokeWidth={1.5}
                        />
                        <div className="font-sans text-xl font-semibold text-ff-ink leading-tight mb-1.5">
                          {industry.short}
                        </div>
                        <span className="block text-[10px] font-semibold tracking-[0.3em] text-ff-ink-muted/70 font-display">
                          {industry.sector}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* DESKTOP: locked 4-col hairline grid with descriptions + hover */}
                  <div className="hidden lg:grid lg:grid-cols-4 gap-px bg-ff-ink/10">
                    {industries.map((industry, i) => (
                      <div key={i} className="bg-ff-white p-8 lg:p-10 group hover:bg-ff-wine transition-colors duration-300 cursor-default">
                        <industry.icon
                          className="w-6 h-6 mb-4 text-ff-wine group-hover:text-ff-white transition-colors"
                          strokeWidth={1.5}
                        />
                        <h3 className="text-xl font-semibold mb-3 text-ff-ink group-hover:text-ff-white transition-colors">
                          {industry.name}
                        </h3>
                        <p className="text-sm text-ff-ink-muted leading-relaxed group-hover:text-ff-white/70 transition-colors">
                          {industry.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
          </motion.div>
        </div>
      </section>

      {/* ============ CASE STUDIES ============ */}
      <section id="selected-work" className="py-16 bg-ff-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="mb-10 lg:mb-16">
            <Eyebrow className="mb-3">
              SELECTED WORK
            </Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-light">
              Proof points
            </h2>
          </div>

          {/* MOBILE: center-snap carousel — active card centered, prev/next peek both sides */}
          <div className="lg:hidden">
            <MobileCarousel activeIndex={activeStudy} onIndexChange={setActiveStudy}>
              {studies.map((study, i) => (
                <div
                  key={i}
                  className="relative bg-ff-white p-8 border-t border-ff-wine flex flex-col h-full"
                >
                  <span
                    className="absolute top-8 right-8 text-7xl font-extralight text-ff-wine/10 leading-none tabular-nums font-display select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>

                  <study.icon className="w-6 h-6 mb-4 text-ff-wine" strokeWidth={1.5} />

                  <div className="mb-8">
                    <span className="block text-6xl font-light text-ff-wine leading-none tracking-tight mb-2">
                      {study.metric}
                    </span>
                    <span className="text-sm text-ff-ink-muted">{study.label}</span>
                  </div>

                  <span className="text-[11px] font-semibold tracking-[0.3em] text-ff-wine block font-display mb-2">
                    {study.industry.toUpperCase()}
                  </span>

                  <h3 className="text-xl font-semibold mb-8 text-ff-ink leading-tight">
                    {study.title}
                  </h3>

                  <p className="text-ff-ink-muted leading-relaxed mb-10 flex-1">
                    {study.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="group inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] text-ff-wine font-display hover:text-ff-ink transition-colors"
                    >
                      READ CASE STUDY
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        trackEvent('case_study_request', { source: 'home_mobile', case_study: study.title })
                        setModalState({ kind: 'case-study', title: study.title })
                      }}
                      className="text-[11px] font-semibold tracking-[0.3em] text-ff-ink-muted font-display hover:text-ff-ink transition-colors"
                    >
                      REQUEST COPY
                    </button>
                  </div>
                </div>
              ))}
            </MobileCarousel>
            <CarouselCounter activeIndex={activeStudy} total={studies.length} />
          </div>

          {/* DESKTOP: locked 3-col grid (unchanged) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {studies.map((study, i) => (
              <div
                key={i}
                className="relative bg-ff-white p-8 lg:p-10 border-t border-ff-wine hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <span
                  className="absolute top-8 right-10 text-7xl font-extralight text-ff-wine/10 leading-none tabular-nums font-display select-none pointer-events-none"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>

                <study.icon className="w-6 h-6 mb-4 text-ff-wine" strokeWidth={1.5} />

                <div className="mb-8">
                  <span className="block text-6xl font-light text-ff-wine leading-none tracking-tight mb-2">
                    {study.metric}
                  </span>
                  <span className="text-sm text-ff-ink-muted">{study.label}</span>
                </div>

                <span className="text-[11px] font-semibold tracking-[0.3em] text-ff-wine block font-display mb-2">
                  {study.industry.toUpperCase()}
                </span>

                <h3 className="text-xl font-semibold mb-8 text-ff-ink leading-tight">
                  {study.title}
                </h3>

                <p className="text-ff-ink-muted leading-relaxed mb-10 flex-1">
                  {study.desc}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] text-ff-wine font-display hover:text-ff-ink transition-colors"
                  >
                    READ CASE STUDY
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('case_study_request', { source: 'home_desktop', case_study: study.title })
                      setModalState({ kind: 'case-study', title: study.title })
                    }}
                    className="text-[11px] font-semibold tracking-[0.3em] text-ff-ink-muted font-display hover:text-ff-ink transition-colors"
                  >
                    REQUEST COPY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STANDARDS — locked, reads fine on mobile ============ */}
      <section className="py-16 bg-ff-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="mb-8 max-w-3xl">
            <Eyebrow className="mb-3">
              STANDARDS
            </Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-light text-ff-ink">
              Frameworks we deploy <span className="font-display font-medium uppercase tracking-tight text-ff-wine">&amp; audit against.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8 lg:gap-x-14 lg:gap-y-10">
            {[
              { name: "ISO 9001",   icon: Award,       desc: "Quality management systems — general industry",  sector: "QUALITY" },
              { name: "ISO 14001",  icon: Leaf,        desc: "Environmental management systems",                sector: "ENVIRONMENT" },
              { name: "ISO 45001",  icon: HardHat,     desc: "Occupational health and safety management",       sector: "SAFETY" },
              { name: "ISO 27001",  icon: Fingerprint, desc: "Information security management systems",         sector: "INFOSEC" },
              { name: "AS 9100",    icon: Rocket,      desc: "Aerospace quality management systems",            sector: "AEROSPACE" },
              { name: "ISO 13485",  icon: HeartPulse,  desc: "Medical device quality management",               sector: "MEDICAL" },
              { name: "IATF 16949", icon: Cog,         desc: "Automotive quality management systems",           sector: "AUTOMOTIVE" },
              { name: "Lean Six Sigma", icon: Target, desc: "Yellow, Green & Black Belt practitioner level", sector: "IMPROVEMENT" },
            ].map((fw, i) => (
              <div key={i} className="text-center">
                <fw.icon
                  className="w-5 h-5 text-ff-wine mx-auto mb-2.5"
                  strokeWidth={1.5}
                />
                <div className="font-sans text-xl font-semibold text-ff-ink leading-tight mb-1.5">
                  {fw.name}
                </div>
                <span className="block text-[10px] font-semibold tracking-[0.3em] text-ff-ink-muted/70 font-display">
                  {fw.sector}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-ff-ink-muted/70 max-w-3xl leading-relaxed">
            The firm does not claim to hold registrar certifications except where individually stated by a consultant.
          </p>
        </div>
      </section>

      {/* ============ COMMON QUESTIONS — concise, crawlable answers ============ */}
      <CommonQuestions />

      {/* ============ CTA ============ */}
      <CtaStrip
        variant="wine"
        heading="Ready to close the gap?"
        subline="Let's discuss where you are today and where you need to be. No obligation, no pitch deck."
        ctaLabel="Book a 30-minute call"
        secondaryCtaLabel="Send us an enquiry"
        onSecondaryCta={() => setModalState({ kind: 'enquiry' })}
        trackSource="home_cta_strip"
      />

      {/* ============ FOOTER ============ */}
      <SiteFooter />

      {/* ============ REQUEST MODAL — case-study + enquiry variants ============ */}
      <RequestModal
        state={modalState}
        onClose={() => setModalState(null)}
      />

    </div>
  )
}
