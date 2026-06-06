import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/queries'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Premium category config — color + SVG icon path
const CATEGORY_CONFIG: Record<string, { accent: string; bg: string; icon: string }> = {
  'Troubleshooting': {
    accent: '#ef4444',
    bg: 'linear-gradient(135deg, #1a0505 0%, #3b0a0a 50%, #060812 100%)',
    icon: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
  },
  'AI Automation': {
    accent: '#06b6d4',
    bg: 'linear-gradient(135deg, #020e14 0%, #0a2a35 50%, #060812 100%)',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2',
  },
  'Lead Generation': {
    accent: '#10b981',
    bg: 'linear-gradient(135deg, #021209 0%, #083d25 50%, #060812 100%)',
    icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm8 4v6m3-3h-6',
  },
  'CRM & Pipeline': {
    accent: '#6366f1',
    bg: 'linear-gradient(135deg, #05051a 0%, #15153d 50%, #060812 100%)',
    icon: 'M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z',
  },
  'Automation': {
    accent: '#8b5cf6',
    bg: 'linear-gradient(135deg, #0d0514 0%, #2d1060 50%, #060812 100%)',
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  },
  'Funnels & Landing Pages': {
    accent: '#f59e0b',
    bg: 'linear-gradient(135deg, #140a00 0%, #3d2000 50%, #060812 100%)',
    icon: 'M22 3l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 3m0 0l10 13L22 3M2 3h20v16a2 2 0 01-2 2H4a2 2 0 01-2-2V3z',
  },
  'Industry Guides': {
    accent: '#06b6d4',
    bg: 'linear-gradient(135deg, #020e14 0%, #083040 50%, #060812 100%)',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  'Setup Guide': {
    accent: '#6366f1',
    bg: 'linear-gradient(135deg, #05051a 0%, #12124a 50%, #060812 100%)',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
  'Reputation': {
    accent: '#10b981',
    bg: 'linear-gradient(135deg, #021209 0%, #0a3a22 50%, #060812 100%)',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  },
  'Business Growth': {
    accent: '#8b5cf6',
    bg: 'linear-gradient(135deg, #0d0514 0%, #200a40 50%, #060812 100%)',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
  'Authority': {
    accent: '#f59e0b',
    bg: 'linear-gradient(135deg, #140a00 0%, #3d2a00 50%, #060812 100%)',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
}

const DEFAULT_CONFIG = {
  accent: '#6366f1',
  bg: 'linear-gradient(135deg, #05051a 0%, #12124a 50%, #060812 100%)',
  icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  const title = post?.title || 'GoHighLevel Guide'
  const category = post?.category || 'GoHighLevel'
  const readTime = post?.readTime || '5 min'
  const cfg = CATEGORY_CONFIG[category] || DEFAULT_CONFIG

  // Truncate title for display
  const displayTitle = title.length > 80 ? title.slice(0, 77) + '...' : title
  const fontSize = displayTitle.length > 60 ? '46px' : displayTitle.length > 40 ? '52px' : '58px'

  return new ImageResponse(
    (
      <div style={{
        width: '1200px', height: '630px',
        display: 'flex', position: 'relative',
        overflow: 'hidden', fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#060812',
      }}>
        {/* Left accent panel */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px',
          background: `linear-gradient(to bottom, ${cfg.accent}, #8b5cf6)`,
          display: 'flex',
        }}/>

        {/* Background gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: cfg.bg,
          opacity: 0.85,
          display: 'flex',
        }}/>

        {/* Large faded icon — decorative background element */}
        <div style={{
          position: 'absolute',
          right: '-40px', top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.06,
          display: 'flex',
        }}>
          <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke={cfg.accent} strokeWidth="0.8">
            <path d={cfg.icon}/>
          </svg>
        </div>

        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
          display: 'flex',
        }}/>

        {/* Glow from top-left */}
        <div style={{
          position: 'absolute', top: '-150px', left: '-80px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: `radial-gradient(circle, ${cfg.accent}25, transparent 65%)`,
          filter: 'blur(40px)',
          display: 'flex',
        }}/>

        {/* Main content */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column',
          padding: '56px 80px 56px 86px',
          width: '100%', height: '100%',
          justifyContent: 'space-between',
        }}>

          {/* Top row: logo + category */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 24px rgba(99,102,241,0.5)',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 5.5h-2v-.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v.5h-3v1h3v.5c0 .28.22.5.5.5s.5-.22.5-.5V8.5h2V7.5zm-7 9c0 .28.22.5.5.5h6c.28 0 .5-.22.5-.5v-5h-7v5z" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '20px', lineHeight: 1, display: 'flex' }}>
                  GHL <span style={{ color: '#6366f1', marginLeft: '6px' }}>Service</span>
                  <span style={{ color: '#f1f5f9', marginLeft: '4px' }}>Provider</span>
                </span>
                <span style={{ color: '#475569', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex' }}>
                  GoHighLevel Expert
                </span>
              </div>
            </div>

            {/* Category pill */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: `${cfg.accent}18`,
              border: `1.5px solid ${cfg.accent}40`,
              borderRadius: '999px',
              padding: '10px 22px',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cfg.accent} strokeWidth="2">
                <path d={cfg.icon}/>
              </svg>
              <span style={{ color: cfg.accent, fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex' }}>
                {category}
              </span>
            </div>
          </div>

          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', maxWidth: '900px' }}>
            <h1 style={{
              margin: 0, padding: 0,
              fontSize: fontSize,
              fontWeight: 900,
              color: '#f8fafc',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
            }}>
              {displayTitle}
            </h1>
          </div>

          {/* Bottom row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Read time */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '999px', padding: '10px 20px',
              }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: cfg.accent, display: 'flex',
                  boxShadow: `0 0 8px ${cfg.accent}`,
                }}/>
                <span style={{ color: '#94a3b8', fontSize: '15px', fontWeight: 500, display: 'flex' }}>
                  {readTime} read
                </span>
              </div>
              {/* URL */}
              <span style={{ color: '#334155', fontSize: '15px', fontWeight: 500, display: 'flex' }}>
                ghlserviceprovider.com
              </span>
            </div>

            {/* CTA pill */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: `linear-gradient(135deg, #6366f1, #8b5cf6)`,
              borderRadius: '999px', padding: '12px 28px',
              boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
            }}>
              <span style={{ color: '#fff', fontSize: '15px', fontWeight: 700, display: 'flex' }}>
                Read Article →
              </span>
            </div>
          </div>

        </div>
      </div>
    ),
    { ...size }
  )
}
