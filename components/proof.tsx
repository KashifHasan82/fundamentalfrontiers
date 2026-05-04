'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Quote } from 'lucide-react'

const caseStudies = [
  {
    id: 'automotive-tier1',
    industry: 'Automotive',
    title: 'IATF 16949 Certification Recovery',
    challenge: 'Tier 1 supplier facing certification withdrawal after failed surveillance audit with 12 major nonconformances.',
    approach: 'Rapid gap assessment, corrective action development, and management system restructuring over 75 days.',
    outcome: 'Full certification restored. Zero findings on re-certification audit. System sustained through two subsequent surveillance audits.',
    metrics: [
      { label: 'Timeline', value: '75 days' },
      { label: 'NCs Closed', value: '12 major' },
      { label: 'Result', value: 'Certification restored' },
    ],
  },
  {
    id: 'aerospace-as9100',
    industry: 'Aerospace',
    title: 'AS 9100 First-Time Certification',
    challenge: 'Mid-size aerospace machine shop with no formal QMS seeking AS 9100 certification to win defense contracts.',
    approach: 'Full management system design, documentation, training, and audit preparation over 120-day engagement.',
    outcome: 'Achieved AS 9100D certification on first attempt with only 2 minor observations. Won $4.2M defense subcontract within 90 days.',
    metrics: [
      { label: 'Timeline', value: '120 days' },
      { label: 'Audit Result', value: '2 minor OFIs' },
      { label: 'Contract Won', value: '$4.2M' },
    ],
  },
  {
    id: 'medical-fda',
    industry: 'Medical Devices',
    title: 'FDA 483 Response & Remediation',
    challenge: 'Class II device manufacturer received FDA Form 483 with 8 observations during routine inspection.',
    approach: 'Immediate response development, root cause analysis, and CAPA implementation with effectiveness verification.',
    outcome: 'All observations addressed in 60 days. Follow-up inspection closed with no repeat findings. Production uninterrupted.',
    metrics: [
      { label: 'Timeline', value: '60 days' },
      { label: 'Observations', value: '8 resolved' },
      { label: 'Production', value: 'No shutdown' },
    ],
  },
  {
    id: 'manufacturing-lean',
    industry: 'Process Manufacturing',
    title: 'Kaizen Blitz - Production Line',
    challenge: 'Chemical processing line with 23% scrap rate and frequent unplanned downtime impacting customer delivery.',
    approach: 'Five-day Kaizen event with cross-functional team. Value stream mapping, waste elimination, and SPC implementation.',
    outcome: 'Scrap reduced to 8% within 30 days. OEE improved from 62% to 78%. Sustained gains verified at 90-day review.',
    metrics: [
      { label: 'Scrap Reduction', value: '23% to 8%' },
      { label: 'OEE Gain', value: '+16%' },
      { label: 'Sustained', value: '90+ days' },
    ],
  },
]

export function Proof() {
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
    const cards = Array.from(track.querySelectorAll('.case-card'))

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

  const scrollToCard = (index: number) => {
    if (!trackRef.current) return
    const cards = Array.from(trackRef.current.querySelectorAll('.case-card'))
    if (cards[index]) {
      const firstCard = cards[0] as HTMLElement
      const targetCard = cards[index] as HTMLElement
      const targetLeft = targetCard.offsetLeft - firstCard.offsetLeft
      trackRef.current.scrollTo({ left: targetLeft, behavior: 'smooth' })
    }
  }

  const handleMobileCueClick = () => {
    if (!isMobile) return
    const maxIndex = caseStudies.length - 1
    const nextIndex = activeIndex >= maxIndex ? Math.max(0, activeIndex - 1) : Math.min(maxIndex, activeIndex + 1)
    scrollToCard(nextIndex)
  }

  return (
    <section id="proof" className="section-padding bg-ff-gray-900">
      <div className="container-ff px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-ff-burgundy-light font-medium text-sm tracking-wide uppercase mb-3">
            Selected Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
            Results that speak for themselves.
          </h2>
          <p className="text-lg text-ff-gray-400 max-w-2xl mx-auto">
            Anonymized case studies demonstrating our approach and outcomes across industries.
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          <div
            ref={trackRef}
            className={`
              flex gap-6
              ${isMobile ? 'overflow-x-auto scroll-hidden snap-x snap-mandatory pb-4 -mx-4 px-4' : 'flex-wrap justify-center'}
            `}
          >
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`
                  case-card flex-shrink-0 bg-ff-gray-800 rounded-xl overflow-hidden
                  ${isMobile ? 'w-[85vw] max-w-[340px] snap-center' : 'w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(50%-0.75rem)] max-w-[600px]'}
                  ${isMobile && activeIndex !== index ? 'opacity-60 scale-95' : 'opacity-100 scale-100'}
                  transition-all duration-300
                `}
              >
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-ff-gray-700">
                  <span className="text-ff-burgundy-light text-sm font-medium">
                    {study.industry}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-1">
                    {study.title}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-ff-gray-500 uppercase tracking-wider mb-1">
                      Challenge
                    </p>
                    <p className="text-sm text-ff-gray-300">
                      {study.challenge}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-ff-gray-500 uppercase tracking-wider mb-1">
                      Approach
                    </p>
                    <p className="text-sm text-ff-gray-300">
                      {study.approach}
                    </p>
                  </div>

                  <div className="bg-ff-burgundy/20 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <Quote className="w-4 h-4 text-ff-burgundy-light flex-shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-ff-burgundy-light uppercase tracking-wider">
                        Outcome
                      </p>
                    </div>
                    <p className="text-sm text-white">
                      {study.outcome}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <p className="text-lg font-bold text-white">{metric.value}</p>
                        <p className="text-xs text-ff-gray-500">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Cue */}
          {isMobile && (
            <button
              onClick={handleMobileCueClick}
              className={`
                absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-ff-burgundy rounded-full 
                flex items-center justify-center shadow-lg proof-cue
                ${activeIndex >= caseStudies.length - 1 ? 'is-left' : ''}
              `}
              aria-label={activeIndex >= caseStudies.length - 1 ? 'Previous case study' : 'Next case study'}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
