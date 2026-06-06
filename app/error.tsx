'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // e.g. Sentry.captureException(error)
    } else {
      console.error(error)
    }
  }, [error])

  return (
    <main id="main-content" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', background: 'var(--clr-bg)' }}>
      <div style={{ textAlign: 'center', maxWidth: '520px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.5" fill="#ef4444"/>
          </svg>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--clr-text)' }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--clr-text-2)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          An unexpected error occurred. Please try again or contact us if the problem persists.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} className="btn btn-primary">Try Again</button>
          <Link href="/" className="btn btn-outline">Go Home</Link>
        </div>
      </div>
    </main>
  )
}
