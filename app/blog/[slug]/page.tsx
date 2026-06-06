import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getPostBySlug, getAllPostSlugs } from '@/lib/queries'
import { SITE_URL } from '@/lib/config'
import '@/styles/blog.css'

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt
  return {
    title,
    description,
    openGraph: { title, description, type: 'article', publishedTime: post.publishedAt, url: `${SITE_URL}/blog/${post.slug.current}`, images: [{ url: `${SITE_URL}/api/cover/${post.slug.current}?sq=1`, width: 800, height: 800, alt: title }] },
    alternates: { canonical: `${SITE_URL}/blog/${post.slug.current}` },
  }
}

// Extract h2 headings from Portable Text body for TOC
function extractHeadings(body: any[]) {
  if (!body) return []
  return body
    .filter((b: any) => b.style === 'h2' && b.children?.[0]?.text)
    .map((b: any) => ({
      text: b.children.map((c: any) => c.text).join(''),
      id: b.children.map((c: any) => c.text).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }))
}

const ptComponents = {
  types: {
    callout: ({ value }: any) => (
      <div className={`post-callout post-callout--${value.type || 'tip'}`}>
        <div>{value.content}</div>
      </div>
    ),
    codeBlock: ({ value }: any) => (
      <div className="post-code">
        <code>{value.code}</code>
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
    code: ({ children }: any) => <code>{children}</code>,
    link: ({ value, children }: any) => (
      <a href={value.href} target={value.href?.startsWith('http') ? '_blank' : undefined} rel={value.href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    ),
  },
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const headings = extractHeadings(post.body)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author || 'GHL Service Provider' },
    datePublished: post.publishedAt,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug.current}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      <article className="post-layout" itemScope itemType="https://schema.org/BlogPosting">

        {/* ── Post Header ── */}
        <header className="post-header">
          <div className="container post-header__container">
            <div className="breadcrumb">
              <Link href="/">Home</Link><span>→</span>
              <Link href="/blog">Blog</Link><span>→</span>
              <span>{post.category}</span>
            </div>
            <div className="post-category">{post.category}</div>
            <h1 className="post-title" itemProp="headline">{post.title}</h1>
            <div className="post-meta">
              <span itemProp="author">By {post.author || 'GHL Service Provider'}</span>
              <span>·</span>
              <time dateTime={post.publishedAt} itemProp="datePublished">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <p className="post-intro" itemProp="description">{post.excerpt}</p>
          </div>
        </header>

        {/* ── Post Content ── */}
        <div className="post-content">
          <div className="container post-content__container">

            {/* Body */}
            <div className="post-body">

              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="post-toc">
                  <strong>In This Guide</strong>
                  <ol>
                    {headings.map((h, i) => (
                      <li key={i}><a href={`#${h.id}`}>{h.text}</a></li>
                    ))}
                  </ol>
                </div>
              )}

              {post.body
                ? <PortableText value={post.body} components={ptComponents}/>
                : <p style={{ color: 'var(--clr-text-2)' }}>Content coming soon.</p>
              }

              {/* Bottom CTA */}
              <hr className="post-divider"/>
              <div className="post-cta">
                <h3>Want This Built for Your Business?</h3>
                <p>Book a free consultation and I&apos;ll show you exactly what we&apos;d build for you — demo first, pay after satisfaction.</p>
                <Link href="/#contact" className="btn btn-primary btn-xl">Book Free Consultation →</Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="post-sidebar">
              <div className="sidebar-card sidebar-card--highlight">
                <h3>Get Your GHL System Built</h3>
                <p>Skip the learning curve. I&apos;ll build your complete GoHighLevel system — CRM, pipelines, automations and more.</p>
                <Link href="/#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Book Free Demo</Link>
                <p style={{ fontSize: '0.78rem', color: 'var(--clr-text-3)', textAlign: 'center', marginTop: '0.625rem', marginBottom: 0 }}>Demo first. Pay after satisfaction.</p>
              </div>
              <div className="sidebar-card">
                <h3>Related Posts</h3>
                <ul className="sidebar-links">
                  {[
                    { href: '/blog/ghl-ai-chatbot-setup', label: 'GoHighLevel AI Chatbots: Build One That Converts' },
                    { href: '/blog/missed-call-text-back', label: 'Missed Call Text Back Setup Guide' },
                    { href: '/blog/why-your-business-needs-automation', label: 'Why Your Business Needs Automation Now' },
                  ].map(l => (
                    <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="sidebar-card">
                <h3>Case Studies</h3>
                <ul className="sidebar-links">
                  {[
                    { href: '/case-studies/local-business-lead-generation', label: 'Local Business: 2x Close Rate' },
                    { href: '/case-studies/cleaning-company-automation', label: 'Cleaning Company: Full Automation' },
                    { href: '/case-studies/contractor-lead-generation', label: 'Contractor: 68% More Jobs' },
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
