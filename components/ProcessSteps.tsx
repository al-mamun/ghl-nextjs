import type { ReactNode } from 'react'

interface Step {
  num: string
  title: string
  desc: string
  icon: ReactNode
}

const IconSearch = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

const IconMap = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
)

const IconGear = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
)

const IconLock = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
  </svg>
)

const IconTrending = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
    <polyline points="17,6 23,6 23,12"/>
  </svg>
)

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We start with a deep-dive into your business — your goals, current tools, pain points, and ideal customer journey. I learn your business before touching anything.',
    icon: IconSearch,
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'I map out your complete GHL system architecture — funnel flows, pipeline stages, automation triggers, and integrations — before a single line is built.',
    icon: IconMap,
  },
  {
    num: '03',
    title: 'Setup',
    desc: 'Full system build — funnels, pages, CRM, pipelines, calendars, integrations, phone, email, and all technical configurations. Done fast, done right.',
    icon: IconGear,
  },
  {
    num: '04',
    title: 'Automation',
    desc: 'Every workflow, email sequence, SMS chain, AI chatbot, and trigger is built and tested. Your system starts working for you 24/7.',
    icon: IconLock,
  },
  {
    num: '05',
    title: 'Optimization',
    desc: 'After launch I review performance data, fix any gaps, and optimize your system for maximum conversion rate and ROI.',
    icon: IconTrending,
  },
]

const iconBox: React.CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: 'var(--radius-lg)',
  background: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.1))',
  border: '1px solid rgba(99,102,241,0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1rem',
  color: 'var(--clr-primary)',
}

const card: React.CSSProperties = {
  background: 'var(--clr-surface)',
  border: '1px solid var(--clr-border)',
  borderRadius: 'var(--radius-lg)',
  padding: '1.5rem 1.25rem',
  flex: 1,
  transition: 'all 0.25s ease',
}

export default function ProcessSteps() {
  const items: ReactNode[] = []

  STEPS.forEach((step, i) => {
    items.push(
      <div key={step.num} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--clr-primary)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          {step.num}
        </div>
        <div style={card}>
          <div style={iconBox}>{step.icon}</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.6rem' }}>
            {step.title}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-2)', lineHeight: 1.65 }}>
            {step.desc}
          </p>
        </div>
      </div>
    )
    if (i < STEPS.length - 1) {
      items.push(
        <div key={'c' + i} className="process-connector" aria-hidden="true" />
      )
    }
  })

  return (
    <div
      className="hp-process-grid"
      style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr auto 1fr', alignItems: 'start', gap: 0, marginBottom: '3rem' }}
    >
      {items}
    </div>
  )
}
