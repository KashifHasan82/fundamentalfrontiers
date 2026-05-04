/**
 * FUNDAMENTAL FRONTIERS — DESIGN TOKENS
 * Single source of truth for the brand. Locked to the official company profile
 * (95PercentFF_Company_Profile.pptx).
 *
 * Every brand value MUST trace back to this file. Components import from here
 * for inline-style usage. Tailwind classes (bg-ff-wine, text-ff-ink, etc.) are
 * generated from globals.css — same values, two consumption paths.
 *
 * Adding a new color/font/size requires verification against the company
 * profile. No improvising.
 */

// ─────────────────────────────────────────────────────────────────
// COLORS — extracted directly from the locked company profile
// (ranked by usage frequency across all slides)
// ─────────────────────────────────────────────────────────────────
export const colors = {
  // Wine — primary brand accent
  wine: '#7A1F2B',
  wineDark: '#611823',
  wineSoft: 'rgba(122, 31, 43, 0.08)',
  wineSoftStrong: 'rgba(122, 31, 43, 0.18)',

  // Creams — backgrounds and surfaces
  cream: '#F6F1ED',         // primary background
  creamLight: '#F8F5F2',    // lighter surface (cards on cream)
  creamDark: '#F0EAE0',     // deeper accent surface

  // Inks — text colors (cool tone, not pure black)
  ink: '#171B24',           // primary body text
  inkVariant: '#1E2230',    // alternate dark
  inkSoft: '#343434',       // dark gray
  inkMuted: '#6C7585',      // secondary / supporting text

  // Lines and borders
  line: 'rgba(23, 27, 36, 0.10)',
  lineStrong: 'rgba(23, 27, 36, 0.20)',

  // Neutral
  white: '#FFFFFF',
} as const

// ─────────────────────────────────────────────────────────────────
// TYPOGRAPHY — Barlow + Barlow Condensed (locked from profile)
// ─────────────────────────────────────────────────────────────────
export const fonts = {
  body: 'var(--font-barlow), system-ui, sans-serif',
  display: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif',
} as const

// Type scale — these sizes are the locked "math". Do not deviate.
export const typeScale = {
  // Eyebrow / kicker (uppercase, condensed, wine)
  eyebrow: { size: 'text-[11px]', tracking: 'tracking-[0.3em]', weight: 'font-semibold' },

  // Hero H1
  hero: { size: 'text-[clamp(2.5rem,5vw,4.5rem)]', tracking: 'tracking-tight', weight: 'font-light', leading: 'leading-[1.1]' },

  // Section H2
  h2: { size: 'text-3xl lg:text-4xl', weight: 'font-light' },
  h2Large: { size: 'text-4xl lg:text-5xl', weight: 'font-light' },

  // Card H3
  h3: { size: 'text-2xl lg:text-3xl', weight: 'font-semibold' },
  h3Small: { size: 'text-xl', weight: 'font-semibold' },

  // Body
  lead: { size: 'text-xl', weight: 'font-normal', leading: 'leading-relaxed' },
  body: { size: 'text-base', weight: 'font-normal', leading: 'leading-relaxed' },
  small: { size: 'text-sm', weight: 'font-normal' },
  caption: { size: 'text-xs', weight: 'font-normal' },
} as const

// ─────────────────────────────────────────────────────────────────
// LAYOUT — container, gutters, header (locks the global page math)
// ─────────────────────────────────────────────────────────────────
export const layout = {
  containerMax: 'max-w-[1400px]',
  containerCenter: 'mx-auto',
  sidePadding: 'px-8 lg:px-16',  // 32px → 64px
  headerHeight: 'h-24',           // 96px

  // Composite — most common wrapper
  container: 'max-w-[1400px] mx-auto px-8 lg:px-16',
} as const

// ─────────────────────────────────────────────────────────────────
// SPACING — locks vertical rhythm across every page
// THIS is what guarantees the "flicker test" passes between pages.
// ─────────────────────────────────────────────────────────────────
export const spacing = {
  // Hero block — eyebrow → headline → subhead → CTA cadence
  heroTop: 'pt-24',                  // clears 96px sticky header
  heroEyebrowToHeading: 'mb-8',      // 32px
  heroHeadingToSubhead: 'mb-12',     // 48px
  heroSubheadToCta: 'mb-12',         // 48px
  heroMinHeight: 'min-h-[78vh]',     // 78vh — Variation C calibration

  // Section
  sectionPadding: 'py-16',           // 64px — standardized across all standalone sections + CtaStrip
  sectionDivider: 'border-t',        // border-color via globals

  // Grids
  gapTight: 'gap-8',
  gapDefault: 'gap-12',
  gapWide: 'gap-16',
} as const

// ─────────────────────────────────────────────────────────────────
// MOTION — framer-motion presets (locked timing & easing)
// ─────────────────────────────────────────────────────────────────
export const motion = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeUpStrong: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  durationFast: 0.5,
  durationDefault: 0.6,
  durationSlow: 0.7,
  easeInOut: [0.4, 0, 0.2, 1] as const,  // accordion / heavy transitions
} as const
