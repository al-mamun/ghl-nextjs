import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import HeroDashboard from '@/components/HeroDashboard'
import ProcessSteps from '@/components/ProcessSteps'
import { SITE_URL } from '@/lib/config'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'GHL Service Provider | GoHighLevel Expert — Funnels, CRM & Automation',
  description: 'Expert GoHighLevel service provider for complete GHL setup — funnels, CRM, AI chatbots, workflows & full automation. Demo first, pay after satisfaction.',
  alternates: { canonical: `${SITE_URL}/` },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'GHL Service Provider',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/images/og-image.jpg`,
  description: 'Expert GoHighLevel service provider for complete GHL setup — funnels, CRM, AI chatbots, workflows & full automation.',
  areaServed: 'Worldwide',
  serviceType: 'GoHighLevel Setup & Automation',
  sameAs: [
    'https://wa.me/8801718020102',
    'https://m.me/GHLServiceProvider',
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is GoHighLevel?', acceptedAnswer: { '@type': 'Answer', text: 'GoHighLevel (GHL) is an all-in-one marketing and CRM platform built for agencies and businesses. It includes funnels, websites, CRM, pipelines, email/SMS automation, AI chatbots, calendars, reputation management, and much more.' } },
    { '@type': 'Question', name: 'Can you set up my full GHL account?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. I provide complete GoHighLevel account setup including sub-account configuration, custom domain, SMTP, phone numbers, CRM, pipelines, workflows, and all integrations tailored to your business.' } },
    { '@type': 'Question', name: 'Can you build funnels and landing pages?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. I design and build high-converting funnels and landing pages inside GoHighLevel using custom code, strategic layouts, and conversion-optimized copy frameworks.' } },
    { '@type': 'Question', name: 'Can you set up AI chatbots?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. I build AI-powered chatbots inside GoHighLevel that qualify leads, answer FAQs, book appointments, and route conversations — all automatically, 24/7.' } },
    { '@type': 'Question', name: 'Can you create AI voice agents?', acceptedAnswer: { '@type': 'Answer', text: "Yes. I set up AI voice agents that handle inbound and outbound calls, qualify prospects, and book appointments automatically using GoHighLevel's AI voice capabilities." } },
    { '@type': 'Question', name: 'Can you fix existing GHL workflows?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. I audit, debug, and optimize existing GoHighLevel workflows, automations, and pipelines to ensure they perform reliably and efficiently.' } },
    { '@type': 'Question', name: 'Do you offer monthly support?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. I offer flexible monthly support retainers for ongoing GHL management, optimization, new automation builds, and technical troubleshooting.' } },
  ],
}

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <defs><linearGradient id="lgh" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor="#6366f1"/><stop offset="0.55" stopColor="#8b5cf6"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
    <rect width="32" height="32" rx="9" fill="url(#lgh)"/>
    <rect width="32" height="32" rx="9" fill="white" opacity="0.06"/>
    <rect x="1" y="1" width="30" height="2" rx="1" fill="white" opacity="0.18"/>
    <path d="M8 16C8 11.582 11.582 8 16 8C18.485 8 20.712 9.052 22.263 10.737L19.435 13.565C18.626 12.592 17.384 12 16 12C13.791 12 12 13.791 12 16C12 18.209 13.791 20 16 20C17.657 20 19.083 19.009 19.732 17.6H16V14.4H24C24.131 14.921 24.2 15.453 24.2 16C24.2 20.529 20.529 24.2 16 24.2C11.471 24.2 7.8 20.529 7.8 16H8Z" fill="white"/>
  </svg>
)

export default function HomePage() {
  return (
    <>
      {/* ── Structured Data ── */}
      <JsonLd data={orgJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ── HERO ── */}
      <section style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', padding: '8rem 0 4rem', background: 'var(--clr-bg)' }} id="home">
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(99,102,241,0.5),transparent 70%)', top: '-200px', left: '-100px', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.35 }}/>
          <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(139,92,246,0.4),transparent 70%)', top: '100px', right: '-150px', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.35 }}/>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,black,transparent)' }}/>
        </div>
        <div className="container hp-hero-container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', flex: '1' }}>
          {/* Left: Content */}
          <div data-animate="fade-right">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8125rem', color: 'var(--clr-text-2)', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', padding: '0.4em 1em', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--clr-green)', borderRadius: '50%' }}/>
              GoHighLevel Certified Expert • Available for New Projects
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem' }}>
              GoHighLevel Systems That
              <span style={{ background: 'var(--grad-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Generate Leads,</span>
              <br/>Automate Follow-Ups &amp;
              <span style={{ background: 'var(--grad-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Convert More Customers</span>
            </h1>
            <p style={{ fontSize: '1.0625rem', color: 'var(--clr-text-2)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              I help businesses set up complete GoHighLevel systems including funnels, CRM, pipelines, workflows, AI chatbots, AI voice agents, calendars, automations, and full backend configuration — so your business runs on autopilot.
            </p>
            <div className="hp-hero-ctas" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Link href="#contact" className="btn btn-primary btn-xl">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Book Free GHL Consultation
              </Link>
              <Link href="#contact" className="btn btn-outline btn-xl">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5,3 19,12 5,21"/></svg>
                Get Free Demo First
              </Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {[['✓','Demo First'],['✓','Pay After Satisfaction'],['⚡','50% Launch Offer'],['✓','Full Backend Setup']].map(([icon, label]) => (
                <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--clr-text-2)', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', padding: '0.35em 0.85em', borderRadius: 'var(--radius-full)' }}>
                  <span style={{ color: 'var(--clr-primary)' }}>{icon}</span>{label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Animated Dashboard */}
          <div data-animate="fade-left" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <HeroDashboard />
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="section" id="problems" style={{ background: 'var(--clr-bg)' }}>
        <div className="container">
          <div className="section-header" data-animate="fade-up">
            <span className="section-eyebrow">Sound Familiar?</span>
            <h2 className="section-title">Your Business Has These Problems <span style={{ background: 'var(--grad-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Right Now</span></h2>
            <p className="section-subtitle">Most businesses are losing revenue daily because of these fixable system gaps.</p>
          </div>
          <div className="hp-problems-grid" data-animate="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem', marginBottom: '3rem' }}>
            {[
              { title:'Leads Not Followed Up', desc:'New leads come in but nobody follows up fast enough. They go cold and buy from your competitor.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
              { title:'Messy, Unused CRM', desc:'Your CRM is a graveyard of contacts with no structure, no stages, no clear next actions.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
              { title:'Manual Work Wastes Time', desc:'Your team does repetitive tasks by hand — sending emails, scheduling, updating records — killing productivity.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
              { title:'No Clear Sales Pipeline', desc:'You have no visibility into where your deals are. Nothing moves prospects forward systematically.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
              { title:'Missed Calls Lose Customers', desc:'Every missed call is a missed sale. Without instant follow-up automation, those leads are gone forever.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.48-1.48a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> },
              { title:'No Automation System', desc:'Your business runs on people doing everything manually. No system means no scale — and no freedom.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
            ].map(({ title, desc, icon }) => (
              <div key={title} style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', transition: 'all 0.25s ease' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--clr-red)' }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--clr-text)', marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--clr-text-2)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.0625rem', color: 'var(--clr-text-2)', marginBottom: '1.25rem' }}>Every day without a system costs you leads, time, and money.</p>
            <Link href="#contact" className="btn btn-primary">Fix This Today →</Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" id="services" style={{ background: 'var(--clr-bg-2)' }}>
        <div className="container">
          <div className="section-header" data-animate="fade-up">
            <span className="section-eyebrow">What I Build</span>
            <h2 className="section-title">Complete GoHighLevel <span style={{ background: 'var(--grad-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Services Menu</span></h2>
            <p className="section-subtitle">Every service you need to turn GoHighLevel into a full revenue-generating machine.</p>
          </div>
          <div className="hp-services-grid" data-animate="fade-up" style={{ display: 'grid', gap: '1.25rem', marginBottom: '3rem' }}>
            {[
              { title:'GHL Funnel Design', desc:'High-converting multi-step funnels built to capture leads and close deals on autopilot.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/></svg> },
              { title:'Landing Page Development', desc:'Custom-coded, lightning-fast landing pages with strategic layouts and optimized copy.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg> },
              { title:'CRM Setup', desc:'Complete CRM configuration with custom fields, tags, smart lists, and contact organization.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
              { title:'Pipeline Setup', desc:'Sales pipelines with custom stages, automated stage triggers, and deal tracking.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg> },
              { title:'Workflow Automation', desc:'Complex multi-step workflows that trigger the right action at the right time — automatically.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
              { title:'Email Automation', desc:'Drip campaigns, broadcast emails, and behavior-triggered sequences that nurture and convert.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
              { title:'SMS Automation', desc:"Two-way SMS conversations, automated follow-ups, and lead nurturing sequences via text.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
              { title:'AI Chatbots', desc:'AI chatbots that qualify leads, book appointments and answer questions 24/7 — no human needed.', badge:'AI Powered', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1" fill="currentColor"/></svg> },
              { title:'AI Voice Agents', desc:'AI voice agents that handle inbound/outbound calls, qualify prospects, and book appointments.', badge:'AI Powered', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> },
              { title:'Appointment Calendar Setup', desc:'Calendar systems with custom availability, booking forms, automated confirmations, and reminders.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
              { title:'Reputation Management', desc:'Automated review request campaigns and reputation monitoring to build your 5-star brand.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg> },
              { title:'Missed Call Text Back', desc:"Instant automated SMS sent to anyone who calls and doesn't get answered.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/></svg> },
              { title:'Payment Integration', desc:'Stripe, PayPal, and other payment integrations for invoices and subscriptions inside GHL.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
              { title:'SaaS Mode Setup', desc:'Full SaaS mode configuration to sell GHL as your own branded software.', badge:'Advanced', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
              { title:'White Label Setup', desc:'Complete white label branding with your logo, colors, custom domain, and branded client portal.', badge:'Advanced', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
              { title:'Membership & Course Setup', desc:'Full membership site and online course setup inside GHL — modules, drip content, access levels.', badge:'Popular', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> },
              { title:'Domain, DNS & SMTP Setup', desc:'Full domain configuration, DNS records, SSL, custom sending domains, and SMTP setup.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2.5" strokeLinecap="round"/><line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2.5" strokeLinecap="round"/></svg> },
              { title:'Zapier / Make / API Integration', desc:'Connect GHL with any tool via Zapier, Make.com, or direct API integration.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
            ].map(({ title, desc, badge, icon }) => (
              <div key={title} style={{ background: 'var(--clr-surface)', border: `1px solid ${badge === 'AI Powered' ? 'rgba(99,102,241,0.3)' : badge === 'Advanced' ? 'rgba(139,92,246,0.3)' : 'var(--clr-border)'}`, borderRadius: 'var(--radius-lg)', padding: '1.75rem', position: 'relative', transition: 'all 0.25s ease' }}>
                {badge && <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--clr-primary)', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', padding: '0.2em 0.6em', borderRadius: 'var(--radius-full)' }}>{badge}</span>}
                <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--clr-primary)' }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--clr-text)', marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-2)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}

            {/* Full width card */}
            <div className="hp-services-full" style={{ gridColumn: 'span 3', background: 'linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.06))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ width: '64px', height: '64px', flexShrink: 0, borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-primary)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--clr-text)', marginBottom: '0.4rem' }}>Full GHL Backend Configuration</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--clr-text-2)' }}>Complete end-to-end GoHighLevel account setup — every setting, integration, and automation configured for maximum performance. The whole system, done right.</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="#contact" className="btn btn-primary">Discuss Your GHL Project →</Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section" id="process" style={{ background: 'var(--clr-bg)' }}>
        <div className="container">
          <div className="section-header" data-animate="fade-up">
            <span className="section-eyebrow">How It Works</span>
            <h2 className="section-title">From Zero to <span style={{ background: 'var(--grad-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Fully Automated</span> in 5 Steps</h2>
            <p className="section-subtitle">A proven process that gets your GHL system live fast — and built to last.</p>
          </div>
          <ProcessSteps />
          <div style={{ textAlign: 'center' }}>
            <Link href="#contact" className="btn btn-primary">Start the Process Today →</Link>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section" id="pricing" style={{ background: 'var(--clr-bg-2)' }}>
        <div className="container">
          <div className="section-header" data-animate="fade-up">
            <span className="section-eyebrow">Investment</span>
            <h2 className="section-title">Transparent <span style={{ background: 'var(--grad-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pricing Packages</span></h2>
            <p className="section-subtitle">No hidden fees. No surprises. Every package includes a free demo before you pay.</p>
          </div>
          <div className="hp-pricing-grid" data-animate="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { tier: 'Starter', name: 'Basic GHL Setup', price: '497', desc: 'Perfect for businesses just getting started with GoHighLevel.', features: ['GHL sub-account setup','Domain & SMTP configuration','1 landing page / funnel','Basic CRM pipeline (3 stages)','Lead notification workflow','Missed call text back','Calendar booking setup','14-day post-launch support'], featured: false },
              { tier: 'Growth', name: 'Growth Automation Setup', price: '997', desc: 'For businesses ready to automate lead generation and follow-up at scale.', features: ['Everything in Basic, plus:','3 funnels / landing pages','Full CRM pipeline setup','Email + SMS automation sequences','AI chatbot setup','Google review automation','WhatsApp integration','Payment integration','Zapier / Make integration','30-day post-launch support'], featured: true },
              { tier: 'Complete', name: 'Complete GHL System Setup', price: '1,997', desc: 'The full revenue machine — every component built and optimized.', features: ['Everything in Growth, plus:','Unlimited funnels & pages','AI voice agent setup','Advanced workflow automations','SaaS or white label setup','Snapshot creation','Twilio / LC Phone setup','Custom API integrations','Full backend audit & config','60-day post-launch support'], featured: false },
            ].map(({ tier, name, price, desc, features, featured }) => (
              <div key={tier} style={{ background: featured ? 'rgba(99,102,241,0.06)' : 'var(--clr-surface)', border: `1px solid ${featured ? 'var(--clr-primary)' : 'var(--clr-border)'}`, borderRadius: 'var(--radius-xl)', padding: '2.25rem', position: 'relative', boxShadow: featured ? '0 0 0 1px rgba(99,102,241,0.2), 0 0 40px rgba(99,102,241,0.25)' : 'none' }}>
                {featured && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.35em 1.1em', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Most Popular</div>}
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--clr-primary)', marginBottom: '0.5rem' }}>{tier}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>{name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--clr-text-2)' }}>$</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>{price}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-3)' }}>one-time</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-2)', marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid var(--clr-border)', lineHeight: 1.6 }}>{desc}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--clr-text-2)' }}>
                  {features.map(f => <li key={f} style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--clr-green)', flexShrink: 0 }}>✓</span>{f}</li>)}
                </ul>
                <Link href="#contact" className={`btn ${featured ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>Get Started →</Link>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ width: '52px', height: '52px', flexShrink: 0, borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-primary)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="23,4 23,10 17,10"/><polyline points="1,20 1,14 7,14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>Monthly Support Available</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-2)' }}>Flexible monthly retainer support for ongoing GHL management, optimization, and new automation builds.</p>
            </div>
            <Link href="#contact" className="btn btn-ghost">Enquire About Support</Link>
          </div>
        </div>
      </section>

      {/* ── WHY ME ── */}
      <section className="section" id="why-me" style={{ background: 'var(--clr-bg)' }}>
        <div className="container">
          <div className="section-header" data-animate="fade-up">
            <span className="section-eyebrow">Why Work With Me</span>
            <h2 className="section-title">Not Just a Setup Guy — <span style={{ background: 'var(--grad-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>A Systems Thinker</span></h2>
            <p className="section-subtitle">There are many GHL freelancers. Here&apos;s what makes the difference.</p>
          </div>
          <div className="hp-why-grid" data-animate="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {[
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 014.5 7v0A2.5 2.5 0 012 9.5v5A2.5 2.5 0 004.5 17v0A2.5 2.5 0 007 19.5v0A2.5 2.5 0 009.5 22h5a2.5 2.5 0 002.5-2.5v0a2.5 2.5 0 002.5-2.5v0a2.5 2.5 0 002.5-2.5v-5A2.5 2.5 0 0019.5 7v0A2.5 2.5 0 0017 4.5v0A2.5 2.5 0 0014.5 2z"/><line x1="12" y1="6" x2="12" y2="14"/><path d="M9 10l3 4 3-4"/></svg>, title:'Full System Mindset', desc:"I don't just build individual pieces — I design the entire customer journey from first click to closed deal." },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12h6l2-7 4 14 2-7h6"/></svg>, title:'Deep Technical Experience', desc:'Years of hands-on GHL experience across every feature — from basic setups to advanced SaaS deployments.' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>, title:'Custom Coding Ability', desc:"Unlike most GHL freelancers, I can write custom HTML, CSS, JavaScript, and API code — so your system has no limits." },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, title:'Automation-First Approach', desc:'Every system I build is designed to reduce manual work to near zero. If a human is doing it repeatedly, I automate it.' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>, title:'Fast Communication', desc:"I respond within hours, not days. You'll always know project status and never wonder what's happening." },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, title:'Demo-First Working Style', desc:'See the system working before you pay. I build demos so you can validate the approach before full commitment.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', transition: 'all 0.25s ease' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--clr-primary)' }}>{icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-2)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" id="faq" style={{ background: 'var(--clr-bg-2)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="section-header" data-animate="fade-up">
            <span className="section-eyebrow">Common Questions</span>
            <h2 className="section-title">Frequently Asked <span style={{ background: 'var(--grad-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Questions</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              ['What is GoHighLevel?','GoHighLevel (GHL) is an all-in-one marketing and CRM platform built for agencies and businesses. It includes funnels, websites, CRM, pipelines, email/SMS automation, AI chatbots, calendars, reputation management, and much more.'],
              ['Can you set up my full GHL account?','Yes. I provide complete GoHighLevel account setup including sub-account configuration, custom domain, SMTP, phone numbers, CRM, pipelines, workflows, and all integrations tailored to your business.'],
              ['Can you build funnels and landing pages?','Absolutely. I design and build high-converting funnels and landing pages inside GoHighLevel using custom code, strategic layouts, and conversion-optimized copy frameworks.'],
              ['Can you set up AI chatbots?','Yes. I build AI-powered chatbots inside GoHighLevel that qualify leads, answer FAQs, book appointments, and route conversations — all automatically, 24/7.'],
              ['Can you create AI voice agents?','Yes. I set up AI voice agents that handle inbound and outbound calls, qualify prospects, and book appointments automatically using GoHighLevel\'s AI voice capabilities.'],
              ['Can you fix existing GHL workflows?','Yes. I audit, debug, and optimize existing GoHighLevel workflows, automations, and pipelines to ensure they perform reliably and efficiently.'],
              ['Do you offer monthly support?','Yes. I offer flexible monthly support retainers for ongoing GHL management, optimization, new automation builds, and technical troubleshooting.'],
            ].map(([q, a]) => (
              <details key={q} style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <summary style={{ padding: '1.25rem 1.5rem', fontWeight: 600, cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  {q}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6,9 12,15 18,9"/></svg>
                </summary>
                <div style={{ padding: '0 1.5rem 1.25rem' }}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--clr-text-2)', lineHeight: 1.75 }}>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section" id="cta" aria-label="Final call to action" style={{ background: 'var(--clr-bg)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background orbs */}
        <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(99,102,241,0.2),transparent 70%)', top: '50%', left: '50%', transform: 'translate(-60%,-50%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(139,92,246,0.15),transparent 70%)', top: '50%', left: '50%', transform: 'translate(10%,-50%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }}/>
        <div className="container" data-animate="fade-up" style={{ position: 'relative', zIndex: 1, maxWidth: '760px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.25rem' }}>
            Ready to Turn GoHighLevel Into a
            <span style={{ background: 'var(--grad-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Real Business Growth System?</span>
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'var(--clr-text-2)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Join 200+ businesses that have automated their lead generation and follow-up with a custom-built GHL system. Demo first — no risk.
          </p>
          <div className="hp-hero-ctas" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <Link href="#contact" className="btn btn-primary btn-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/></svg>
              Book Free Consultation
            </Link>
            <Link href="#contact" className="btn btn-outline btn-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polygon points="5,3 19,12 5,21"/></svg>
              Request Free Demo
            </Link>
          </div>
          <div className="hp-cta-trust" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--clr-text-3)' }}>
            <span>✓ Demo First</span>
            <span>✓ Pay After Satisfaction</span>
            <span>✓ 50% Launch Discount</span>
            <span>✓ Fast Turnaround</span>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section" id="contact" style={{ background: 'var(--clr-bg-2)' }}>
        <div className="container hp-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          {/* Left: Info */}
          <div data-animate="fade-right">
            <span className="section-eyebrow">Get In Touch</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              Let&apos;s Build Your <span style={{ background: 'var(--grad-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>GHL System</span>
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--clr-text-2)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Book a free consultation, request a demo, or just reach out with questions. I respond within a few hours.
            </p>

            {/* Contact methods */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
              <a href="https://wa.me/8801718020102" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1rem 1.25rem', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontWeight: 600, color: '#25d366', transition: 'all 0.25s', textDecoration: 'none' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.549 4.107 1.512 5.84L.057 23.943l6.265-1.44A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.12 16.4c-.26.73-1.519 1.386-2.087 1.449-.568.063-1.099.252-3.697-.76-3.096-1.215-5.1-4.39-5.254-4.594-.155-.204-1.262-1.677-1.262-3.198 0-1.52.8-2.264 1.083-2.574.283-.31.615-.388.82-.388.205 0 .41.002.59.01.19.01.443-.072.693.53.256.618.869 2.13.946 2.286.077.155.128.337.026.541-.103.204-.154.333-.308.513-.154.18-.324.403-.463.541-.154.154-.314.32-.135.63.18.31.797 1.313 1.71 2.127 1.175 1.048 2.167 1.374 2.478 1.528.31.154.493.129.674-.077.18-.206.77-.9 1.977-1.803z"/></svg>
                Chat on WhatsApp
              </a>
              <a href="mailto:hello@ghlserviceprovider.com" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1rem 1.25rem', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-md)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--clr-primary)', transition: 'all 0.25s', textDecoration: 'none' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                hello@ghlserviceprovider.com
              </a>
            </div>

            {/* Calendar embed placeholder */}
            <div style={{ background: 'var(--clr-surface)', border: '1px dashed var(--clr-border-2)', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--clr-primary)' }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <strong style={{ fontSize: '1rem', fontWeight: 700 }}>Book a Free 30-Min Consultation</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-2)' }}>Select a time that works for you →</p>
              <Link href="#contact" className="btn btn-primary" style={{ marginTop: '0.25rem' }}>Open Calendar →</Link>
            </div>
          </div>

          {/* Right: Form */}
          <div data-animate="fade-left"><ContactForm /></div>
        </div>
      </section>

      {/* Floating buttons handled globally by WhatsAppFloat in layout.tsx */}

    </>
  )
}
