import { SITE_URL } from '@/lib/config'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllCaseStudies, CaseStudy } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Case Studies — Real GoHighLevel Results for Real Businesses',
  description: 'Real results from real businesses. See how GoHighLevel systems helped businesses generate more leads, automate follow-up and close more deals.',
  openGraph: { url: `${SITE_URL}/case-studies` },
  alternates: { canonical: `${SITE_URL}/case-studies` },
}

export const revalidate = 3600

const INDUSTRY_GRADIENTS: Record<string, string> = {
  'Local Services':   'linear-gradient(135deg,#1a1033,#2d1b69,#6366f1)',
  'Cleaning Business':'linear-gradient(135deg,#0c1a2e,#0e4172,#06b6d4)',
  'Gym & Fitness':    'linear-gradient(135deg,#0a1a0a,#14532d,#16a34a)',
  'Real Estate':      'linear-gradient(135deg,#0c1a3a,#1e3a5f,#0369a1)',
  'Contractor':       'linear-gradient(135deg,#1a0e00,#7c2d12,#ea580c)',
  'Coaching':         'linear-gradient(135deg,#1a0a2e,#4a044e,#7c3aed)',
  'Agency':           'linear-gradient(135deg,#0c1a3a,#1e3a5f,#6366f1)',
}

// Map each industry to the closest category config for a relevant themed image
const INDUSTRY_TO_CATEGORY: Record<string, string> = {
  'Local Services':    'Lead Generation',
  'Cleaning Business': 'Automation',
  'Gym & Fitness':     'Business Growth',
  'Real Estate':       'CRM & Pipeline',
  'Contractor':        'Lead Generation',
  'Coaching':          'Authority',
  'Agency':            'AI Automation',
}

function getCsPhotoUrl(industry: string, slug: string, square = false): string {
  const cat = INDUSTRY_TO_CATEGORY[industry] || 'Business Growth'
  return `/api/cover/${slug}?c=${encodeURIComponent(cat)}${square ? '&sq=1' : ''}`
}

