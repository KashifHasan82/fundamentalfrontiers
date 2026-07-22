import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import { SiteShell } from '@/components/brand/site-shell'

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
  metadataBase: new URL('https://www.fundamentalfrontiers.com'),
  title: {
    default: 'Risk, Quality & Operations Consulting | Fundamental Frontiers',
    template: '%s | Fundamental Frontiers',
  },
  description:
    'Senior-led consulting for risk, quality, compliance, and operations. Named accountability, direct implementation, and structured closure.',
  applicationName: 'Fundamental Frontiers',
  authors: [{ name: 'Fundamental Frontiers' }],
  creator: 'Fundamental Frontiers',
  publisher: 'Fundamental Frontiers',
  category: 'Business consulting',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Fundamental Frontiers',
    title: 'Risk, Quality & Operations Consulting | Fundamental Frontiers',
    description:
      'Senior-led consulting for risk, quality, compliance, and operations. Named accountability, direct implementation, and structured closure.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Risk, Quality & Operations Consulting | Fundamental Frontiers',
    description:
      'Senior-led consulting for risk, quality, compliance, and operations.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased bg-ff-cream text-ff-ink">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
