import { ImageResponse } from 'next/og'
import { getCaseStudyBySlug } from '@/lib/queries'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INDUSTRY_COLORS: Record<string, string> = {
  'Local Services':    '#6366f1',
  'Cleaning Business': '#06b6d4',
  'Gym & Fitness':     '#10b981',
  'Real Estate':       '#0369a1',
  'Contractor':        '#ea580c',
  'Coaching':          '#8b5cf6',
  'Agency':            '#6366f1',
}

export default async function Image({ params }: { params: { slug: string } }) {
  const cs = await getCaseStudyBySlug(params.slug)
  const title = cs?.title || 'Case Study'
  const industry = cs?.industry || 'Service Business'
  const results = cs?.results?.slice(0, 3) || []
  const accent = INDUSTRY_COLORS[industry] || '#6366f1'

  return new ImageResponse(
    (
      <div style={{
        width: '1200px', height: '630px',
        display: 'flex', flexDirection: 'column',
        background: '#060812', position: 'relative',
        overflow: 'hidden', fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{
          position: 'absolute', top: '-80px', left: '-80px',
          width: '450px', height: '450px', borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}44, transparent 70%)`,
          filter: 'blur(60px)', display: 'flex',
        }}/>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
          backgroundSize: '60px 60px', display: 'flex',
        }}/>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
          background: `linear-gradient(90deg, ${accent}, #8b5cf6, #06b6d4)`,
          display: 'flex',
        }}/>

        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column',
          padding: '60px 80px', height: '100%',
          justifyContent: 'space-between',
        }}>
          {/* Top */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', fontWeight: 800, color: '#fff',
              }}>G</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '18px', lineHeight: 1.2 }}>
                  GHL <span style={{ color: '#6366f1' }}>Service</span>
                </span>
                <span style={{ color: '#64748b', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Provider</span>
              </div>
            </div>
            <div style={{
              background: `${accent}22`, border: `1px solid ${accent}55`,
              borderRadius: '999px', padding: '8px 20px',
              fontSize: '13px', fontWeight: 700, color: accent,
              letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex',
            }}>
              Case Study · {industry}
            </div>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: title.length > 55 ? '40px' : '50px',
            fontWeight: 800, color: '#f1f5f9',
            lineHeight: 1.2, margin: 0, maxWidth: '850px',
            letterSpacing: '-0.02em',
          }}>{title}</h1>

          {/* Results */}
          {results.length > 0 && (
            <div style={{ display: 'flex', gap: '24px' }}>
              {results.map((r, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px', padding: '20px 28px',
                  display: 'flex', flexDirection: 'column', gap: '4px',
                }}>
                  <span style={{
                    fontSize: '36px', fontWeight: 900, color: accent,
                    lineHeight: 1, display: 'flex',
                  }}>{r.value}</span>
                  <span style={{ fontSize: '14px', color: '#94a3b8', display: 'flex' }}>{r.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  )
}
