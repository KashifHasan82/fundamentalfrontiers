'use client'

import { useState, useEffect } from 'react'
import { ArrowUp, Calendar } from 'lucide-react'

export function MobileUtilities() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 860)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setIsVisible(false)
      return
    }

    const servicesSection = document.getElementById('services')
    if (!servicesSection) return

    const handleScroll = () => {
      const threshold = 96
      const rect = servicesSection.getBoundingClientRect()
      setIsVisible(rect.bottom <= threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isMobile) return null

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}
    >
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-14 right-4 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors"
        style={{ 
          background: 'var(--ff-surface-solid)',
          border: '1px solid var(--ff-line)',
        }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" style={{ color: 'var(--ff-ink)' }} />
      </button>

      {/* Book CTA Bar */}
      <div 
        className="px-4 py-3 safe-area-inset-bottom"
        style={{ background: 'var(--ff-wine)' }}
      >
        <a
          href="https://calendly.com/admin-fundamentalfrontiers/30min?hide_event_type_details=1&hide_gdpr_banner=1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 font-semibold rounded-lg"
          style={{ 
            background: 'white',
            color: 'var(--ff-wine)',
          }}
        >
          <Calendar className="w-5 h-5" />
          Book a Call
        </a>
      </div>
    </div>
  )
}
