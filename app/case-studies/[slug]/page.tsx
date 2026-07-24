import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Car, Package, Zap } from 'lucide-react'
import { CtaStrip } from '@/components/brand/cta-strip'
import { SiteFooter } from '@/components/brand/site-footer'
import { Section } from '@/components/brand/section'
import { Eyebrow, H2, HeroH1, Lead } from '@/components/brand/typography'
import {
  caseStudies,
  getCaseStudy,
  type CaseStudy,
} from '@/lib/case-studies'

const SITE_URL = 'https://www.fundamentalfrontiers.com'
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const SOCIAL_IMAGE = `${SITE_URL}/opengraph-image`

const icons = {
  car: Car,
  zap: Zap,
  package: Package,
}

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    return {}
  }

  const canonical = `${SITE_URL}/case-studies/${study.slug}`

  return {
    title: `${study.title} Case Study`,
    description: study.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      url: canonical,
      title: `${study.title} Case Study | Fundamental Frontiers`,
      description: study.metaDescription,
      siteName: 'Fundamental Frontiers',
      publishedTime: study.datePublished,
      modifiedTime: study.dateModified,
      section: study.industry,
      tags: [study.title, study.industry, study.metricLabel],
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: 'Fundamental Frontiers — Risk, Quality and Operations Consulting',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${study.title} Case Study | Fundamental Frontiers`,
      description: study.metaDescription,
      images: [SOCIAL_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    notFound()
  }

  return <CaseStudyContent study={study} />
}

function CaseStudyContent({ study }: { study: CaseStudy }) {
  const Icon = icons[study.icon]
  const canonical = `${SITE_URL}/case-studies/${study.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'Fundamental Frontiers',
        alternateName: 'Fundamental Frontiers Consulting',
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/icon.svg`,
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: 'Fundamental Frontiers',
        publisher: {
          '@id': ORGANIZATION_ID,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Article',
        '@id': `${canonical}#article`,
        url: canonical,
        headline: `${study.title} Case Study`,
        name: `${study.title} Case Study`,
        description: study.metaDescription,
        abstract: study.summary,
        datePublished: study.datePublished,
        dateModified: study.dateModified,
        articleSection: study.industry,
        inLanguage: 'en-US',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonical,
        },
        isPartOf: {
          '@id': WEBSITE_ID,
        },
        author: {
          '@id': ORGANIZATION_ID,
        },
        publisher: {
          '@id': ORGANIZATION_ID,
        },
        about: [
          {
            '@type': 'Thing',
            name: study.title,
          },
          {
            '@type': 'Thing',
            name: study.industry,
          },
          {
            '@type': 'Thing',
            name: study.metricLabel,
          },
        ],
        keywords: [study.title, study.industry, study.metricLabel].join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Fundamental Frontiers',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Selected work',
            item: `${SITE_URL}/#selected-work`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: study.title,
            item: canonical,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <main className="pt-20 lg:pt-24">
        <Section background="cream" padding="default">
          <Link
            href="/#selected-work"
            className="mb-12 inline-flex items-center gap-2 text-sm text-ff-ink-muted hover:text-ff-wine transition-colors"
          >
            <span aria-hidden="true">←</span>
            Selected work
          </Link>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20 lg:items-end">
            <div className="max-w-4xl">
              <Eyebrow className="mb-8">{study.industry}</Eyebrow>
              <HeroH1>{study.title}</HeroH1>
            </div>

            <div className="border-t border-ff-wine pt-8">
              <Icon className="mb-6 h-7 w-7 text-ff-wine" strokeWidth={1.5} />
              <span className="block text-7xl font-light leading-none tracking-tight text-ff-wine">
                {study.metric}
              </span>
              <span className="mt-3 block text-base text-ff-ink-muted">
                {study.metricLabel}
              </span>
            </div>
          </div>
        </Section>

        <Section background="white" padding="compact" divider>
          <div className="grid gap-px bg-ff-ink/10 sm:grid-cols-3">
            {study.facts.map((fact) => (
              <div key={fact.label} className="bg-ff-white px-6 py-8 lg:px-10">
                <span className="block text-3xl font-light text-ff-ink">
                  {fact.value}
                </span>
                <Eyebrow className="mt-3 text-ff-ink-muted">
                  {fact.label}
                </Eyebrow>
              </div>
            ))}
          </div>
        </Section>

        <Section background="cream-light" divider>
          <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
            <div>
              <Eyebrow className="mb-3">Engagement summary</Eyebrow>
              <H2>What was recorded.</H2>
            </div>
            <Lead className="max-w-4xl text-ff-ink">{study.summary}</Lead>
          </div>
        </Section>

        <Section background="white" divider>
          <div className="mb-12 max-w-3xl">
            <Eyebrow className="mb-3">Recorded detail</Eyebrow>
            <H2>At a glance.</H2>
          </div>

          <div
            className={`grid gap-px bg-ff-ink/10 ${
              study.details.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
            }`}
          >
            {study.details.map((detail) => (
              <section
                key={detail.heading}
                className="bg-ff-white p-8 lg:p-10"
                aria-labelledby={`${study.slug}-${detail.heading
                  .toLowerCase()
                  .replaceAll(' ', '-')}`}
              >
                <h3
                  id={`${study.slug}-${detail.heading
                    .toLowerCase()
                    .replaceAll(' ', '-')}`}
                  className="mb-7 text-xl font-semibold text-ff-ink"
                >
                  {detail.heading}
                </h3>
                <ul className="space-y-4">
                  {detail.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-base leading-relaxed text-ff-ink-muted"
                    >
                      <span
                        className="mt-[0.7em] h-px w-4 shrink-0 bg-ff-wine"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Section>

        <CtaStrip
          variant="wine"
          heading="Ready to close the gap?"
          subline="Let's discuss where you are today and where you need to be. No obligation, no pitch deck."
          ctaLabel="Book a 30-minute call"
          trackSource={`case_study_${study.slug}`}
        />

        <SiteFooter />
      </main>
    </>
  )
}
