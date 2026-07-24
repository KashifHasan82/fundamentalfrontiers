/**
 * FF — Navigation context
 *
 * Single source of truth for modal state across the entire site.
 * Lets any component (header inside a modal, Principles trigger, etc.)
 * open or close any modal cleanly.
 *
 * Modals registered here:
 *   - 'principles' — the Principles modal
 *   - (future: 'about', 'services', 'deliverables', etc.)
 *
 * Behavior locked:
 *   - Only one modal open at a time
 *   - Body scroll locked when any modal is open
 *   - Closing a modal restores scroll to where the user was
 */

'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type ModalKey = 'principles' | 'about' | 'services' | 'deliverables' | 'programs' | 'proof' | null

type NavContextValue = {
  openModal: ModalKey
  setOpenModal: (k: ModalKey) => void
  closeModal: () => void
  // Goes home (closes modal if open, scrolls to top or anchor)
  goHome: (anchor?: string) => void
}

const NavContext = createContext<NavContextValue | null>(null)

export function NavProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [openModal, setOpenModalState] = useState<ModalKey>(null)
  const [savedScroll, setSavedScroll] = useState(0)

  // Lock body scroll when any modal is open. Restore on close.
  useEffect(() => {
    if (openModal) {
      const y = window.scrollY
      setSavedScroll(y)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [openModal])

  const setOpenModal = (k: ModalKey) => setOpenModalState(k)

  const closeModal = () => {
    setOpenModalState(null)
    // Restore scroll position after a tick so DOM updates first
    setTimeout(() => window.scrollTo({ top: savedScroll, behavior: 'instant' as ScrollBehavior }), 0)
  }

  const goHome = (anchor?: string) => {
    setOpenModalState(null)

    if (pathname !== '/') {
      router.push(anchor ? `/#${anchor}` : '/')
      return
    }

    setTimeout(() => {
      if (anchor) {
        const el = document.getElementById(anchor)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  return (
    <NavContext.Provider value={{ openModal, setOpenModal, closeModal, goHome }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) {
    throw new Error('useNav must be used inside <NavProvider>')
  }
  return ctx
}
