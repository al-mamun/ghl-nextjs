import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--clr-bg)', borderTop: '1px solid var(--clr-border)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div className="footer-brand" style={{ maxWidth: '320px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', textDecoration: 'none' }}>
              <span style={{ filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.4))', display: 'flex' }}>
                <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                  <defs><linearGradient id="lgF" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor="#6366f1"/><stop offset="0.55" stopColor="#8b5cf6"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
                  <rect width="32" height="32" rx="9" fill="url(#lgF)"/>
                  <rect width="32" height="32" rx="9" fill="white" opacity="0.06"/>
                  <rect x="1" y="1" width="30" height="2" rx="1" fill="white" opacity="0.18"/>
                  <path d="M8 16C8 11.582 11.582 8 16 8C18.485 8 20.712 9.052 22.263 10.737L19.435 13.565C18.626 12.592 17.384 12 16 12C13.791 12 12 13.791 12 16C12 18.209 13.791 20 16 20C17.657 20 19.083 19.009 19.732 17.6H16V14.4H24C24.131 14.921 24.2 15.453 24.2 16C24.2 20.529 20.529 24.2 16 24.2C11.471 24.2 7.8 20.529 7.8 16H8Z" fill="white"/>
                </svg>
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, gap: '0.1rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--clr-text)' }}>
                  GHL <em style={{ fontStyle: 'normal', background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Service</em>
                </span>
                <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--clr-text-3)' }}>Provider</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-3)', lineHeight: 1.7 }}>
              Your trusted GHL Service Provider — building GoHighLevel systems that generate leads, automate follow-ups, and convert more customers.
            </p>
          </div>

          {/* Nav Columns */}
          <nav className="footer-nav" style={{ display: 'flex', gap: '3rem' }}>
            <FooterCol title="Services" links={[
              { href: '/#services', label: 'Funnel Design' },
              { href: '/#services', label: 'CRM Setup' },
              { href: '/#services', label: 'Workflow Automation' },
              { href: '/#services', label: 'AI Chatbots' },
              { href: '/#services', label: 'AI Voice Agents' },
            ]} />
            <FooterCol title="Quick Links" links={[
              { href: '/blog', label: 'Blog' },
              { href: '/case-studies', label: 'Case Studies' },
              { href: '/#pricing', label: 'Pricing' },
              { href: '/#faq', label: 'FAQ' },
              { href: '/#contact', label: 'Contact' },
            ]} />
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--clr-text-2)', display: 'block', marginBottom: '0.875rem' }}>Contact</span>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li><a href="mailto:hello@ghlserviceprovider.com" style={{ fontSize: '0.875rem', color: 'var(--clr-text-3)', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.25s' }}>hello@ghlserviceprovider.com</a></li>
                <li><a href="https://wa.me/8801718020102" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--clr-text-3)', transition: 'color 0.25s' }}>WhatsApp Chat</a></li>
                <li><a href="tel:+8801718020102" style={{ fontSize: '0.875rem', color: 'var(--clr-text-3)', transition: 'color 0.25s' }}>+880 1718 020102</a></li>
              </ul>
              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                {[
                  { href: 'https://www.facebook.com/GHLServiceProvider', label: 'Facebook', icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/> },
                  { href: 'https://wa.me/8801718020102', label: 'WhatsApp', icon: <path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.549 4.107 1.512 5.84L.057 23.943l6.265-1.44A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/> },
                  { href: 'mailto:hello@ghlserviceprovider.com', label: 'Email', icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></> },
                  { href: 'https://www.linkedin.com/in/mamundevstudios/', label: 'LinkedIn', icon: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></> },
                ].map(({ href, label, icon }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label}
                    style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-text-3)', transition: 'all 0.25s ease' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={label === 'Facebook' || label === 'WhatsApp' ? 'currentColor' : 'none'} stroke={label === 'Email' || label === 'LinkedIn' ? 'currentColor' : undefined} strokeWidth="2" aria-hidden="true">{icon}</svg>
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--clr-border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-3)' }}>© {new Date().getFullYear()} GHL Service Provider. All rights reserved.</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-3)', opacity: 0.7 }}>GoHighLevel® is a registered trademark of HighLevel Inc. This site is not affiliated with or endorsed by GoHighLevel.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--clr-text-2)', display: 'block', marginBottom: '0.875rem' }}>{title}</span>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link href={href} style={{ fontSize: '0.875rem', color: 'var(--clr-text-3)', transition: 'color 0.25s' }}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
