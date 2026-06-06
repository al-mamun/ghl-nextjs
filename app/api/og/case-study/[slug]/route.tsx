import { NextRequest, NextResponse } from 'next/server'
import { getCaseStudyBySlug } from '@/lib/queries'

const INDUSTRY_CFG: Record<string, { accent: string; accent2: string; bg1: string; bg2: string; iconPath: string }> = {
  'Local Services':    { accent: '#818cf8', accent2: '#6366f1', bg1: '#0a0a20', bg2: '#05051a', iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  'Cleaning Business': { accent: '#38bdf8', accent2: '#0284c7', bg1: '#001520', bg2: '#000d14', iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  'Gym & Fitness':     { accent: '#34d399', accent2: '#059669', bg1: '#001a10', bg2: '#000d07', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
  'Real Estate':       { accent: '#60a5fa', accent2: '#2563eb', bg1: '#000d1a', bg2: '#000814', iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  'Contractor':        { accent: '#fb923c', accent2: '#ea580c', bg1: '#1a0800', bg2: '#0d0400', iconPath: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' },
  'Coaching':          { accent: '#c084fc', accent2: '#9333ea', bg1: '#180028', bg2: '#0d0018', iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  'Agency':            { accent: '#818cf8', accent2: '#4f46e5', bg1: '#0a0a20', bg2: '#05051a', iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
}
const DEFAULT = { accent: '#818cf8', accent2: '#6366f1', bg1: '#0a0a20', bg2: '#05051a', iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const cs = await getCaseStudyBySlug(params.slug).catch(() => null)
  const industry = cs?.industry || 'Service Business'
  const results = cs?.results?.slice(0, 3) || []
  const cfg = INDUSTRY_CFG[industry] || DEFAULT

  // Build result metric boxes SVG
  let rx = 40
  const metricBoxes = results.map(r => {
    const boxW = Math.max(160, (r.value?.length || 3) * 26 + 60)
    const box = `
    <rect x="${rx}" y="490" width="${boxW}" height="90" rx="16"
          fill="rgba(0,0,0,0.55)" stroke="${cfg.accent}" stroke-opacity="0.4" stroke-width="1.5"/>
    <text x="${rx + boxW/2}" y="535" font-family="system-ui,sans-serif" font-size="38"
          font-weight="900" fill="${cfg.accent}" text-anchor="middle">${r.value}</text>
    <text x="${rx + boxW/2}" y="562" font-family="system-ui,sans-serif" font-size="13"
          fill="rgba(255,255,255,0.6)" text-anchor="middle" font-weight="500">${r.label}</text>`
    rx += boxW + 18
    return box
  }).join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${cfg.bg1}"/>
      <stop offset="100%" stop-color="${cfg.bg2}"/>
    </linearGradient>
    <radialGradient id="glow1" cx="30%" cy="35%" r="55%" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${cfg.accent}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${cfg.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="80%" cy="70%" r="45%" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${cfg.accent2}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${cfg.accent2}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="iconG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${cfg.accent}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${cfg.accent2}" stop-opacity="0.65"/>
    </linearGradient>
    <linearGradient id="topBar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${cfg.accent}"/>
      <stop offset="100%" stop-color="${cfg.accent2}"/>
    </linearGradient>
    <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="55%" stop-color="rgba(0,0,0,0.6)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.92)"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="30"/></filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Dot pattern -->
  <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r="1" fill="${cfg.accent}" fill-opacity="0.06"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <!-- Diagonal lines -->
  <line x1="0" y1="630" x2="630" y2="0" stroke="${cfg.accent}" stroke-opacity="0.04" stroke-width="1"/>
  <line x1="400" y1="630" x2="1030" y2="0" stroke="${cfg.accent}" stroke-opacity="0.03" stroke-width="1"/>

  <!-- Large icon — glow shadow -->
  <g transform="translate(600,260) scale(9)" opacity="0.1" filter="url(#glow)">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="${cfg.accent}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" x="-12" y="-12">
      <path d="${cfg.iconPath}"/>
    </svg>
  </g>

  <!-- Large icon — crisp -->
  <g transform="translate(600,255) scale(8.5)">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="url(#iconG)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" x="-12" y="-12">
      <path d="${cfg.iconPath}"/>
    </svg>
  </g>

  <!-- Top bar -->
  <rect x="0" y="0" width="1200" height="5" fill="url(#topBar)"/>

  <!-- Bottom gradient overlay -->
  <rect width="1200" height="630" fill="url(#bottomFade)"/>

  <!-- Result metric boxes -->
  ${metricBoxes}

  <!-- Industry label + domain -->
  <text x="1160" y="430" font-family="system-ui,sans-serif" font-size="14" font-weight="600"
        fill="rgba(255,255,255,0.3)" text-anchor="end">ghlserviceprovider.com</text>
</svg>`

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
