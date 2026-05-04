import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import { NavProvider } from '@/lib/nav-context'
import { SiteHeader } from '@/components/brand/site-header'
import { PrinciplesModal } from '@/components/brand/principles-modal'
import { AboutModal } from '@/components/brand/about-modal'
import { CookieBanner } from '@/components/brand/cookie-banner'

const barlow = Barlow({
  subsets: ['latin'],
  variable: '--font-barlow',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fundamental Frontiers | Consulting on Risk, Quality, and Operations',
  description:
    'Senior-led consulting on risk, quality, and operations. Named consultants, no subcontracting, structured close.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7A1F2B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="font-sans antialiased bg-ff-cream text-ff-ink">
        <NavProvider>
          {/* Global header — rendered above everything, including modals */}
          <SiteHeader />

          {/* Page content (homepage by default) */}
          {children}

          {/* Modals — global mount points. Each is gated by its modalKey
              and only renders when the nav context says it should. */}
          <PrinciplesModal />
          <AboutModal />

          {/* Cookie banner — bottom-left floating card, persists dismissal
              in localStorage. Renders on top of everything including modals. */}
          <CookieBanner />
        </NavProvider>
      </body>
    </html>
  )
}
