export type CaseStudyFact = {
  value: string
  label: string
}

export type CaseStudyDetail = {
  heading: string
  items: string[]
}

export type CaseStudy = {
  slug: string
  title: string
  industry: string
  icon: 'car' | 'zap' | 'package'
  metric: string
  metricLabel: string
  summary: string
  metaDescription: string
  facts: CaseStudyFact[]
  details: CaseStudyDetail[]
}

/**
 * Approved case-study material.
 *
 * This data is intentionally limited to claims already published in the
 * homepage Selected Work cards. Do not expand it without an approved source.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: '5s-workplace-organisation',
    title: '5S Workplace Organisation',
    industry: 'Automotive',
    icon: 'car',
    metric: '50%',
    metricLabel: 'Search time reduced',
    summary:
      'Fifteen work areas. Twelve weeks. The problem was never effort — it was control. By cycle one: search time halved, audit scores up 60%, 5S now part of the operating discipline.',
    metaDescription:
      'Automotive 5S case study covering fifteen work areas over twelve weeks: search time halved and audit scores increased by 60%.',
    facts: [
      { value: '15', label: 'Work areas' },
      { value: '12 weeks', label: 'Engagement period' },
      { value: '50%', label: 'Search time reduced' },
    ],
    details: [
      {
        heading: 'Starting point',
        items: [
          'Fifteen work areas.',
          'The problem was never effort — it was control.',
        ],
      },
      {
        heading: 'Recorded outcomes',
        items: [
          'Search time halved.',
          'Audit scores up 60%.',
          '5S now part of the operating discipline.',
        ],
      },
    ],
  },
  {
    slug: 'wind-turbine-capa-programme',
    title: 'Wind Turbine CAPA Programme',
    industry: 'Power & Utilities',
    icon: 'zap',
    metric: '50%',
    metricLabel: 'Failure rate cut',
    summary:
      'A wind farm was losing 15% of energy output to repeat component failures. The trail led to one supplier — inconsistent materials, missing certifications. New supplier, tighter vetting, scheduled audits. Failure rate halved within the quarter.',
    metaDescription:
      'Wind turbine CAPA case study: repeat component failures were traced to one supplier and the failure rate halved within the quarter.',
    facts: [
      { value: '15%', label: 'Energy output affected' },
      { value: '50%', label: 'Failure rate cut' },
      { value: '1 quarter', label: 'Result period' },
    ],
    details: [
      {
        heading: 'Starting point',
        items: [
          'A wind farm was losing 15% of energy output to repeat component failures.',
          'The trail led to one supplier.',
        ],
      },
      {
        heading: 'Findings',
        items: ['Inconsistent materials.', 'Missing certifications.'],
      },
      {
        heading: 'Response and result',
        items: [
          'New supplier.',
          'Tighter vetting.',
          'Scheduled audits.',
          'Failure rate halved within the quarter.',
        ],
      },
    ],
  },
  {
    slug: 'contract-lifecycle-management',
    title: 'Contract Lifecycle Management',
    industry: 'Supply Chain',
    icon: 'package',
    metric: '67%',
    metricLabel: 'Contract cycle reduced',
    summary:
      'A 1,200-person enterprise was eighteen days from request to signature. Missed renewals, scattered records, Legal pulled into routine work. After standard templates, integrated systems, and clear escalation rules — six days to signature, $420K recovered, Legal back on the contracts that mattered.',
    metaDescription:
      'Contract lifecycle management case study: request-to-signature time reduced from eighteen days to six, with $420K recovered.',
    facts: [
      { value: '1,200', label: 'Person enterprise' },
      { value: '18 → 6 days', label: 'Request to signature' },
      { value: '$420K', label: 'Recovered' },
    ],
    details: [
      {
        heading: 'Starting point',
        items: [
          'Eighteen days from request to signature.',
          'Missed renewals.',
          'Scattered records.',
          'Legal pulled into routine work.',
        ],
      },
      {
        heading: 'Changes',
        items: [
          'Standard templates.',
          'Integrated systems.',
          'Clear escalation rules.',
        ],
      },
      {
        heading: 'Recorded outcomes',
        items: [
          'Six days to signature.',
          '$420K recovered.',
          'Legal back on the contracts that mattered.',
        ],
      },
    ],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}
