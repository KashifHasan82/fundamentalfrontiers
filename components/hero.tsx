'use client'

import { useState, useEffect, useCallback } from 'react'

const serviceJumps = [
  {
    id: 'readiness',
    label: 'Readiness & Governance',
    href: '#services',
  },
  {
    id: 'quality',
    label: 'Quality & Execution',
    href: '#services',
  },
  {
    id: 'visibility',
    label: 'Visibility & Reporting',
    href: '#services',
  },
]

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 680)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile || isPaused) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % serviceJumps.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [isMobile, isPaused])

  const handleServiceClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault()
    const target = document.getElementById(href.slice(1))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <section 
      id="top" 
      className="relative overflow-hidden"
      style={{
        paddingTop: 'clamp(16px, 2.1vw, 28px)',
        paddingBottom: 'clamp(10px, 1.8vw, 18px)',
        color: '#fff',
        background: `
          radial-gradient(980px 560px at -12% 12%, rgba(106, 146, 222, 0.26), transparent 46%),
          radial-gradient(520px 300px at 72% 50%, rgba(70, 112, 186, 0.10), transparent 42%),
          radial-gradient(720px 400px at 100% 100%, rgba(10, 40, 104, 0.16), transparent 48%),
          linear-gradient(90deg, #1a467f 0%, #10356d 44%, #07184e 100%)
        `,
      }}
    >
      {/* Decorative overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)),
            radial-gradient(780px 420px at 22% 88%, rgba(255,255,255,0.03), transparent 64%)
          `,
        }}
      />

      <div className="wrap-hero relative z-10">
        <div 
          className="grid gap-12 lg:gap-[clamp(94px,10vw,220px)] items-center"
          style={{ 
            gridTemplateColumns: 'minmax(0, 1fr)',
            minHeight: 'clamp(430px, 62vh, 540px)',
          }}
        >
          {/* Hero Copy */}
          <div className="grid gap-4 max-w-[680px]">
            {/* Eyebrow */}
            <p 
              className="font-extrabold tracking-[0.18em] uppercase"
              style={{ 
                fontSize: 'clamp(0.76rem, 0.74rem + 0.1vw, 0.84rem)',
                color: 'rgba(255,255,255,0.94)',
              }}
            >
              Consulting on Risk, Quality, and Operations
            </p>

            {/* Main Heading */}
            <h1 
              className="font-sans font-[785] leading-[1.06] tracking-[-0.028em] text-white"
              style={{ fontSize: 'clamp(1.86rem, 1.14rem + 1.26vw, 3.12rem)' }}
            >
              <span className="block whitespace-nowrap">Deliberate consulting.</span>
              <span className="block whitespace-nowrap">Measurable closure.</span>
              <span className="block whitespace-nowrap">Operational Challenges</span>
            </h1>

            {/* Subheading */}
            <p 
              className="max-w-[660px] leading-[1.58]"
              style={{ 
                color: 'rgba(255,255,255,0.92)',
                fontSize: 'clamp(1.08rem, 1.01rem + 0.28vw, 1.22rem)',
              }}
            >
              Senior-led engagements with named accountability. One consultant owns your file 
              from start to finish—no rotation, no subcontracting, no handoffs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-0.5">
              <a
                href="https://calendly.com/admin-fundamentalfrontiers/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero btn-hero-primary inline-flex items-center"
              >
                Book a readiness call
              </a>
              <a
                href="#contact-book"
                onClick={(e) => handleServiceClick(e, '#contact-book')}
                className="btn-hero btn-hero-secondary inline-flex items-center"
              >
                Send enquiry
              </a>
            </div>
          </div>

          {/* Service Jumps - Desktop Only */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[min(100%,392px)] pr-[var(--ff-gutter,28px)]">
            <div className="grid gap-[26px]">
              {serviceJumps.map((service, index) => (
                <a
                  key={service.id}
                  href={service.href}
                  onClick={(e) => handleServiceClick(e, service.href)}
                  onMouseEnter={() => {
                    setActiveIndex(index)
                    setIsPaused(true)
                  }}
                  onMouseLeave={() => setIsPaused(false)}
                  onFocus={() => {
                    setActiveIndex(index)
                    setIsPaused(true)
                  }}
                  onBlur={() => setIsPaused(false)}
                  className={`service-jump grid items-center gap-[22px] transition-opacity duration-[160ms] ${
                    activeIndex === index ? 'is-active' : ''
                  }`}
                  style={{ gridTemplateColumns: '3px 1fr' }}
                >
                  {/* Bar */}
                  <div 
                    className="w-[3px] h-[56px] rounded-full transition-all duration-[160ms]"
                    style={{
                      background: activeIndex === index
                        ? 'linear-gradient(180deg, rgba(130, 190, 255, 0.88), rgba(88, 145, 212, 0.48))'
                        : 'linear-gradient(180deg, rgba(123, 162, 219, 0.42), rgba(89, 116, 167, 0.22))',
                    }}
                  />
                  {/* Label */}
                  <strong 
                    className="font-extrabold uppercase tracking-[0.07em] leading-[0.9] max-w-[14.6ch] transition-colors duration-[160ms]"
                    style={{ 
                      fontSize: 'clamp(1.38rem, 1.12rem + 0.62vw, 1.92rem)',
                      color: activeIndex === index ? '#fff' : 'rgba(223,229,240,0.52)',
                    }}
                  >
                    {service.label}
                  </strong>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
