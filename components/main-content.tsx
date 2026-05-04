"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { CheckCircle, Target, BarChart3, FileCheck, Zap, Search, Building2, Car, Zap as Power, Package, Plane, Heart, Factory, Hotel, ChevronRight, ExternalLink } from "lucide-react"

// Brand colors
const colors = {
  bg: '#f6f1ed',
  bgSoft: '#fbf8f6',
  surface: 'rgba(255, 255, 255, 0.74)',
  surfaceStrong: 'rgba(255, 255, 255, 0.9)',
  surfaceSolid: '#ffffff',
  ink: '#171b24',
  inkSoft: '#4c5668',
  inkMuted: '#6c7585',
  line: 'rgba(19, 27, 41, 0.12)',
  lineStrong: 'rgba(19, 27, 41, 0.18)',
  wine: '#7a1f2b',
  wineStrong: '#611823',
  wineSoft: 'rgba(122, 31, 43, 0.12)',
  wineSoft2: 'rgba(122, 31, 43, 0.18)',
}

// Card component with glass effect
function GlassCard({ children, className = "", hover = false, style = {} }: { children: ReactNode; className?: string; hover?: boolean; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        padding: '24px',
        borderRadius: '22px',
        border: `1px solid ${colors.line}`,
        background: colors.surface,
        boxShadow: '0 20px 52px rgba(17, 24, 39, 0.11)',
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
        ...style,
      }}
    >
      {/* Decorative gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(420px 180px at 0% 0%, ${colors.wineSoft}, transparent 64%),
            radial-gradient(380px 220px at 100% 20%, rgba(17, 24, 39, 0.07), transparent 64%)
          `,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}

// Chip/badge component
function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 12px',
        minHeight: '34px',
        borderRadius: '999px',
        fontSize: '0.78rem',
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        fontWeight: 850,
        color: colors.wine,
        background: colors.wineSoft,
        border: `1px solid ${colors.wineSoft2}`,
      }}
    >
      {children}
    </span>
  )
}

// Kicker (section label)
function Kicker({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.82rem',
        fontWeight: 800,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: colors.wine,
      }}
    >
      <span style={{ width: '22px', height: '1px', background: colors.wine, opacity: 0.6 }} />
      {children}
    </p>
  )
}

// Primary button
function PrimaryButton({ children, href, onClick, type = "button", className = "" }: { children: ReactNode; href?: string; onClick?: () => void; type?: "button" | "submit"; className?: string }) {
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    minHeight: '42px',
    padding: '12px 18px',
    borderRadius: '999px',
    border: 'none',
    fontSize: '0.96rem',
    fontWeight: 800,
    letterSpacing: '0.02em',
    cursor: 'pointer',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    color: '#fff',
    background: `linear-gradient(135deg, ${colors.wine}, ${colors.wineStrong})`,
    boxShadow: '0 18px 38px rgba(122, 31, 43, 0.24)',
  }

  if (href) {
    return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} style={style} className={className}>{children}</a>
  }
  return <button type={type} onClick={onClick} style={style} className={className}>{children}</button>
}

// Text link button
function TextButton({ children, href, onClick }: { children: ReactNode; href?: string; onClick?: (e: React.MouseEvent) => void }) {
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: colors.wine,
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    fontSize: '0.78rem',
    fontWeight: 800,
    textDecoration: 'none',
  }

  if (href) {
    return <a href={href} onClick={onClick} style={style}>{children}</a>
  }
  return <button onClick={onClick} style={style}>{children}</button>
}

// ===== ACCORDION CONTEXT =====
type AccordionContextType = {
  openSection: string | null
  setOpenSection: (id: string | null) => void
}

const AccordionContext = createContext<AccordionContextType>({
  openSection: null,
  setOpenSection: () => {},
})

function AccordionProvider({ children, defaultOpen = null }: { children: ReactNode; defaultOpen?: string | null }) {
  const [openSection, setOpenSection] = useState<string | null>(defaultOpen)
  return (
    <AccordionContext.Provider value={{ openSection, setOpenSection }}>
      {children}
    </AccordionContext.Provider>
  )
}

// ===== ACCORDION SECTION =====
function AccordionSection({
  id,
  title,
  teaser,
  children,
  defaultExpanded = false,
}: {
  id: string
  title: string
  teaser: string
  children: ReactNode
  defaultExpanded?: boolean
}) {
  const { openSection, setOpenSection } = useContext(AccordionContext)
  const isOpen = defaultExpanded || openSection === id

  const handleToggle = () => {
    if (defaultExpanded) return
    setOpenSection(isOpen ? null : id)
  }

  return (
    <div
      id={id}
      style={{
        borderBottom: `1px solid ${colors.lineStrong}`,
      }}
    >
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          padding: '28px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'opacity 0.15s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {!defaultExpanded && (
            <span
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: isOpen ? colors.wine : colors.wineSoft,
                border: `1px solid ${isOpen ? colors.wine : colors.wineSoft2}`,
                color: isOpen ? 'white' : colors.wine,
                fontSize: '1.5rem',
                fontWeight: 300,
                lineHeight: 1,
                transition: 'all 0.25s ease',
                transform: isOpen ? 'rotate(45deg)' : 'none',
              }}
            >
              +
            </span>
          )}
          <div>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(1.65rem, 1.22rem + 1.42vw, 2.48rem)',
                lineHeight: 1.12,
                color: colors.ink,
                letterSpacing: '-0.018em',
                margin: 0,
              }}
            >
              {title}
            </h2>
            {teaser && !isOpen && (
              <p
                style={{
                  fontSize: '1rem',
                  color: colors.inkMuted,
                  maxWidth: '48ch',
                  margin: '4px 0 0',
                }}
              >
                {teaser}
              </p>
            )}
          </div>
        </div>
      </button>
      {isOpen && (
        <div id={`${id}-content`} style={{ paddingBottom: '48px' }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ===== DOSSIER VIEW (Second Tier) =====
function DossierView({ items }: { items: { id: string; label: string; content: ReactNode }[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = items[activeIndex]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(200px, 260px) 1fr',
        gap: '40px',
        padding: '32px 0 24px',
      }}
      className="dossier-grid"
    >
      {/* Sidebar / Pills */}
      <div className="dossier-sidebar">
        <nav
          role="tablist"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            background: colors.surfaceStrong,
            border: `1px solid ${colors.line}`,
            borderRadius: '14px',
            padding: '8px',
            boxShadow: '0 10px 24px rgba(17, 24, 39, 0.08)',
            position: 'sticky',
            top: '100px',
          }}
          className="dossier-nav"
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              style={{
                padding: '14px 18px',
                borderRadius: '10px',
                fontSize: '0.92rem',
                fontWeight: 700,
                color: index === activeIndex ? 'white' : colors.inkSoft,
                background: index === activeIndex ? colors.wine : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                boxShadow: index === activeIndex ? '0 4px 12px rgba(122, 31, 43, 0.3)' : 'none',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Panel */}
      <div key={activeItem.id} style={{ animation: 'fadeSlideIn 0.3s ease' }}>
        {activeItem.content}
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .dossier-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .dossier-sidebar {
            position: static !important;
          }
          .dossier-nav {
            flex-direction: row !important;
            overflow-x: auto !important;
            gap: 8px !important;
            padding: 6px !important;
            border-radius: 999px !important;
          }
          .dossier-nav button {
            flex-shrink: 0 !important;
            padding: 10px 16px !important;
            border-radius: 999px !important;
            font-size: 0.84rem !important;
          }
        }
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

