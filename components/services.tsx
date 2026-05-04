'use client'

import { useEffect, useRef, useState } from 'react'
import { Shield, Target, BarChart3 } from 'lucide-react'

const services = [
  {
    id: 'readiness',
    icon: Shield,
    title: 'Readiness & Governance',
    subtitle: 'Build the structure before the audit.',
    description: 'Establish management systems, policy frameworks, and governance structures that satisfy registrars and regulators—without bureaucratic bloat.',
    features: [
      'Management system design & documentation',
      'Policy and procedure development',
      'Audit preparation and mock assessments',
      'Governance framework alignment',
    ],
  },
  {
    id: 'quality',
    icon: Target,
    title: 'Quality & Execution',
    subtitle: 'Turn standards into operations.',
    description: 'Translate compliance requirements into practical workflows. We embed quality into daily operations so it sustains without constant oversight.',
    features: [
      'Process mapping and optimization',
      'Quality control implementation',
      'Training and competency programs',
      'Continuous improvement systems',
    ],
  },
  {
    id: 'visibility',
    icon: BarChart3,
    title: 'Visibility & Reporting',
    subtitle: 'See what matters, report what counts.',
    description: 'Implement dashboards, KPIs, and reporting mechanisms that give leadership real-time visibility into compliance status and operational performance.',
    features: [
      'KPI development and dashboards',
      'Management review systems',
      'Performance monitoring frameworks',
      'Executive reporting packages',
    ],
  },
]

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 680)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile || !trackRef.current) return

    const track = trackRef.current
    const cards = Array.from(track.querySelectorAll('.service-card'))

    const handleScroll = () => {
      const trackRect = track.getBoundingClientRect()
      const targetX = trackRect.left + trackRect.width * 0.42
      let closestIndex = 0
      let closestDelta = Infinity

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const center = rect.left + rect.width / 2
        const delta = Math.abs(center - targetX)
        if (delta < closestDelta) {
          closestDelta = delta
          closestIndex = index
        }
      })

      setActiveIndex(closestIndex)
    }

    track.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => track.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-ff px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-ff-burgundy font-medium text-sm tracking-wide uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ff-gray-900 mb-4 text-balance">
            Three practice areas. One integrated approach.
          </h2>
          <p className="text-lg text-ff-gray-600 max-w-2xl mx-auto">
            Each engagement draws on our expertise across governance, execution, and visibility 
            to deliver outcomes that stick.
          </p>
        </div>

        {/* Cards Container */}
        <div
          ref={trackRef}
          className={`
            flex gap-6
            ${isMobile ? 'overflow-x-auto scroll-hidden snap-x snap-mandatory pb-4 -mx-4 px-4' : 'flex-wrap justify-center'}
          `}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className={`
                  service-card flex-shrink-0 bg-white rounded-xl border border-ff-gray-200 p-6 md:p-8 card-hover
                  ${isMobile ? 'w-[85vw] max-w-[340px] snap-center' : 'w-full md:w-[calc(33.333%-1rem)] max-w-[400px]'}
                  ${isMobile && activeIndex !== index ? 'opacity-60 scale-95' : 'opacity-100 scale-100'}
                  transition-all duration-300
                `}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-ff-burgundy/10 rounded-lg flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-ff-burgundy" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-ff-gray-900 mb-2">
                  {service.title}
                </h3>

                {/* Subtitle */}
                <p className="text-ff-burgundy font-medium text-sm mb-4">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-ff-gray-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-ff-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-ff-burgundy mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
