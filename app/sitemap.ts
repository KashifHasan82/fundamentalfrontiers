import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.fundamentalfrontiers.com'
const LAST_SIGNIFICANT_UPDATE = new Date('2026-07-22')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_SIGNIFICANT_UPDATE,
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
}
