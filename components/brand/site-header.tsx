/**
 * FF SITE HEADER — single source of truth for top navigation.
 *
 * Used on the homepage AND inside every modal. Pixel-identical chrome.
 *
 * LOCKED behavior (DESKTOP — unchanged):
 *  - Scroll-triggered background (transparent → cream-light on scroll)
 *  - Sticky position, h-24 (96px)
 *  - Logo (FF) on left + ← Home indicator (visible only when not on homepage)
 *  - Nav items: Services · Programs · Selected work · About · Principles
 *  - LinkedIn icon + Book a call CTA on right
 *
 * MOBILE adaptation (< lg):
 *  - h-20 (80px) instead of h-24 — more vertical real estate for content
 *  - Logo on left, hamburger on right (LinkedIn + nav + CTA all collapsed
 *    into the drawer — keeps the bar clean at narrow widths)
 *  - Drawer = full-width cream sheet, slides down from header
 *  - Body scroll lock while drawer is open
 *
 * Cross-navigation:
 *  - Click logo or ← Home → goHome() (closes any modal, scrolls to top)
 *  - Click anchor nav (Services/Deliverables/etc.) → closes modal if open, scrolls to anchor
 *  - Click Principles → opens Principles modal (closes any other modal first)
 */

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useNav } from '@/lib/nav-context'
import { trackEvent } from '@/lib/track'

const NAV_ITEMS: Array<{ label: string; anchor: string }> = [
  { label: 'Services',      anchor: 'services' },
  { label: 'Programs',      anchor: 'programs' },
  { label: 'Selected work', anchor: 'selected-work' },
]

const CALENDLY_URL =
  'https://calendly.com/admin-fundamentalfrontiers/30min?hide_event_type_details=1&hide_gdpr_banner=1'

const LINKEDIN_URL = 'https://www.linkedin.com/company/fundamental-frontiers/'

