import Link from 'next/link'
import { Eyebrow } from '@/components/brand/typography'

const QUESTIONS = [
  {
    question: 'What does Fundamental Frontiers do?',
    answer:
      'Fundamental Frontiers provides senior-led consulting across risk, compliance, quality, operations, and continuous improvement. Engagements cover readiness and governance, quality and execution, and management visibility and reporting.',
  },
  {
    question: 'Who leads each consulting engagement?',
    answer:
      'A named senior consultant owns the engagement from the initial review through structured closure. The work is not rotated between consultants, subcontracted, or handed off during delivery.',
  },
  {
    question: 'Which standards and improvement methods do you work with?',
    answer:
      'The firm works with ISO 9001, ISO 14001, ISO 45001, ISO 27001, AS 9100, ISO 13485, IATF 16949, Lean Six Sigma, DMAIC, Kaizen, FMEA, 8D, and root-cause methods.',
  },
  {
    question: 'Where is Fundamental Frontiers located?',
    answer:
      'Fundamental Frontiers is headquartered in Atlanta, Georgia, with regional offices in Raleigh, North Carolina, and Houston, Texas.',
  },
]

export function CommonQuestions() {
  return (
    <section id="common-questions" className="py-16 bg-ff-cream border-t border-ff-ink/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20">
          <div>
            <Eyebrow className="mb-3">QUICK ANSWERS</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-light text-ff-ink leading-[1.15]">
              Common questions
            </h2>
            <p className="text-base text-ff-ink-muted leading-relaxed mt-5 max-w-md">
              Clear answers about how we work, what we cover, and where to begin.
            </p>
            <Link
              href="/free-course"
              className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-ff-wine hover:text-ff-ink transition-colors"
            >
              Start the free Six Sigma module
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="border-t border-ff-ink/15">
            {QUESTIONS.map((item) => (
              <details key={item.question} className="group border-b border-ff-ink/15">
                <summary className="list-none cursor-pointer py-6 flex items-start justify-between gap-6 text-lg font-semibold text-ff-ink hover:text-ff-wine transition-colors">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="text-2xl font-light text-ff-wine leading-none group-open:rotate-45 transition-transform"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-base text-ff-ink-muted leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