// ===== SERVICES CONTENT =====
const servicesItems = [
  {
    id: "readiness",
    label: "Readiness & Governance",
    content: (
      <GlassCard style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: colors.wineSoft,
              border: `1px solid ${colors.wineSoft2}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <CheckCircle style={{ width: '28px', height: '28px', color: colors.wine }} />
          </div>
          <div style={{ flex: 1 }}>
            <Chip>01</Chip>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.ink, margin: '12px 0', fontFamily: 'Georgia, serif' }}>
              Readiness & Governance
            </h3>
            <p style={{ color: colors.inkSoft, lineHeight: 1.6, marginBottom: '24px' }}>
              Prepare your organisation for audits, certifications, and operational shifts. We build governance structures that withstand scrutiny and enable confident decision-making.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
              {["Gap analysis & audit preparation", "Policy framework development", "Management system implementation", "Certification readiness reviews"].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: colors.inkSoft }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.wine, marginTop: '8px', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>
    ),
  },
  {
    id: "quality",
    label: "Quality & Execution",
    content: (
      <GlassCard style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: colors.wineSoft,
              border: `1px solid ${colors.wineSoft2}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Target style={{ width: '28px', height: '28px', color: colors.wine }} />
          </div>
          <div style={{ flex: 1 }}>
            <Chip>02</Chip>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.ink, margin: '12px 0', fontFamily: 'Georgia, serif' }}>
              Quality & Execution
            </h3>
            <p style={{ color: colors.inkSoft, lineHeight: 1.6, marginBottom: '24px' }}>
              Drive measurable improvement through disciplined process optimisation. We embed quality thinking into daily operations, not just documentation.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
              {["Process mapping & optimisation", "Quality control system design", "Supplier quality management", "Statistical process control"].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: colors.inkSoft }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.wine, marginTop: '8px', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>
    ),
  },
  {
    id: "visibility",
    label: "Visibility & Reporting",
    content: (
      <GlassCard style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: colors.wineSoft,
              border: `1px solid ${colors.wineSoft2}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <BarChart3 style={{ width: '28px', height: '28px', color: colors.wine }} />
          </div>
          <div style={{ flex: 1 }}>
            <Chip>03</Chip>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.ink, margin: '12px 0', fontFamily: 'Georgia, serif' }}>
              Visibility & Reporting
            </h3>
            <p style={{ color: colors.inkSoft, lineHeight: 1.6, marginBottom: '24px' }}>
              Transform data into actionable intelligence. We design reporting systems that surface the metrics that matter and enable proactive management.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
              {["Power BI dashboards", "Supplier scorecards", "Balanced scorecard", "Executive summary reporting"].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: colors.inkSoft }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.wine, marginTop: '8px', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>
    ),
  },
]

// ===== PROGRAMS CONTENT =====
function ProgramCard({ icon, title, duration, description, deliverables, outputs }: { icon: ReactNode; title: string; duration: string; description: string; deliverables: string[]; outputs: string[] }) {
  return (
    <GlassCard style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: colors.wineSoft,
            border: `1px solid ${colors.wineSoft2}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.wine,
          }}
        >
          {icon}
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.ink, margin: 0, fontFamily: 'Georgia, serif' }}>{title}</h3>
          <p style={{ fontSize: '0.875rem', color: colors.wine, fontWeight: 700, letterSpacing: '0.05em', margin: '4px 0 0' }}>{duration}</p>
        </div>
      </div>
      <p style={{ color: colors.inkSoft, lineHeight: 1.6, marginBottom: '24px' }}>{description}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: colors.bgSoft, borderRadius: '16px', padding: '20px', border: `1px solid ${colors.line}` }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.ink, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Deliverables</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: colors.inkSoft, display: 'grid', gap: '8px' }}>
            {deliverables.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div style={{ background: colors.bgSoft, borderRadius: '16px', padding: '20px', border: `1px solid ${colors.line}` }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.ink, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Outputs</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: colors.inkSoft, display: 'grid', gap: '8px' }}>
            {outputs.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </GlassCard>
  )
}

