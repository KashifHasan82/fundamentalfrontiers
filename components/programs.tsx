'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Cog, 
  Car, 
  Zap, 
  Link2, 
  Plane, 
  HeartPulse, 
  Factory, 
  Building,
  ChevronRight
} from 'lucide-react'

const industries = [
  {
    id: 'engineering',
    icon: Cog,
    title: 'Engineering',
    description: 'Complex systems integration, design controls, and technical documentation for engineering organizations.',
    frameworks: ['ISO 9001', 'Design FMEA', 'Configuration Management'],
  },
  {
    id: 'automotive',
    icon: Car,
    title: 'Automotive',
    description: 'IATF 16949 compliance, APQP/PPAP implementation, and supply chain quality management.',
    frameworks: ['IATF 16949', 'APQP', 'PPAP', 'Core Tools'],
  },
  {
    id: 'power',
    icon: Zap,
    title: 'Power & Utilities',
    description: 'Asset management, reliability programs, and regulatory compliance for energy infrastructure.',
    frameworks: ['ISO 55001', 'Reliability-Centered Maintenance'],
  },
  {
    id: 'supply-chain',
    icon: Link2,
    title: 'Supply Chain',
    description: 'Supplier qualification, vendor management, and supply chain risk mitigation strategies.',
    frameworks: ['ISO 9001', 'Supplier Auditing', 'Risk Management'],
  },
  {
    id: 'aerospace',
    icon: Plane,
    title: 'Aerospace & Defense',
    description: 'AS 9100 certification, special processes, and defense contract compliance.',
    frameworks: ['AS 9100', 'Nadcap', 'ITAR/EAR'],
  },
  {
    id: 'medical',
    icon: HeartPulse,
    title: 'Medical Devices',
    description: 'ISO 13485 compliance, design controls, and FDA quality system requirements.',
    frameworks: ['ISO 13485', 'FDA 21 CFR Part 820', 'MDR'],
  },
  {
    id: 'process',
    icon: Factory,
    title: 'Process Manufacturing',
    description: 'Process validation, statistical process control, and batch record management.',
    frameworks: ['ISO 9001', 'Process FMEA', 'SPC'],
  },
  {
    id: 'hospitality',
    icon: Building,
    title: 'Hospitality & Services',
    description: 'Service quality standards, operational consistency, and customer experience management.',
    frameworks: ['ISO 9001', 'Service Excellence', 'Lean Service'],
  },
]

export function Programs() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 680)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile || !trackRef.current) return

    const track = trackRef.current
    const cards = Array.from(track.querySelectorAll('.program-card'))

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

      setMobileActiveIndex(closestIndex)
    }

    track.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => track.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  const selectedIndustry = industries.find(i => i.id === activeIndustry)

  return (
    <section id="programs" className="section-padding bg-white">
      <div className="container-ff px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-ff-burgundy font-medium text-sm tracking-wide uppercase mb-3">
            Industries
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ff-gray-900 mb-4 text-balance">
            Deep expertise across regulated industries.
          </h2>
          <p className="text-lg text-ff-gray-600 max-w-2xl mx-auto">
            We speak your language—whether {"it's"} automotive APQP, aerospace AS 9100, 
            or medical device design controls.
          </p>
        </div>

        {/* Desktop: Grid with Accordion Detail */}
        {!isMobile && (
          <div className="space-y-6">
            {/* Industry Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.map((industry) => {
                const Icon = industry.icon
                const isActive = activeIndustry === industry.id
                return (
                  <button
                    key={industry.id}
                    onClick={() => setActiveIndustry(isActive ? null : industry.id)}
                    className={`
                      program-card p-5 rounded-xl border text-left transition-all duration-300
                      ${isActive 
                        ? 'bg-ff-burgundy border-ff-burgundy text-white shadow-lg' 
                        : 'bg-white border-ff-gray-200 hover:border-ff-burgundy/30 hover:shadow-md'
                      }
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center mb-3
                      ${isActive ? 'bg-white/20' : 'bg-ff-burgundy/10'}
                    `}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-ff-burgundy'}`} />
                    </div>
                    <h3 className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-ff-gray-900'}`}>
                      {industry.title}
                    </h3>
                    <ChevronRight className={`
                      w-4 h-4 mt-2 transition-transform
                      ${isActive ? 'text-white/80 rotate-90' : 'text-ff-gray-400'}
                    `} />
                  </button>
                )
              })}
            </div>

            {/* Detail Panel */}
            {selectedIndustry && (
              <div className="bg-ff-cream rounded-xl p-6 md:p-8 animate-in slide-in-from-top-2 duration-300">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold text-ff-gray-900 mb-3">
                    {selectedIndustry.title}
                  </h3>
                  <p className="text-ff-gray-600 mb-5">
                    {selectedIndustry.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedIndustry.frameworks.map((framework) => (
                      <span
                        key={framework}
                        className="px-3 py-1 bg-ff-burgundy/10 text-ff-burgundy text-sm font-medium rounded-full"
                      >
                        {framework}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile: Horizontal Scroll */}
        {isMobile && (
          <div
            ref={trackRef}
            className="flex overflow-x-auto scroll-hidden snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4"
          >
            {industries.map((industry, index) => {
              const Icon = industry.icon
              return (
                <div
                  key={industry.id}
                  className={`
                    program-card flex-shrink-0 w-[75vw] max-w-[300px] snap-center p-5 rounded-xl border bg-white
                    ${mobileActiveIndex === index 
                      ? 'border-ff-burgundy shadow-lg opacity-100' 
                      : 'border-ff-gray-200 opacity-60'
                    }
                    transition-all duration-300
                  `}
                >
                  <div className="w-10 h-10 bg-ff-burgundy/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-ff-burgundy" />
                  </div>
                  <h3 className="font-semibold text-ff-gray-900 mb-2">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-ff-gray-600 mb-4">
                    {industry.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {industry.frameworks.slice(0, 2).map((framework) => (
                      <span
                        key={framework}
                        className="px-2 py-0.5 bg-ff-burgundy/10 text-ff-burgundy text-xs font-medium rounded"
                      >
                        {framework}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
