'use client'

import { usePathname } from 'next/navigation'
import { NavProvider } from '@/lib/nav-context'
import { SiteHeader } from '@/components/brand/site-header'
import { PrinciplesModal } from '@/components/brand/principles-modal'
import { AboutModal } from '@/components/brand/about-modal'
import { CookieBanner } from '@/components/brand/cookie-banner'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCourse = pathname === '/free-course' || pathname.startsWith('/free-course/')

  if (isCourse) {
    return children
  }

  return (
    <NavProvider>
      <SiteHeader />
      {children}
      <PrinciplesModal />
      <AboutModal />
      <CookieBanner />
    </NavProvider>
  )
}