const programsItems = [
  {
    id: "risk-compliance",
    label: "Risk & Compliance",
    content: <ProgramCard icon={<FileCheck style={{ width: '24px', height: '24px' }} />} title="Risk & Compliance" duration="60–90 DAYS" description="Comprehensive assessment and remediation of compliance gaps. We identify exposure, prioritise risks, and implement controls that satisfy regulators and protect operations." deliverables={["Risk register with heat mapping", "Compliance gap analysis report", "Control implementation roadmap", "Audit-ready documentation"]} outputs={["Reduced regulatory exposure", "Clear accountability matrix", "Sustainable compliance posture", "Board-ready reporting"]} />,
  },
  {
    id: "kaizen-blitz",
    label: "Kaizen Blitz",
    content: <ProgramCard icon={<Zap style={{ width: '24px', height: '24px' }} />} title="Kaizen Blitz" duration="90–120 DAYS" description="Rapid, focused improvement events targeting specific operational bottlenecks. We mobilise cross-functional teams to achieve breakthrough results in compressed timeframes." deliverables={["Current state value stream map", "Future state design", "Implementation action plan", "Sustainability control plan"]} outputs={["20-40% cycle time reduction", "Waste elimination", "Team capability building", "Quick wins with lasting impact"]} />,
  },
  {
    id: "root-cause",
    label: "Root Cause & CAPA",
    content: <ProgramCard icon={<Search style={{ width: '24px', height: '24px' }} />} title="Root Cause & CAPA" duration="30–60 DAYS" description="Rigorous investigation and corrective action for critical failures. We go beyond symptoms to identify systemic issues and implement permanent fixes." deliverables={["8D investigation report", "Fishbone/5-Why analysis", "CAPA action tracker", "Effectiveness verification plan"]} outputs={["Problem recurrence prevention", "Regulatory-compliant docs", "Knowledge capture & transfer", "Systemic improvement"]} />,
  },
]

