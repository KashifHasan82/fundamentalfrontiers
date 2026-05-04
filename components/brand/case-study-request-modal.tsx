/**
 * FF CASE STUDY REQUEST MODAL — compact centered dialog.
 *
 * NOT a full-page takeover (that's ModalShell). This is a small
 * centered card (max-w-md) with a 6-field form (2 required, 4 optional).
 *
 * LOCKED design tokens:
 *  - Backdrop: bg-ff-ink/40 fixed inset-0 z-50
 *  - Card: bg-ff-white, max-w-md, p-10, shadow-2xl
 *  - Inputs: bg-ff-cream-light, border border-ff-ink/10, focus:border-ff-wine
 *  - Labels: text-[11px] uppercase tracking-[0.3em] text-ff-wine font-display (eyebrow style)
 *  - Submit: wine button (matches CtaStrip language)
 *  - Optional fields tagged "(OPTIONAL)" inline in label
 *
 * STATES:
 *  - form (default)
 *  - submitted (placeholder confirmation card)
 *
 * NOTE: Submit handler is currently a placeholder. When PDF download
 * wiring lands, replace the TODO block in handleSubmit and update the
 * confirmation card copy ("Your paper is being downloaded...").
 */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

type Props = {
  caseStudyTitle: string | null
  onClose: () => void
}

const initialForm = {
  name: '',
  email: '',
  company: '',
  jobTitle: '',
  department: '',
  mobile: '',
}

export function CaseStudyRequestModal({ caseStudyTitle, onClose }: Props) {
  const [formData, setFormData] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const isOpen = caseStudyTitle !== null

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Slight delay so the user doesn't see fields clear during close animation
      const t = setTimeout(() => {
        setFormData(initialForm)
        setSubmitted(false)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Escape key closes
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const handleChange = (field: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO (next pass): wire PDF download + backend submission here.
    //   - POST { caseStudyTitle, ...formData } to backend
    //   - Trigger file download for the matched PDF
    //   - Update confirmation copy to "Your paper is being downloaded..."
    // For now: just flip to confirmation state.
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.log('[CaseStudyRequest] submitted:', { caseStudyTitle, ...formData })
    }
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ff-ink/50 px-4 py-12 sm:py-20"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-request-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-ff-white shadow-2xl"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-ff-ink-muted hover:text-ff-ink transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-10">
                {/* Header */}
                <div className="mb-8 pr-8">
                  <span
                    id="case-study-request-title"
                    className="block text-[11px] font-semibold tracking-[0.3em] text-ff-wine font-display mb-3"
                  >
                    REQUEST CASE STUDY
                  </span>
                  <h3 className="text-2xl font-light text-ff-ink leading-tight">
                    {caseStudyTitle}
                  </h3>
                </div>

                {/* Hidden field — carries case study identifier for backend */}
                <input
                  type="hidden"
                  name="caseStudy"
                  value={caseStudyTitle ?? ''}
                  readOnly
                />

                {/* Fields */}
                <div className="space-y-5">
                  <Field
                    label="FULL NAME"
                    required
                    value={formData.name}
                    onChange={handleChange('name')}
                    type="text"
                    autoComplete="name"
                  />
                  <Field
                    label="COMPANY EMAIL"
                    required
                    value={formData.email}
                    onChange={handleChange('email')}
                    type="email"
                    autoComplete="email"
                  />
                  <Field
                    label="COMPANY NAME"
                    optional
                    value={formData.company}
                    onChange={handleChange('company')}
                    type="text"
                    autoComplete="organization"
                  />
                  <Field
                    label="JOB TITLE"
                    optional
                    value={formData.jobTitle}
                    onChange={handleChange('jobTitle')}
                    type="text"
                    autoComplete="organization-title"
                  />
                  <Field
                    label="DEPARTMENT"
                    optional
                    value={formData.department}
                    onChange={handleChange('department')}
                    type="text"
                  />
                  <Field
                    label="MOBILE"
                    optional
                    value={formData.mobile}
                    onChange={handleChange('mobile')}
                    type="tel"
                    autoComplete="tel"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-10 w-full bg-ff-wine text-ff-white py-4 text-sm font-semibold tracking-[0.2em] hover:bg-ff-ink transition-colors"
                >
                  SEND REQUEST
                </button>
              </form>
            ) : (
              /* Confirmation state */
              <div className="p-10 text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-ff-wine/10 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-ff-wine" strokeWidth={1.5} />
                </div>
                <span className="block text-[11px] font-semibold tracking-[0.3em] text-ff-wine font-display mb-3">
                  REQUEST RECEIVED
                </span>
                <h3 className="text-2xl font-light text-ff-ink leading-tight mb-4">
                  We&apos;ll send the case study to your inbox shortly.
                </h3>
                <p className="text-sm text-ff-ink-muted leading-relaxed mb-8">
                  Thanks for the interest in our work. If anything else would be useful, reply to that email — it lands directly with the team.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[11px] font-semibold tracking-[0.3em] text-ff-wine font-display hover:text-ff-ink transition-colors"
                >
                  CLOSE
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * FIELD — locked input pattern. Eyebrow label above, cream-light input below,
 * wine focus border. Optional tag appended to label inline (uppercase, muted).
 */
function Field({
  label,
  required = false,
  optional = false,
  value,
  onChange,
  type,
  autoComplete,
}: {
  label: string
  required?: boolean
  optional?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: string
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold tracking-[0.3em] text-ff-wine font-display mb-2">
        {label}
        {optional && (
          <span className="text-ff-ink-muted/60 font-normal ml-1.5"> (OPTIONAL)</span>
        )}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 bg-ff-cream-light border border-ff-ink/10 text-ff-ink placeholder:text-ff-ink-muted/60 focus:border-ff-wine focus:outline-none transition-colors"
      />
    </label>
  )
}
