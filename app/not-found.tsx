import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main id="main-content" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', background: 'var(--clr-bg)' }}>
      <div style={{ textAlign: 'center', maxWidth: '520px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(6rem,15vw,10rem)', fontWeight: 900, lineHeight: 1, background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem' }}>
          404
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1rem', color: 'var(--clr-text)' }}>
          Page Not Found
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--clr-text-2)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <Link href="/blog" className="btn btn-outline">Read the Blog</Link>
          <Link href="/#contact" className="btn btn-ghost">Contact Us</Link>
        </div>
      </div>
    </main>
  )
}