// ===== INDUSTRIES CONTENT =====
function IndustryContent({ icon, title, description, frameworks }: { icon: ReactNode; title: string; description: string; frameworks: string[] }) {
  return (
    <GlassCard style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: colors.wineSoft,
            border: `1px solid ${colors.wineSoft2}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.wine,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.ink, margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>{title}</h3>
          <p style={{ color: colors.inkSoft, lineHeight: 1.6, marginBottom: '20px' }}>{description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {frameworks.map((fw, i) => (
              <span key={i} style={{ padding: '6px 12px', background: colors.bgSoft, color: colors.inkSoft, fontSize: '0.875rem', borderRadius: '999px', border: `1px solid ${colors.line}` }}>
                {fw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

const industriesItems = [
  { id: "engineering", label: "Engineering", content: <IndustryContent icon={<Building2 style={{ width: '24px', height: '24px' }} />} title="Engineering" description="Manufacturing, industrial programs, and technical service operations under quality systems." frameworks={["ISO 9001", "ISO 14001", "Project Management"]} /> },
  { id: "automotive", label: "Automotive", content: <IndustryContent icon={<Car style={{ width: '24px', height: '24px' }} />} title="Automotive" description="Tiered supplier networks, production part approval, and quality system audits." frameworks={["IATF 16949", "VDA 6.3", "APQP/PPAP"]} /> },
  { id: "power-utilities", label: "Power & Utilities", content: <IndustryContent icon={<Power style={{ width: '24px', height: '24px' }} />} title="Power & Utilities" description="Generation, transmission, and distribution under strict safety and compliance regimes." frameworks={["ISO 55001", "ISO 14001", "ISO 45001"]} /> },
  { id: "supply-chain", label: "Supply Chain", content: <IndustryContent icon={<Package style={{ width: '24px', height: '24px' }} />} title="Supply Chain" description="Logistics visibility, supplier performance management, and end-to-end governance." frameworks={["ISO 9001", "ISO 28000", "Lean 6σ"]} /> },
  { id: "aerospace-defense", label: "Aerospace & Defense", content: <IndustryContent icon={<Plane style={{ width: '24px', height: '24px' }} />} title="Aerospace & Defense" description="AS 9100 environments with deep audit trail requirements and programme-level risk." frameworks={["AS 9100", "AS 9110", "Nadcap"]} /> },
  { id: "medical-devices", label: "Medical Devices", content: <IndustryContent icon={<Heart style={{ width: '24px', height: '24px' }} />} title="Medical Devices" description="Regulated change control, CAPA discipline, and clinical-grade documentation." frameworks={["ISO 13485", "FDA 21 CFR 820", "MDR/IVDR"]} /> },
  { id: "process-manufacturing", label: "Process Manufacturing", content: <IndustryContent icon={<Factory style={{ width: '24px', height: '24px' }} />} title="Process Manufacturing" description="Continuous and batch production with integrated quality, safety, and throughput programs." frameworks={["ISO 9001", "ISO 22000", "GMP"]} /> },
  { id: "hospitality-services", label: "Hospitality & Services", content: <IndustryContent icon={<Hotel style={{ width: '24px', height: '24px' }} />} title="Hospitality & Services" description="Service environments where repeatable SOP discipline directly drives guest and outcome quality." frameworks={["ISO 9001", "Service Excellence", "Lean"]} /> },
]

// ===== ACTUAL CASE STUDIES FROM ORIGINAL SITE =====
const caseStudies = [
  {
    id: "case-1",
    title: "5S workplace organisation improvement",
    description: "A structured 5S initiative was applied to improve workplace organisation, visual control, and day to day efficiency. This work helped create a cleaner, safer, and more disciplined workplace.",
    type: "Article",
  },
  {
    id: "case-2",
    title: "Improving efficiency, compliance, and risk control",
    description: "This work outlined a structured approach to managing contracts across creation, negotiation, execution, monitoring, and renewal to support better efficiency, compliance, and risk control.",
    type: "Article",
  },
  {
    id: "case-3",
    title: "CAPA tracking and closure improvement",
    description: "A structured CAPA tracking process was introduced to improve issue visibility, action ownership, and closure discipline, helping teams reduce repeat problems with stronger closure.",
    type: "Article",
  },
]

// ===== INSIGHTS FROM ORIGINAL SITE =====
const insightsArticles = [
  {
    category: "Lean and Six Sigma",
    title: "Ready to eliminate waste, improve quality, and drive measurable results?",
    excerpt: "A short teaser on streamlining processes, reducing cost and cycle time, improving quality and customer satisfaction, and building a culture of continuous improvement.",
    link: "https://www.linkedin.com/company/fundamental-frontiers",
  },
  {
    category: "Audit and controls",
    title: "If an audit never surprises you, it is probably not auditing the real risk.",
    excerpt: "A teaser on starting from loss, not clauses, and using operational pain points, sample discipline, and control logic to make audits create measurable impact.",
    link: "https://www.linkedin.com/company/fundamental-frontiers",
  },
  {
    category: "Supplier development",
    title: "Strong suppliers do not happen by chance. They are developed.",
    excerpt: "A concise preview on supplier capability alignment, measurable KPI design, and the governance discipline needed for stronger and more sustainable supplier performance.",
    link: "https://www.linkedin.com/company/fundamental-frontiers",
  },
]

// ===== CONTACT FORM =====
function ContactSection() {
  const [emailEntered, setEmailEntered] = useState(false)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      {/* Book a Call */}
      <GlassCard style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.ink, margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>Book a readiness call</h3>
        <p style={{ color: colors.inkSoft, lineHeight: 1.6, marginBottom: '24px' }}>
          Go straight to the calendar when the next step is already clear. A direct conversation can begin now.
        </p>
        <PrimaryButton href="https://calendly.com/admin-fundamentalfrontiers/30min?hide_event_type_details=1&hide_gdpr_banner=1">
          Open calendar
        </PrimaryButton>
      </GlassCard>

      {/* Send Enquiry */}
      <GlassCard style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: colors.ink, margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>Send an enquiry</h3>
        <p style={{ color: colors.inkSoft, lineHeight: 1.6, marginBottom: '24px' }}>
          Start with your work email to open a short enquiry. Additional context appears only when needed.
        </p>
        <form
          action="https://formspree.io/f/xgopzknd"
          method="POST"
          style={{ display: 'grid', gap: '16px' }}
        >
          <input type="hidden" name="_subject" value="Fundamental Frontiers website enquiry" />
          <input type="hidden" name="_source" value="Fundamental Frontiers website" />
          
          <div>
            <label htmlFor="ff-email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: colors.ink, marginBottom: '8px' }}>
              Work email
            </label>
            <input
              id="ff-email"
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              onFocus={() => setEmailEntered(true)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: `1px solid ${colors.lineStrong}`,
                background: 'white',
                color: colors.ink,
                fontSize: '1rem',
                outline: 'none',
              }}
            />
          </div>

          {emailEntered && (
            <div style={{ display: 'grid', gap: '16px', animation: 'fadeSlideIn 0.3s ease' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                <div>
                  <label htmlFor="ff-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: colors.ink, marginBottom: '8px' }}>
                    Full name
                  </label>
                  <input
                    id="ff-name"
                    name="full_name"
                    type="text"
                    required
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: `1px solid ${colors.lineStrong}`,
                      background: 'white',
                      color: colors.ink,
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="ff-focus" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: colors.ink, marginBottom: '8px' }}>
                    Primary need
                  </label>
                  <select
                    id="ff-focus"
                    name="primary_need"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: `1px solid ${colors.lineStrong}`,
                      background: 'white',
                      color: colors.ink,
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                  >
                    <option value="">Select one</option>
                    <option>Risk management and compliance readiness</option>
                    <option>Standard work and SOP alignment</option>
                    <option>RCA and CAPA support</option>
                    <option>Supplier performance</option>
                    <option>Operational excellence and Kaizen</option>
                    <option>Dashboards and reporting</option>
                    <option>Request white paper or case study</option>
                    <option>Request readiness checklist</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="ff-message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: colors.ink, marginBottom: '8px' }}>
                  Brief context
                </label>
                <textarea
                  id="ff-message"
                  name="message"
                  rows={3}
                  placeholder="Current issue, timing, priority, document request, or question"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: `1px solid ${colors.lineStrong}`,
                    background: 'white',
                    color: colors.ink,
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>
            </div>
          )}

          <PrimaryButton type="submit">
            Send enquiry
          </PrimaryButton>
        </form>
      </GlassCard>
    </div>
  )
}

// ===== MAIN CONTENT =====
export function MainContent() {
  return (
    <div
      style={{
        width: 'min(1160px, calc(100% - 36px))',
        marginInline: 'auto',
        paddingTop: '48px',
        paddingBottom: '48px',
      }}
    >
      <AccordionProvider defaultOpen={null}>
        {/* Services */}
        <AccordionSection
          id="services"
          title="Services"
          teaser="Three practice areas: Readiness, Quality, and Visibility."
        >
          <DossierView items={servicesItems} />
        </AccordionSection>

        {/* Programs */}
        <AccordionSection
          id="programs"
          title="Programs"
          teaser="Structured engagements with defined outcomes and timelines."
        >
          <DossierView items={programsItems} />
        </AccordionSection>

        {/* Industries */}
        <AccordionSection
          id="industries"
          title="Industries"
          teaser="Eight sectors where our consultants have worked."
        >
          <DossierView items={industriesItems} />
        </AccordionSection>

        {/* Case Studies - Always Expanded */}
        <section id="proof" style={{ padding: '48px 0', borderBottom: `1px solid ${colors.lineStrong}` }}>
          <div style={{ marginBottom: '32px' }}>
            <Kicker>Selected work</Kicker>
            <h2 style={{ fontSize: 'clamp(1.65rem, 1.22rem + 1.42vw, 2.48rem)', fontFamily: 'Georgia, serif', color: colors.ink, margin: '12px 0 16px', letterSpacing: '-0.018em' }}>
              Selected work and proof points
            </h2>
            <p style={{ fontSize: '1.1rem', maxWidth: '66ch', color: 'rgba(23, 27, 36, 0.76)', lineHeight: 1.6 }}>
              Representative work aligned to risk, compliance, improvement, and execution priorities. These examples show how structured work has been used to improve organisation, strengthen control, and support more consistent operational follow through.
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '16px',
              paddingBottom: '8px',
              scrollSnapType: 'x mandatory',
            }}
          >
            {caseStudies.map((study) => (
              <article
                key={study.id}
                style={{
                  flex: '0 0 min(88vw, 380px)',
                  scrollSnapAlign: 'start',
                }}
              >
                <GlassCard style={{ padding: '24px', height: '100%' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.inkMuted, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Fundamental Frontiers</div>
                    <div style={{ fontSize: '0.75rem', color: colors.inkMuted }}>Selected work</div>
                  </div>
                  <Chip>{study.type}</Chip>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: colors.ink, margin: '16px 0 12px', lineHeight: 1.3 }}>{study.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: colors.inkSoft, lineHeight: 1.6, marginBottom: '16px' }}>{study.description}</p>
                  <TextButton href="#contact-book">
                    Request this case study
                  </TextButton>
                </GlassCard>
              </article>
            ))}
          </div>
          <div
            style={{
              marginTop: '24px',
              fontSize: '0.875rem',
              color: colors.inkSoft,
              background: colors.bgSoft,
              borderRadius: '16px',
              padding: '16px',
              border: `1px solid ${colors.line}`,
            }}
          >
            Request a <a href="#contact-book" style={{ color: colors.wine, fontWeight: 600 }}>white paper</a>, <a href="#contact-book" style={{ color: colors.wine, fontWeight: 600 }}>sample case study</a>, or <a href="#contact-book" style={{ color: colors.wine, fontWeight: 600 }}>readiness checklist</a> if you want to review a practical example before the first discussion.
          </div>
        </section>

        {/* Insights */}
        <AccordionSection
          id="insights"
          title="Insights"
          teaser="Recent perspectives and practical notes from LinkedIn."
        >
          <div style={{ marginBottom: '24px' }}>
            <PrimaryButton href="/about">
              Click here to know more about us
            </PrimaryButton>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {insightsArticles.map((article, i) => (
              <article key={i}>
                <GlassCard style={{ padding: '24px', height: '100%' }}>
                  <Chip>{article.category}</Chip>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: colors.ink, margin: '16px 0 12px', lineHeight: 1.4 }}>{article.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: colors.inkSoft, lineHeight: 1.6, marginBottom: '16px' }}>{article.excerpt}</p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: colors.wine,
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                    }}
                  >
                    Read on LinkedIn
                    <ExternalLink style={{ width: '12px', height: '12px' }} />
                  </a>
                </GlassCard>
              </article>
            ))}
          </div>
        </AccordionSection>

        {/* Contact */}
        <AccordionSection
          id="contact-book"
          title="Contact"
          teaser="Book directly or send an enquiry to begin the conversation."
        >
          <div style={{ marginBottom: '24px' }}>
            <Kicker>Booking and enquiry</Kicker>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', color: colors.ink, margin: '12px 0 8px' }}>Choose the next step</h3>
            <p style={{ fontSize: '1.1rem', maxWidth: '66ch', color: 'rgba(23, 27, 36, 0.76)', lineHeight: 1.6 }}>
              Book directly when timing is clear. Send an enquiry when context should come first.
            </p>
          </div>
          <ContactSection />
        </AccordionSection>
      </AccordionProvider>
    </div>
  )
}
