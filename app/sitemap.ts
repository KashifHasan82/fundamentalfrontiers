import type { MetadataRoute } from 'next'
import { caseStudies } from '@/lib/case-studies'

const SITE_URL = 'https://www.fundamentalfrontiers.com'
const LAST_SIGNIFICANT_UPDATE = new Date('2026-07-22')

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date('2026-07-24'),
    },
    {
      url: `${SITE_URL}/free-course`,
      lastModified: LAST_SIGNIFICANT_UPDATE,
    },
    {
      url: `${SITE_URL}/company-profile.pdf`,
      lastModified: new Date('2026-05-06'),
    },
  ]

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map(({ slug, dateModified }) => ({
    url: `${SITE_URL}/case-studies/${slug}`,
    lastModified: new Date(dateModified),
  }))

  return [...staticPages, ...caseStudyPages]
}
