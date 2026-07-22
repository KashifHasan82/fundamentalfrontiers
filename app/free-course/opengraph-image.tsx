import { ImageResponse } from 'next/og'

export const alt = 'Free Six Sigma Yellow Belt Module from Fundamental Frontiers'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function CourseOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F5EFE6',
          color: '#171B24',
          padding: '72px 84px',
          fontFamily: 'Arial, sans-serif',
          borderTop: '18px solid #7A1F2B',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ fontSize: 50, fontWeight: 700, color: '#7A1F2B' }}>FF</div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4 }}>FUNDAMENTAL FRONTIERS</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 980 }}>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 5, color: '#7A1F2B' }}>
            FREE INTERACTIVE MODULE
          </div>
          <div style={{ fontSize: 70, lineHeight: 1.05, marginTop: 22 }}>
            Six Sigma Yellow Belt
          </div>
          <div style={{ fontSize: 27, color: '#4A5160', marginTop: 24 }}>
            Learn why quality varies and why it matters.
          </div>
        </div>
        <div style={{ fontSize: 20, color: '#4A5160' }}>fundamentalfrontiers.com/free-course</div>
      </div>
    ),
    size
  )
}
