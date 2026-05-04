/**
 * FF MODAL SHELL — wraps any modal content with locked chrome.
 *
 * Used by Principles, About (future), Services (future), etc.
 * Guarantees pixel-identical header + footer across every modal.
 *
 * LOCKED behavior:
 *  - Full-viewport overlay (top: 0, left: 0, right: 0, bottom: 0)
 *  - z-40 (sits below header at z-50 so header stays clickable)
 *  - Cream background (matches homepage)
 *  - Internal scroll (the modal content scrolls; the homepage behind doesn't)
 *  - Smooth fade-in entry
 *  - No close button, no X, no back button (per locked spec)
 *  - Header is rendered OUTSIDE the modal (in layout) — already covers the modal
 *
 * Children = whatever modal content you want to drop in.
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { type ReactNode, useLayoutEffect } from 'react'
import { useNav } from '@/lib/nav-context'

export function ModalShell({
  modalKey,
  children,
}: {
  modalKey: string
  children: ReactNode
}) {
  const { openModal } = useNav()
  const isOpen = openModal === modalKey

  // Body scroll lock + scrollbar compensation. Why this is needed:
  //
  //   Without lock, when modal opens:
  //     • Body still has its scrollbar (in html's reserved gutter)
  //     • Body content area = window - 15
  //     • Modal at fixed inset-0 ≈ visual viewport ≈ window - 15 (browser
  //       interpretation varies)
  //     • Modal has its OWN overflow-y-auto → scrollbar inside modal
  //     • Modal content area = (modal_width) - 15 = window - 30
  //     → mx-auto inside modal centres in window - 30
  //     → mx-auto inside body centres in window - 15
  //     → 7-8px horizontal shift on hero text/image vs header content
  //
  //   With lock:
  //     • Body locked (overflow:hidden) → body scrollbar gone
  //     • Add padding-right = scrollbar width → body content area still = window - 15
  //     • Visual viewport = window (no scrollbar to dodge)
  //     • Modal at fixed inset-0 = window
  //     • Modal scrollbar inside → modal content area = window - 15
  //     • Body and modal content areas now equal. mx-auto centres at same x.
  //     • Header (also fixed) needs same compensation → CSS variable.
  //
  // useLayoutEffect (vs useEffect) is critical: it runs synchronously after
  // DOM commit but BEFORE paint, so the lock+padding are in place by the time
  // the user sees the modal. With plain useEffect there's a one-frame window
  // where the modal is rendered but the body is still unlocked → visible flicker.
  useLayoutEffect(() => {
    if (!isOpen) return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth <= 0) return // mobile overlay scrollbars: nothing to do

    const html = document.documentElement
    const body = document.body
    const prevBodyOverflow = body.style.overflow
    const prevBodyPaddingRight = body.style.paddingRight
    const prevHtmlVar = html.style.getPropertyValue('--scrollbar-gutter')

    body.style.overflow = 'hidden'
    body.style.paddingRight = `${scrollbarWidth}px`
    html.style.setProperty('--scrollbar-gutter', `${scrollbarWidth}px`)

    return () => {
      body.style.overflow = prevBodyOverflow
      body.style.paddingRight = prevBodyPaddingRight
      if (prevHtmlVar) {
        html.style.setProperty('--scrollbar-gutter', prevHtmlVar)
      } else {
        html.style.removeProperty('--scrollbar-gutter')
      }
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-40 bg-ff-cream overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
