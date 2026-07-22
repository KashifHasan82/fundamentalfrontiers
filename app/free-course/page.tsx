import type { Metadata } from 'next'
import CourseClient from '@/components/course/course-client'
import './course.css'

export const metadata: Metadata = {
  title: {
    absolute: 'Free Six Sigma Yellow Belt Module | Fundamental Frontiers',
  },
  description:
    'Start a free, interactive Six Sigma Yellow Belt module from Fundamental Frontiers and learn why quality varies and why it matters.',
  alternates: {
    canonical: 'https://www.fundamentalfrontiers.com/free-course',
  },
  openGraph: {
    title: 'Free Six Sigma Yellow Belt Module | Fundamental Frontiers',
    description:
      'Learn the foundations of quality variation in this free, interactive Six Sigma Yellow Belt module.',
    url: 'https://www.fundamentalfrontiers.com/free-course',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Six Sigma Yellow Belt Module | Fundamental Frontiers',
    description:
      'Learn the foundations of quality variation in this free, interactive Six Sigma Yellow Belt module.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const courseStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      '@id': 'https://www.fundamentalfrontiers.com/free-course#course',
      name: 'Six Sigma Yellow Belt — Free Module',
      description:
        'An interactive introduction to quality variation, common cause variation, special cause variation, and the foundations of Six Sigma improvement.',
      url: 'https://www.fundamentalfrontiers.com/free-course',
      provider: {
        '@type': 'Organization',
        '@id': 'https://www.fundamentalfrontiers.com/#organization',
        name: 'Fundamental Frontiers',
        sameAs: 'https://www.fundamentalfrontiers.com',
      },
      isAccessibleForFree: true,
      inLanguage: 'en',
      courseMode: 'online',
      educationalLevel: 'Beginner',
      timeRequired: 'PT10M',
      about: ['Six Sigma', 'Quality variation', 'Process improvement'],
      teaches: [
        'Why processes vary',
        'The difference between common cause and special cause variation',
        'How variation affects quality and cost',
      ],
      offers: {
        '@type': 'Offer',
        price: 0,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://www.fundamentalfrontiers.com/free-course',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Fundamental Frontiers',
          item: 'https://www.fundamentalfrontiers.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Free Six Sigma Yellow Belt Module',
          item: 'https://www.fundamentalfrontiers.com/free-course',
        },
      ],
    },
  ],
}

export default function FreeCoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseStructuredData).replace(/</g, '\\u003c'),
        }}
      />
      <CourseClient />
    </>
  )
}
