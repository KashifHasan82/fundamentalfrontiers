'use client'

import { useEffect, useRef, useState } from 'react'
import { FileCheck, Zap, Search } from 'lucide-react'

const deliverables = [
  {
    id: 'risk-compliance',
    icon: FileCheck,
    title: 'Risk & Compliance',
    duration: '60–90 days',
    description: 'Comprehensive risk assessments, compliance gap analyses, and remediation roadmaps that prepare your organization for certification audits.',
    outputs: [
      'Risk register with severity rankings',
      'Compliance gap analysis report',
      'Remediation action plan',
      'Audit-ready documentation package',
    ],
  },
  {
    id: 'kaizen-blitz',
    icon: Zap,
    title: 'Kaizen Blitz',
    duration: '90–120 days',
    description: 'Rapid improvement events that target specific operational bottlenecks and deliver measurable gains within a focused timeframe.',
    outputs: [
      'Current-state process maps',
      'Waste identification analysis',
      'Future-state design',
      'Implementation playbook',
    ],
  },
  {
    id: 'root-cause',
    icon: Search,
    title: 'Root Cause & CAPA',
    duration: '30–60 days',
    description: 'Systematic investigation of quality escapes and non-conformances, with corrective and preventive actions that address systemic issues.',
    outputs: [
      'Root cause analysis report',
      'Fishbone and 5-Why documentation',
      'CAPA implementation plan',
      'Effectiveness verification protocol',
    ],
  },
]

export function Deliverables() {
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
    const cards = Array.from(track.querySelectorAll('.deliverable-card'))

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
    <section id="deliverables" className="section-padding bg-ff-cream">
      <div className="container-ff px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-ff-burgundy font-medium text-sm tracking-wide uppercase mb-3">
            Engagement Types
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ff-gray-900 mb-4 text-balance">
            Defined scope. Clear deliverables.
          </h2>
          <p className="text-lg text-ff-gray-600 max-w-2xl mx-auto">
            Every engagement has a start date, an end date, and documented success criteria. 
            No open-ended retainers or scope creep.
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
          {deliverables.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className={`
                  deliverable-card flex-shrink-0 bg-white rounded-xl border border-ff-gray-200 overflow-hidden card-hover
                  ${isMobile ? 'w-[85vw] max-w-[340px] snap-center' : 'w-full md:w-[calc(33.333%-1rem)] max-w-[400px]'}
                  ${isMobile && activeIndex !== index ? 'opacity-60 scale-95' : 'opacity-100 scale-100'}
                  transition-all duration-300
                `}
              >
                {/* Header */}
                <div className="bg-ff-burgundy p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white/80 text-sm font-medium">
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-ff-gray-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="border-t border-ff-gray-200 pt-5">
                    <p className="text-xs font-semibold text-ff-gray-500 uppercase tracking-wider mb-3">
                      Deliverables
                    </p>
                    <ul className="space-y-2">
                      {item.outputs.map((output, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-ff-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-ff-burgundy mt-2 flex-shrink-0" />
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
