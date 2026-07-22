import { ImageResponse } from 'next/og'

export const alt = 'Fundamental Frontiers — Risk, Quality and Operations Consulting'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F6F1ED',
          color: '#171B24',
          padding: '72px 84px',
          fontFamily: 'Arial, sans-serif',
          borderTop: '18px solid #7A1F2B',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ fontSize: 54, fontWeight: 700, color: '#7A1F2B' }}>FF</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: 4 }}>FUNDAMENTAL FRONTIERS</div>
            <div style={{ fontSize: 18, letterSpacing: 5, color: '#6C7585', marginTop: 8 }}>CONSULTING</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 930 }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 400 }}>
            Risk. Quality. Operations.
          </div>
          <div style={{ fontSize: 30, color: '#7A1F2B', marginTop: 24 }}>
            Senior-led engagements with named accountability.
          </div>
        </div>
        <div style={{ fontSize: 20, color: '#6C7585' }}>fundamentalfrontiers.com</div>
      </div>
    ),
    size
  )
}
