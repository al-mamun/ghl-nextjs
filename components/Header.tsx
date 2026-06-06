'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 900,
        height: 'var(--header-h)', display: 'flex', alignItems: 'center',
        background: scrolled ? 'rgba(6,8,18,0.95)' : 'rgba(6,8,18,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--clr-border)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
        transition: 'background 0.25s ease, box-shadow 0.25s ease',
        isolation: 'isolate',
      }}
      id="header"
    >
      <nav className="container" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.45))', display: 'flex' }}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="lgH" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1"/><stop offset="0.55" stopColor="#8b5cf6"/><stop offset="1" stopColor="#06b6d4"/>
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="9" fill="url(#lgH)"/>
              <rect width="32" height="32" rx="9" fill="white" opacity="0.06"/>
              <rect x="1" y="1" width="30" height="2" rx="1" fill="white" opacity="0.18"/>
              <path d="M8 16C8 11.582 11.582 8 16 8C18.485 8 20.712 9.052 22.263 10.737L19.435 13.565C18.626 12.592 17.384 12 16 12C13.791 12 12 13.791 12 16C12 18.209 13.791 20 16 20C17.657 20 19.083 19.009 19.732 17.6H16V14.4H24C24.131 14.921 24.2 15.453 24.2 16C24.2 20.529 20.529 24.2 16 24.2C11.471 24.2 7.8 20.529 7.8 16H8Z" fill="white"/>
            </svg>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '0.05rem', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--clr-text)' }}>
              GHL <em style={{ fontStyle: 'normal', background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Service</em>
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--clr-text-3)' }}>Provider</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', margin: '0 auto', listStyle: 'none', padding: 0 }} className="desktop-nav">
          {[
            { href: '/#services', label: 'Services' },
            { href: '/#pricing', label: 'Pricing' },
            { href: '/blog', label: 'Blog' },
            { href: '/case-studies', label: 'Case Studies' },
            { href: '/#faq', label: 'FAQ' },
            { href: '/#contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--clr-text-2)', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', transition: 'all var(--transition)', display: 'block' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--clr-text)'; (e.target as HTMLElement).style.background = 'var(--clr-surface)' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--clr-text-2)'; (e.target as HTMLElement).style.background = 'transparent' }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }} className="desktop-actions">
          <Link href="/#contact" className="btn btn-ghost" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>Get Demo</Link>
          <Link href="/#contact" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>Book Consultation</Link>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '0.4rem', border: 'none', background: 'none', cursor: 'pointer' }} className="hamburger">
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: '22px', height: '2px', background: 'var(--clr-text)', borderRadius: '2px', transition: 'all 0.25s ease',
              transform: menuOpen && i === 0 ? 'translateY(7px) rotate(45deg)' : menuOpen && i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1 }} />
          ))}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 'var(--header-h)', left: 0, right: 0,
          background: 'var(--clr-bg-2)', borderBottom: '2px solid rgba(99,102,241,0.35)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.6)', padding: '0.75rem 1.25rem 1.25rem',
          zIndex: 890
        }}>
          {[
            { href: '/#services', label: 'Services' },
            { href: '/#pricing', label: 'Pricing' },
            { href: '/blog', label: 'Blog' },
            { href: '/case-studies', label: 'Case Studies' },
            { href: '/#faq', label: 'FAQ' },
            { href: '/#contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={closeMenu} style={{ display: 'block', padding: '0.875rem 1rem', fontSize: '1rem', fontWeight: 600, color: 'var(--clr-text-2)', borderBottom: '1px solid var(--clr-border)', transition: 'color 0.25s' }}>
              {label}
            </Link>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--clr-border)' }}>
            <Link href="/#contact" onClick={closeMenu} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Get Free Demo</Link>
            <Link href="/#contact" onClick={closeMenu} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Book Consultation</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-actions { display: none !important; }
          .hamburger { display: flex !important; margin-left: auto; }
        }
      `}</style>
    </header>
  )
}