export default async function CaseStudiesPage() {
  const studies: CaseStudy[] = await getAllCaseStudies()

  const featured = studies[0]
  const rest = studies.slice(1)

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', padding: '5rem 0 4rem', background: 'var(--clr-bg)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(16,185,129,0.25),transparent 70%)', top: '-150px', left: '-80px', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4 }}/>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,black,transparent)' }}/>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8125rem', color: 'var(--clr-text-2)', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', padding: '0.4em 1em', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--clr-green)', borderRadius: '50%' }}/>
            Proven Results
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Real Businesses. <span className="gradient-text">Real Results.</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--clr-text-2)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Every number below is real. Every story happened. No invented data — just what happens when GoHighLevel is built properly.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[{ label: '200+ Systems Built', color: 'rgba(16,185,129,0.4)', textColor: 'var(--clr-green)', bg: 'rgba(16,185,129,0.12)' }, { label: '98% Satisfaction', color: 'rgba(6,182,212,0.3)', textColor: 'var(--clr-cyan)', bg: 'transparent' }, { label: '50+ Industries', color: 'var(--clr-border)', textColor: 'var(--clr-text-3)', bg: 'transparent' }].map(tag => (
              <span key={tag.label} style={{ fontSize: '0.8125rem', fontWeight: 600, padding: '0.4em 1em', borderRadius: 'var(--radius-full)', border: `1px solid ${tag.color}`, color: tag.textColor, background: tag.bg, cursor: 'default' }}>{tag.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      {featured && (
        <section style={{ padding: '4rem 0 0', background: 'var(--clr-bg)' }}>
          <div className="container">
            <Link href={`/case-studies/${featured.slug.current}`} className="card-hover-glow" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--clr-surface)', textDecoration: 'none', marginBottom: '2rem' }}>
              {/* Thumbnail */}
              <div style={{ position: 'relative', background: '#060812', minHeight: '420px', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getCsPhotoUrl(featured.industry, featured.slug.current, true)} alt={featured.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              {/* Content */}
              <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--clr-primary)', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', padding: '0.3em 0.8em', borderRadius: 'var(--radius-full)' }}>{featured.industry}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--clr-text-3)', border: '1px solid var(--clr-border)', padding: '0.3em 0.8em', borderRadius: 'var(--radius-full)' }}>Lead Generation</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--clr-text-3)', border: '1px solid var(--clr-border)', padding: '0.3em 0.8em', borderRadius: 'var(--radius-full)' }}>AI Chatbot</span>
                </div>
                {/* Title + excerpt */}
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem,2vw,1.75rem)', fontWeight: 800, lineHeight: 1.25, color: 'var(--clr-text)' }}>{featured.title}</h2>
                <p style={{ fontSize: '0.9375rem', color: 'var(--clr-text-2)', lineHeight: 1.8 }}>{featured.excerpt}</p>
                {/* Results table */}
                {featured.results && featured.results.length > 0 && (
                  <div style={{ border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                    {featured.results.slice(0, 3).map((r, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: i < Math.min(featured.results!.length, 3) - 1 ? '1px solid var(--clr-border)' : 'none' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--clr-text-2)' }}>{r.label}</span>
                        {r.sub && r.sub.includes('→') ? (
                          <span style={{ fontSize: '0.875rem' }}>
                            <span style={{ color: 'var(--clr-text-3)' }}>{r.sub.split('→')[0].trim()} → </span>
                            <span style={{ fontWeight: 700, color: 'var(--clr-green)' }}>{r.sub.split('→')[1].trim()}</span>
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--clr-green)' }}>{r.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {/* CTA */}
                <span className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Read Full Case Study →</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <section style={{ padding: '2rem 0 5rem', background: 'var(--clr-bg)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
              {rest.map((cs) => (
                <Link key={cs._id} href={`/case-studies/${cs.slug.current}`} className="card-hover" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '200px', position: 'relative', overflow: 'hidden', background: INDUSTRY_GRADIENTS[cs.industry] || 'linear-gradient(135deg,#1a1033,#2d1b69,#6366f1)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getCsPhotoUrl(cs.industry, cs.slug.current, false)} alt={cs.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(6,8,18,0.8) 0%,transparent 60%)' }}/>
                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 1, display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {cs.results?.slice(0,2).map((r, i) => (
                        <div key={i} style={{ background: 'rgba(6,8,18,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-md)', padding: '0.35rem 0.65rem', textAlign: 'center' }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{r.value}</div>
                          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)' }}>{r.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--clr-cyan)', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', padding: '0.2em 0.6em', borderRadius: 'var(--radius-full)', display: 'inline-block', alignSelf: 'flex-start', marginBottom: '0.875rem' }}>{cs.industry}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.75rem', color: 'var(--clr-text)', flex: 1 }}>{cs.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-2)', lineHeight: 1.7, marginBottom: '1.25rem' }}>{cs.excerpt}</p>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--clr-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: 'auto' }}>Read Case Study →</span>
                  </div>
                </Link>
              ))}

              {/* More Coming Soon card */}
              <div style={{ background: 'var(--clr-surface)', border: '1px dashed var(--clr-border-2)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '340px', padding: '2.5rem', textAlign: 'center', gap: '1rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1px solid var(--clr-border-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--clr-text-3)' }}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--clr-text)' }}>More Coming Soon</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-3)', lineHeight: 1.65, maxWidth: '220px' }}>New results published regularly from real clients across every industry.</p>
                <Link href="/#contact" className="btn btn-ghost" style={{ marginTop: '0.5rem' }}>Get Your Results Here →</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '6rem 0', background: 'var(--clr-bg-2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse,rgba(99,102,241,0.12),transparent 70%)', pointerEvents: 'none' }}/>
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px', position: 'relative', zIndex: 1 }}>
          <span className="section-eyebrow">Start Today</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 800, margin: '0.75rem 0 1.25rem' }}>Want to Be Our Next Case Study?</h2>
          <p style={{ fontSize: '1.0625rem', color: 'var(--clr-text-2)', marginBottom: '2.5rem', lineHeight: 1.75 }}>Book a free consultation. I&apos;ll audit your current process and show you exactly what system we&apos;d build for your business.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <Link href="/#contact" className="btn btn-primary btn-xl">Book Free Consultation</Link>
            <Link href="/blog" className="btn btn-outline btn-xl">Read the Blog →</Link>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--clr-text-3)' }}>
            <span>✓ Demo First</span><span>✓ Pay After Satisfaction</span><span>✓ 50% Launch Offer</span>
          </div>
        </div>
      </section>
    </>
  )
}
