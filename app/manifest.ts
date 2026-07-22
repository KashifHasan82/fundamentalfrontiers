import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fundamental Frontiers',
    short_name: 'FF Consulting',
    description: 'Senior-led consulting on risk, quality, and operations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F1ED',
    theme_color: '#7A1F2B',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
