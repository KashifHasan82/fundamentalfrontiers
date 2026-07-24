/**
 * FF REQUEST MODAL — generic compact dialog for inbound requests.
 *
 * Replaces the original case-study-only modal. Now handles two variants
 * via a discriminated state object:
 *  - { kind: 'case-study', title: string } → "Request case study" form
 *  - { kind: 'enquiry' }                   → "Send us an enquiry" form
 *  - null                                  → modal closed
 *
 * Form is IDENTICAL across variants (locked: 2 required, 4 optional).
 * Only the eyebrow / header title / submit label / success copy change.
 *
 * LOCKED design tokens (do not change without sign-off):
 *  - Backdrop: bg-ff-ink/50 fixed inset-0 z-50
 *  - Card: bg-ff-white, max-w-md, p-10, shadow-2xl
 *  - Inputs: bg-ff-cream-light, border border-ff-ink/10, focus:border-ff-wine
 *  - Submit: solid wine button matching CtaStrip language
 *
 * NOTE: Submit handler is a placeholder. When wiring lands:
 *   - For 'case-study': POST { kind, title, formData } → trigger PDF download
 *   - For 'enquiry':    POST { kind, formData } → enqueue for inbox
 *   - Update success copy accordingly.
 */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'
import { trackEvent } from '@/lib/track'

export type RequestModalState =
  | { kind: 'case-study'; title: string }
  | { kind: 'enquiry' }
  | null

type Props = {
  state: RequestModalState
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

const COPY = {
  'case-study': {
    eyebrow: 'REQUEST CASE STUDY',
    submitLabel: 'SEND REQUEST',
    successEyebrow: 'REQUEST RECEIVED',
    successTitle: "We'll send the case study to your inbox shortly.",
    successCopy:
      'Thanks for the interest in our work. If anything else would be useful, reply to that email — it lands directly with the team.',
  },
  enquiry: {
    eyebrow: 'SEND US AN ENQUIRY',
    submitLabel: 'SEND ENQUIRY',
    successEyebrow: 'ENQUIRY RECEIVED',
    successTitle: "Thanks for reaching out. We'll be in touch shortly.",
    successCopy:
      'We read every enquiry and respond directly. Expect a reply from a real person on the team within one or two business days.',
  },
} as const

export function RequestModal({ state, onClose }: Props) {
  const [formData, setFormData] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const isOpen = state !== null

  // Reset state on close (delay so user doesn't see fields blank during fade)
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setFormData(initialForm)
        setSubmitted(false)
        setSubmitting(false)
        setSubmitError(false)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Escape closes
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const handleChange =
    (field: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Build the payload for Formspree.
    //
    // FORMSPREE INTEGRATION NOTES:
    //   • Endpoint: https://formspree.io/f/xgopzknd
    //   • Recipient inbox: hasan.kashif@hotmail.com (configured in Formspree)
    //   • Same endpoint as the existing HTML site — no new account/setup needed
    //
    // Special Formspree-recognized fields:
    //   _subject  — sets the email subject line for clean inbox triage
    //   _replyto  — Formspree auto-detects from `email` field, no need to set
    //
    // To migrate to a different backend later (Resend, custom API):
    //   change the fetch URL — payload format is generic enough to work
    //   with any standard form-handling service or your own endpoint.
    const isStudyRequest = state?.kind === 'case-study'
    const subject = isStudyRequest
      ? `Case study request: ${state.title}`
      : 'Website enquiry — Fundamental Frontiers'

    const payload = {
      _subject: subject,
      submission_type: isStudyRequest ? 'Case Study Request' : 'General Enquiry',
      ...(isStudyRequest && state.kind === 'case-study'
        ? { case_study_title: state.title }
        : {}),
      name: formData.name,
      email: formData.email,
      company: formData.company,
      job_title: formData.jobTitle,
      department: formData.department,
      mobile: formData.mobile,
    }

    // Record the attempt separately. Conversion events are fired only after
    // Formspree confirms success, so failed submissions are not counted.
    if (state?.kind === 'case-study') {
      trackEvent('case_study_attempt', {
        source: 'request_modal',
        case_study: state.title,
      })
    } else if (state?.kind === 'enquiry') {
      trackEvent('enquiry_attempt', { source: 'request_modal' })
    }

    setSubmitting(true)
    setSubmitError(false)

    try {
      const res = await fetch('https://formspree.io/f/xgopzknd', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        // Formspree returned an error (rate limit, validation, etc.)
        throw new Error(`Formspree returned ${res.status}`)
      }

      // Confirmed conversion — Formspree accepted the submission.
      if (state?.kind === 'case-study') {
        trackEvent('case_study_submit', {
          source: 'request_modal',
          case_study: state.title,
        })
      } else if (state?.kind === 'enquiry') {
        trackEvent('enquiry_submit', { source: 'request_modal' })
      }

      // Success — show the thank-you message
      setSubmitted(true)
    } catch (err) {
      // Network failure or Formspree error.
      // Show error state. User can retry, or email directly.
      // eslint-disable-next-line no-console
      console.error('[RequestModal] submission failed:', err)
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  // Pick variant copy. Default to case-study while exit-animating to avoid flicker.
  const variant = state?.kind ?? 'case-study'
  const copy = COPY[variant]
  const headerTitle =
    state?.kind === 'case-study'
      ? state.title
      : 'Tell us a little about you.'

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
          aria-labelledby="request-modal-title"
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
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-ff-ink-muted hover:text-ff-ink transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6 lg:p-10">
                <div className="mb-8 pr-8">
                  <span
                    id="request-modal-title"
                    className="block text-[11px] font-semibold tracking-[0.3em] text-ff-wine font-display mb-3"
                  >
                    {copy.eyebrow}
                  </span>
                  <h3 className="text-2xl font-light text-ff-ink leading-tight">
                    {headerTitle}
                  </h3>
                </div>

                {/* Hidden tracking field — only present for case-study variant */}
                {state?.kind === 'case-study' && (
                  <input
                    type="hidden"
                    name="caseStudy"
                    value={state.title}
                    readOnly
                  />
                )}

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

                {submitError && (
                  <div className="mt-6 p-4 border border-ff-wine/30 bg-ff-wine/5 text-sm text-ff-ink leading-relaxed">
                    Something went wrong sending your message. Please try again, or email us directly at{' '}
                    <a
                      href="mailto:contact@fundamentalfrontiers.com"
                      className="text-ff-wine font-semibold underline hover:no-underline"
                    >
                      contact@fundamentalfrontiers.com
                    </a>
                    .
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-10 w-full bg-ff-wine text-ff-white py-4 text-sm font-semibold tracking-[0.2em] hover:bg-ff-ink transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'SENDING…' : copy.submitLabel}
                </button>
              </form>
            ) : (
              /* Confirmation state */
              <div className="p-6 lg:p-10 text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-ff-wine/10 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-ff-wine" strokeWidth={1.5} />
                </div>
                <span className="block text-[11px] font-semibold tracking-[0.3em] text-ff-wine font-display mb-3">
                  {copy.successEyebrow}
                </span>
                <h3 className="text-2xl font-light text-ff-ink leading-tight mb-4">
                  {copy.successTitle}
                </h3>
                <p className="text-sm text-ff-ink-muted leading-relaxed mb-8">
                  {copy.successCopy}
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
