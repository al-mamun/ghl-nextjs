'use client'
import { useEffect, useRef, useState } from 'react'

function useCounter(target: number, duration = 1800) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { el.textContent = String(target); return }

    let start: number | null = null
    const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      observer.disconnect()
      const step = (ts: number) => {
        if (!start) start = ts
        const elapsed = ts - start
        const progress = Math.min(elapsed / duration, 1)
        el.textContent = String(Math.round(easeOutExpo(progress) * target))
        if (progress < 1) requestAnimationFrame(step)
        else el.textContent = String(target)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.3 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])
  return ref
}

const PIPELINE = [
  { stage: 'New Lead',  pct: 85, color: '#6366f1' },
  { stage: 'Contacted', pct: 68, color: '#8b5cf6' },
  { stage: 'Qualified', pct: 52, color: '#06b6d4' },
  { stage: 'Closed',    pct: 31, color: '#10b981' },
]

export default function HeroDashboard() {
  const leadsRef = useCounter(47)
  const autoRef  = useCounter(156)
  const apptRef  = useCounter(12)

  // Pipeline bar animation: starts at 0, animates to target width on intersection
  const [barWidths, setBarWidths] = useState<number[]>(PIPELINE.map(() => 0))
  const pipelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = pipelineRef.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      observer.disconnect()

      if (prefersReduced) {
        setBarWidths(PIPELINE.map(p => p.pct))
        return
      }

      const duration = 1200
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
      let start: number | null = null

      const step = (ts: number) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const ease = easeOut(progress)
        setBarWidths(PIPELINE.map(p => p.pct * ease))
        if (progress < 1) requestAnimationFrame(step)
        else setBarWidths(PIPELINE.map(p => p.pct))
      }
      requestAnimationFrame(step)
    }, { threshold: 0.3 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{
      background: 'var(--clr-bg-3)',
      border: '1px solid var(--clr-border-2)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '460px',
      boxShadow: 'var(--shadow-glow), 0 8px 40px rgba(0,0,0,0.5)',
    }}>
      {/* ── Header ── */}
      <div style={{
        background: 'var(--clr-bg-2)',
        padding: '0.875rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        borderBottom: '1px solid var(--clr-border)',
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ef4444','#f59e0b','#10b981'].map(c => (
            <span key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c, display: 'block' }}/>
          ))}
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-3)', fontWeight: 500 }}>GHL Dashboard — Live System</span>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Metric rows */}
        {[
          { label: 'New Leads Today',     ref: leadsRef, trend: '▲ 23%'    },
          { label: 'Automations Running', ref: autoRef,  trend: '▲ Active'  },
          { label: 'Appointments Booked', ref: apptRef,  trend: '▲ Today'   },
        ].map(({ label, ref, trend }) => (
          <div key={label} style={{
            background: 'var(--clr-surface)',
            border: '1px solid var(--clr-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--clr-text-3)', flex: 1 }}>{label}</span>
            <span ref={ref} style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--clr-text)' }}>0</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2em 0.5em', borderRadius: '6px', color: '#10b981', background: 'rgba(16,185,129,0.12)' }}>{trend}</span>
          </div>
        ))}

        {/* Pipeline with animated bars */}
        <div ref={pipelineRef} style={{
          background: 'var(--clr-surface)',
          border: '1px solid var(--clr-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
        }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--clr-text-2)', marginBottom: '0.75rem' }}>Sales Pipeline</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {PIPELINE.map(({ stage, pct, color }, i) => (
              <div key={stage} style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', color: 'var(--clr-text-3)', gap: '0.75rem' }}>
                <span style={{ minWidth: '58px' }}>{stage}</span>
                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${barWidths[i]}%`,
                    height: '100%',
                    background: color,
                    borderRadius: '9999px',
                    transition: 'none', // driven by RAF, not CSS transition
                  }}/>
                </div>
                <span style={{ minWidth: '28px', textAlign: 'right', color: 'var(--clr-text-3)' }}>{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Automation status rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['AI Chatbot — Running', 'SMS Follow-Up — Active', 'Review Request — Sent'].map(label => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--clr-text-3)' }}>
              <span style={{
                width: '7px', height: '7px',
                background: 'var(--clr-green)',
                borderRadius: '50%',
                flexShrink: 0,
                animation: 'pulse 2s infinite',
              }}/>
              {label}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
