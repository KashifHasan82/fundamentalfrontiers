'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#programs', label: 'Programs' },
  { href: '#industries', label: 'Industries' },
  { href: '#proof', label: 'Selected work' },
  { href: '#insights', label: 'Insights' },
  { href: '#contact-book', label: 'Contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Spy nav logic
      const marker = window.scrollY + 130
      const sections = ['services', 'programs', 'industries', 'proof', 'insights', 'contact-book']
        .map(id => document.getElementById(id))
        .filter(Boolean) as HTMLElement[]

      let current = sections[0]?.id || ''
      sections.forEach(section => {
        if (section.offsetTop <= marker) current = section.id
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.slice(1)
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        target.classList.add('spotlit')
        setTimeout(() => target.classList.remove('spotlit'), 1800)
      }, 260)
      history.replaceState(null, '', href)
    }
    setIsOpen(false)
  }

  return (
    <header
      className="site-header sticky top-0 z-[1200] bg-white/95 backdrop-blur-[12px] border-b border-[rgba(19,27,41,0.08)]"
      style={{ minHeight: '80px' }}
    >
      <div className="wrap">
        <div className="flex items-center justify-between min-h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div 
              className="w-[50px] h-[38px] flex-shrink-0 flex items-center justify-center rounded"
              style={{ 
                background: 'linear-gradient(135deg, #7a1f2b, #611823)',
              }}
            >
              <span className="text-white font-bold text-base tracking-tight">FF</span>
            </div>
            <div className="hidden sm:grid gap-0.5">
              <span className="font-serif text-[clamp(1.16rem,1.04rem+0.28vw,1.34rem)] text-[#171b24] leading-[0.98] tracking-[-0.02em]">
                Fundamental Frontiers
              </span>
              <span className="text-[0.68rem] tracking-[0.18em] uppercase text-[#6c7585] font-extrabold mt-0.5">
                Consulting
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-auto mr-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`min-h-[44px] inline-flex items-center justify-center px-3.5 py-2.5 rounded-full text-[clamp(0.92rem,0.88rem+0.18vw,1rem)] font-bold transition-all whitespace-nowrap ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#171b24] bg-[rgba(122,31,43,0.10)]'
                    : 'text-[#4c5668] hover:text-[#171b24] hover:bg-[rgba(122,31,43,0.10)]'
                }`}
                aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + LinkedIn - Desktop */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href="https://www.linkedin.com/company/fundamental-frontiers"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[42px] h-[42px] rounded-full inline-flex items-center justify-center border border-[rgba(19,27,41,0.12)] bg-[rgba(255,255,255,0.9)] shadow-[0_10px_24px_rgba(17,24,39,0.08)] text-[#7a1f2b] font-extrabold text-sm"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="https://calendly.com/admin-fundamentalfrontiers/30min?hide_event_type_details=1&hide_gdpr_banner=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-[46px] h-[46px] rounded-full inline-flex items-center justify-center border border-[rgba(19,27,41,0.12)] bg-[rgba(255,255,255,0.9)] shadow-[0_10px_24px_rgba(17,24,39,0.08)] text-[#171b24]"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-[12px] shadow-[0_20px_52px_rgba(17,24,39,0.11)] border-b border-[rgba(19,27,41,0.08)] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <nav className="flex flex-col p-4 wrap">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`px-4 py-3.5 text-base font-bold rounded-xl transition-colors ${
                activeSection === link.href.slice(1)
                  ? 'text-[#171b24] bg-[rgba(122,31,43,0.10)]'
                  : 'text-[#4c5668] hover:text-[#171b24] hover:bg-[rgba(122,31,43,0.06)]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 mt-4 pt-4 border-t border-[rgba(19,27,41,0.08)]">
            <a
              href="https://www.linkedin.com/company/fundamental-frontiers"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[46px] h-[46px] rounded-full inline-flex items-center justify-center border border-[rgba(19,27,41,0.12)] bg-[rgba(255,255,255,0.9)] shadow-sm text-[#7a1f2b] font-extrabold text-sm"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="https://calendly.com/admin-fundamentalfrontiers/30min?hide_event_type_details=1&hide_gdpr_banner=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-1 justify-center"
            >
              Book a Call
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
