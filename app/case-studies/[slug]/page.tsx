import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getCaseStudyBySlug, getAllCaseStudySlugs } from '@/lib/queries'
import { SITE_URL } from '@/lib/config'
import '@/styles/blog.css'

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = await getCaseStudyBySlug(params.slug)
  if (!cs) return {}
  const title = cs.seo?.metaTitle || cs.title
  const description = cs.seo?.metaDescription || cs.excerpt
  return {
    title,
    description,
    openGraph: { title, description, type: 'article', url: `${SITE_URL}/case-studies/${cs.slug.current}`, images: [{ url: `${SITE_URL}/api/cover/${cs.slug.current}?sq=1`, width: 800, height: 800, alt: title }] },
    alternates: { canonical: `${SITE_URL}/case-studies/${cs.slug.current}` },
  }
}

const ptComponents = {
  types: {
    resultsTable: ({ value }: any) => (
      <div className="cs-results-table">
        {value.rows?.map((row: any, i: number) => (
          <div key={i} className="cs-row">
            <span className="cs-metric">{row.metric}</span>
            <span className="cs-before">{row.before}</span>
            <span className="cs-arrow">→</span>
            <span className="cs-after">{row.after}</span>
          </div>
        ))}
      </div>
    ),
    callout: ({ value }: any) => (
      <div className={`post-callout post-callout--${value.type || 'tip'}`}>
        <div>{value.content}</div>
      </div>
    ),
  },
  block: {
    h2: ({ children, value }: any) => {
      const text = value.children?.map((c: any) => c.text).join('') || ''
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return <h2 id={id}>{children}</h2>
    },
    h3: ({ children }: any) => <h3>{children}</h3>,
    normal: ({ children }: any) => <p>{children}</p>,
    blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul>{children}</ul>,
    number: ({ children }: any) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => (
      <a href={value.href} target={value.href?.startsWith('http') ? '_blank' : undefined} rel={value.href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    ),
  },
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = await getCaseStudyBySlug(params.slug)
  if (!cs) notFound()

  const colCount = Math.min(cs.results?.length || 3, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    description: cs.excerpt,
    author: { '@type': 'Person', name: 'GHL Service Provider' },
    datePublished: cs.publishedAt,
    mainEntityOfPage: `${SITE_URL}/case-studies/${cs.slug.current}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      <article className="post-layout" itemScope itemType="https://schema.org/Article">

        {/* ── Header ── */}
        <header className="post-header">
          <div className="container post-header__container">
            <div className="breadcrumb">
              <Link href="/">Home</Link><span>→</span>
              <Link href="/case-studies">Case Studies</Link><span>→</span>
              <span>{cs.industry}</span>
            </div>
            <div className="post-category">{cs.industry} · Case Study</div>
            <h1 className="post-title" itemProp="headline">{cs.title}</h1>
            <div className="post-meta">
              <span>By GHL Service Provider</span>
              <span>·</span>
              <time dateTime={cs.publishedAt} itemProp="datePublished">
                {new Date(cs.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
            </div>
            <p className="post-intro" itemProp="description">{cs.excerpt}</p>

            {/* Results banner */}
            {cs.results && cs.results.length > 0 && (
              <div className="cs-results-banner" style={{ gridTemplateColumns: `repeat(${colCount},1fr)` }}>
                {cs.results.map((r, i) => (
                  <div key={i} className="cs-result-item">
                    <span className="cs-big-number gradient-text">{r.value}</span>
                    <span className="cs-big-label">{r.label}</span>
                    {r.sub && <span className="cs-big-sub">{r.sub}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* ── Content ── */}
        <div className="post-content">
          <div className="container post-content__container">

            <div className="post-body">
              {cs.body
                ? <PortableText value={cs.body} components={ptComponents}/>
                : <p style={{ color: 'var(--clr-text-2)' }}>Full case study coming soon.</p>
              }

              <hr className="post-divider"/>
              <div className="post-cta">
                <h3>Want Similar Results for Your Business?</h3>
                <p>Book a free consultation. I&apos;ll show you exactly what we&apos;d build — demo first, no obligation.</p>
                <Link href="/#contact" className="btn btn-primary btn-xl">Book Free Consultation →</Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="post-sidebar">
              <div className="sidebar-card sidebar-card--highlight">
                <h3>Get This Built for You</h3>
                <p>Complete GHL system built for your business — all automations, CRM and integrations included.</p>
                <Link href="/#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Book Free Demo</Link>
                <p style={{ fontSize: '0.78rem', color: 'var(--clr-text-3)', textAlign: 'center', marginTop: '0.625rem', marginBottom: 0 }}>Demo first. Pay after satisfaction.</p>
              </div>
              <div className="sidebar-card">
                <h3>More Case Studies</h3>
                <ul className="sidebar-links">
                  {[
                    { href: '/case-studies/local-business-lead-generation', label: 'Local Business: 2x Close Rate' },
                    { href: '/case-studies/cleaning-company-automation', label: 'Cleaning Co: 15hrs Saved/Week' },
                    { href: '/case-studies/gym-fitness-studio', label: 'Gym: 40 Trials in 30 Days' },
                    { href: '/case-studies/contractor-lead-generation', label: 'Contractor: 68% More Jobs' },
                  ].map(l => (
                    <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="sidebar-card">
                <h3>From the Blog</h3>
                <ul className="sidebar-links">
                  {[
                    { href: '/blog/ghl-complete-setup-guide', label: 'Complete GHL Setup Guide 2026' },
                    { href: '/blog/ghl-ai-chatbot-setup', label: 'Build an AI Chatbot That Converts' },
                    { href: '/blog/why-your-business-needs-automation', label: 'Why Your Business Needs Automation' },
                  ].map(l => (
                    <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            </aside>

          </div>
        </div>
      </article>
    </>
  )
}
