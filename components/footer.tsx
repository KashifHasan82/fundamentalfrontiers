'use client'

import Link from 'next/link'

const exploreLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Programs', href: '#programs' },
  { label: 'Industries', href: '#industries' },
  { label: 'Selected work', href: '#proof' },
  { label: 'From LinkedIn', href: '#insights' },
  { label: 'Book a call', href: '#contact-book' },
]

const contactLinks = [
  { label: 'Send an enquiry', href: '#contact-book' },
  { label: 'contact@fundamentalfrontiers.com', href: 'mailto:contact@fundamentalfrontiers.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/fundamental-frontiers', external: true },
]

export function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.getElementById(href.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <footer 
      className="border-t"
      style={{ 
        background: 'var(--ff-surface-solid)',
        borderColor: 'var(--ff-line-strong)',
      }}
    >
      <div className="wrap py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <div 
                className="font-serif leading-[1.04] tracking-[-0.018em]"
                style={{ 
                  fontSize: 'clamp(1.34rem, 1.12rem + 0.68vw, 1.88rem)',
                  color: 'var(--ff-ink)',
                }}
              >
                Fundamental<br />Frontiers
              </div>
            </Link>
            <p 
              className="leading-relaxed max-w-[38ch]"
              style={{ 
                color: 'var(--ff-ink-soft)',
                fontSize: 'clamp(0.92rem, 0.88rem + 0.18vw, 1rem)',
              }}
            >
              Operational performance, readiness, and execution support for organizations that need clearer control, stronger evidence, and practical follow through.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 
              className="font-extrabold uppercase tracking-[0.14em] mb-4"
              style={{ 
                color: 'var(--ff-ink)',
                fontSize: '0.78rem',
              }}
            >
              Explore
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {exploreLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="hover:opacity-70 transition-opacity"
                  style={{ 
                    color: 'var(--ff-ink-soft)',
                    fontSize: 'clamp(0.92rem, 0.88rem + 0.18vw, 1rem)',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Links */}
          <div>
            <h4 
              className="font-extrabold uppercase tracking-[0.14em] mb-4"
              style={{ 
                color: 'var(--ff-ink)',
                fontSize: '0.78rem',
              }}
            >
              Contact
            </h4>
            <div className="grid gap-2.5">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => !link.external && handleLinkClick(e, link.href)}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="hover:opacity-70 transition-opacity"
                  style={{ 
                    color: 'var(--ff-ink-soft)',
                    fontSize: 'clamp(0.92rem, 0.88rem + 0.18vw, 1rem)',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div 
          className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-6 border-t"
          style={{ borderColor: 'var(--ff-line)' }}
        >
          {/* Social Icons */}
          <div className="flex items-center gap-2.5" aria-label="Social media links">
            <a
              href="https://www.linkedin.com/company/fundamental-frontiers"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full inline-flex items-center justify-center font-extrabold text-sm transition-colors"
              style={{ 
                background: 'var(--ff-wine)',
                color: 'white',
              }}
              aria-label="LinkedIn"
            >
              in
            </a>
            {['x', 'ig', 'yt'].map((icon) => (
              <span
                key={icon}
                className="w-9 h-9 rounded-full inline-flex items-center justify-center font-bold text-xs"
                style={{ 
                  background: 'var(--ff-line)',
                  color: 'var(--ff-ink-muted)',
                  opacity: 0.5,
                }}
                aria-hidden="true"
              >
                {icon}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p 
            className="text-xs"
            style={{ color: 'var(--ff-ink-muted)' }}
          >
            © Fundamental Frontiers
          </p>
        </div>
      </div>
    </footer>
  )
}