export function SiteHeader() {
  const { openModal, setOpenModal, goHome } = useNav()
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [menuOpen])

  // Close drawer on Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Header bg is always solid (was previously conditional based on
  // scroll/modal state). Always-solid keeps the visual identical between
  // Home top and any modal — no flicker when switching between them.
  // inModal drives the visibility of the ← Home button beside the logo.
  const inModal = openModal !== null

  const handleLogo = () => {
    setMenuOpen(false)
    goHome()
  }

  const handleAnchor = (anchor: string) => {
    setMenuOpen(false)
    goHome(anchor)
  }

  const handleOpenModal = (key: 'about' | 'principles') => {
    trackEvent(`${key}_modal_open`, { source: 'header_mobile' })
    setMenuOpen(false)
    setOpenModal(key)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-ff-cream/95 backdrop-blur-sm border-b border-ff-ink/5"
      style={{ paddingRight: 'var(--scrollbar-gutter, 0px)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 h-20 lg:h-24 flex items-center justify-between">

        {/* ─── LEFT: LOGO + (conditionally) HOME ─── */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Logo cluster: FF logomark + stacked wordmark.
              Mirrors the company profile cover treatment one-to-one — big
              FF, "FUNDAMENTAL FRONTIERS" line, "CONSULTING" line. */}
          <button
            onClick={handleLogo}
            aria-label="Fundamental Frontiers Consulting — home"
            className="flex items-stretch gap-2.5 lg:gap-3.5"
          >
            <span className="text-3xl lg:text-[2.5rem] font-display font-medium text-ff-wine tracking-tight leading-none">
              FF
            </span>
            <span className="flex flex-col justify-between text-left pt-[4px] pb-[4px] lg:pt-[8px] lg:pb-[5px]">
              <span className="text-[10px] lg:text-[12px] font-semibold tracking-[0.25em] lg:tracking-[0.3em] text-ff-ink font-display whitespace-nowrap leading-none">
                FUNDAMENTAL FRONTIERS
              </span>
              <span className="text-[9px] lg:text-[11px] font-semibold tracking-[0.25em] lg:tracking-[0.3em] text-ff-ink-muted font-display whitespace-nowrap leading-none">
                CONSULTING
              </span>
            </span>
          </button>

          {/* ← Home appears only when inside a modal. Reserves space (opacity-0
              + pointer-events-none) on home so the FF cluster never shifts x.
              NO transition on opacity so the visibility flips instantly between
              states — a fading transition was the source of the nav flicker
              when switching Home → About. Same colour as ink-muted, hover wine. */}
          <button
            onClick={() => goHome()}
            aria-label="Return to homepage"
            className={`group inline-flex items-center gap-2 text-sm text-ff-ink-muted hover:text-ff-wine ${
              inModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>

        {/* ─── CENTER: NAV ITEMS (desktop only) ─── */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.anchor}
              onClick={() => handleAnchor(item.anchor)}
              className="text-sm font-medium text-ff-ink hover:text-ff-wine transition-colors"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => {
              trackEvent('about_modal_open', { source: 'header_desktop' })
              setOpenModal('about')
            }}
            className="text-sm font-medium text-ff-ink hover:text-ff-wine transition-colors"
          >
            About
          </button>

          <button
            onClick={() => {
              trackEvent('principles_modal_open', { source: 'header_desktop' })
              setOpenModal('principles')
            }}
            className="text-sm font-medium text-ff-ink hover:text-ff-wine transition-colors"
          >
            Principles
          </button>
        </nav>

        {/* ─── RIGHT: LINKEDIN + CTA (desktop) | HAMBURGER (mobile) ─── */}
        <div className="flex items-center gap-4">
          {/* Desktop right-side cluster */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onClick={() => trackEvent('linkedin_click', { source: 'header_desktop' })}
              className="w-10 h-10 rounded-full bg-ff-wine text-ff-white flex items-center justify-center text-xs font-semibold hover:bg-ff-wine-dark transition-colors"
            >
              in
            </Link>

            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('book_call_click', { source: 'header_desktop' })}
              className="inline-flex items-center px-6 py-3 bg-ff-wine text-ff-white text-sm font-semibold tracking-wide hover:bg-ff-wine-dark transition-colors"
            >
              Book a call
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="lg:hidden w-11 h-11 -mr-2 flex items-center justify-center text-ff-ink"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ─── MOBILE DRAWER ─── */}
      {/* Slides down beneath the header bar. Full-width cream sheet.
          Closes instantly when any nav action is taken. */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-t border-ff-ink/5 bg-ff-cream/98 backdrop-blur-sm ${
          menuOpen ? 'max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-8 flex flex-col">
          {/* Anchor links */}
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.anchor}
                onClick={() => handleAnchor(item.anchor)}
                className="py-4 text-left text-2xl font-light text-ff-ink hover:text-ff-wine transition-colors border-b border-ff-ink/10"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleOpenModal('about')}
              className="py-4 text-left text-2xl font-light text-ff-ink hover:text-ff-wine transition-colors border-b border-ff-ink/10"
            >
              About
            </button>
            <button
              onClick={() => handleOpenModal('principles')}
              className="py-4 text-left text-2xl font-light text-ff-ink hover:text-ff-wine transition-colors border-b border-ff-ink/10"
            >
              Principles
            </button>
          </nav>

          {/* CTA + LinkedIn — pushed below the nav stack */}
          <div className="mt-8 flex flex-col gap-4">
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('book_call_click', { source: 'header_mobile' })
                setMenuOpen(false)
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ff-wine text-ff-white text-sm font-semibold tracking-wide hover:bg-ff-wine-dark transition-colors"
            >
              Book a call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('linkedin_click', { source: 'header_mobile' })
                setMenuOpen(false)
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-ff-ink-muted hover:text-ff-wine transition-colors"
            >
              <span className="w-7 h-7 rounded-full bg-ff-wine text-ff-white flex items-center justify-center text-xs font-semibold">in</span>
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
