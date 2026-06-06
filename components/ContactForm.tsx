'use client'
import { useState } from 'react'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xbdbeldn'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const nameEl = form.querySelector<HTMLInputElement>('#name')
    const emailEl = form.querySelector<HTMLInputElement>('#email')

    if (!nameEl?.value.trim()) { setMsg('Please enter your name.'); return }
    if (!emailEl?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) { setMsg('Please enter a valid email.'); return }

    setStatus('loading'); setMsg('')
    try {
      const fd = new FormData(form)
      fd.set('_subject', 'New GHL Service Provider Inquiry')
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, { method: 'POST', headers: { Accept: 'application/json' }, body: fd })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setMsg('Something went wrong. Please try via WhatsApp.')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-xl)', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>Message Sent!</h3>
        <p style={{ color: 'var(--clr-text-2)' }}>Thanks for reaching out! I&apos;ll review your details and get back to you within a few hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-xl)', padding: '2.25rem' }} noValidate>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.75rem' }}>Send a Message</h3>

      {[
        { id: 'name', label: 'Your Name *', type: 'text', placeholder: 'John Smith' },
        { id: 'email', label: 'Email Address *', type: 'email', placeholder: 'john@company.com' },
        { id: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+880 1718 020102' },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id} style={{ marginBottom: '1.25rem' }}>
          <label htmlFor={id} style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--clr-text-2)', marginBottom: '0.5rem' }}>{label}</label>
          <input id={id} name={id} type={type} placeholder={placeholder} style={{ width: '100%', background: 'var(--clr-bg-3)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', fontSize: '0.9375rem', color: 'var(--clr-text)', outline: 'none', fontFamily: 'inherit' }}/>
        </div>
      ))}

      <div style={{ marginBottom: '1.25rem' }}>
        <label htmlFor="service" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--clr-text-2)', marginBottom: '0.5rem' }}>Service You Need</label>
        <select id="service" name="service" style={{ width: '100%', background: 'var(--clr-bg-3)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', fontSize: '0.9375rem', color: 'var(--clr-text)', outline: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>
          <option value="">Select a service...</option>
          {['Basic GHL Setup','Growth Automation Setup','Complete GHL System','Funnel / Landing Page','AI Chatbot Setup','AI Voice Agent','Workflow Automation','Monthly Support','Other / Not Sure'].map(o => <option key={o} value={o.toLowerCase().replace(/ /g,'-')}>{o}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label htmlFor="message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--clr-text-2)', marginBottom: '0.5rem' }}>Tell Me About Your Project</label>
        <textarea id="message" name="message" rows={4} placeholder="What does your business do? What problem are you trying to solve?" style={{ width: '100%', background: 'var(--clr-bg-3)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', fontSize: '0.9375rem', color: 'var(--clr-text)', outline: 'none', fontFamily: 'inherit', resize: 'vertical', minHeight: '100px' }}/>
      </div>

      {msg && <p style={{ fontSize: '0.875rem', color: 'var(--clr-red)', marginBottom: '0.75rem' }}>{msg}</p>}

      <button type="submit" disabled={status === 'loading'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}>
        {status === 'loading' ? 'Sending...' : 'Send Message & Request Demo'}
      </button>

      <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--clr-text-3)', marginTop: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        Your information is 100% secure. No spam, ever.
      </p>
    </form>
  )
}