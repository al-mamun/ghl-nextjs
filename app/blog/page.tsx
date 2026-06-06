import type { Metadata } from 'next'
import Link from 'next/link'
import { getPaginatedPosts, POSTS_PER_PAGE, type Post } from '@/lib/queries'
import { SITE_URL } from '@/lib/config'

export const revalidate = 3600

const CATEGORY_COLORS: Record<string, string> = {
  'Setup Guide':     'rgba(99,102,241,0.9)',
  'AI Automation':   'rgba(6,182,212,0.85)',
  'Lead Recovery':   'rgba(16,185,129,0.85)',
  'Business Growth': 'rgba(139,92,246,0.85)',
  'Reputation':      'rgba(16,185,129,0.85)',
  'Troubleshooting': 'rgba(99,102,241,0.85)',
  'Integrations':    'rgba(6,182,212,0.85)',
  'Platform Review': 'rgba(245,158,11,0.85)',
  'Automation':      'rgba(139,92,246,0.85)',
  'CRM & Pipeline':  'rgba(99,102,241,0.85)',
  'Lead Generation': 'rgba(16,185,129,0.85)',
  'AI Chatbots':     'rgba(6,182,212,0.85)',
  'Funnels & Landing Pages': 'rgba(245,158,11,0.85)',
  'Industry Guides': 'rgba(6,182,212,0.85)',
  'Authority':       'rgba(99,102,241,0.85)',
}

const POST_GRADIENTS = [
  'linear-gradient(135deg,#1e1b4b,#312e81,#4338ca)',
  'linear-gradient(135deg,#0f172a,#1e3a5f,#1d4ed8)',
  'linear-gradient(135deg,#042f2e,#065f46,#059669)',
  'linear-gradient(135deg,#1c1033,#3b0764,#7c3aed)',
  'linear-gradient(135deg,#0c1a2e,#14532d,#16a34a)',
  'linear-gradient(135deg,#0c1a3a,#1e3a5f,#0369a1)',
  'linear-gradient(135deg,#1a0a2e,#4a044e,#7e22ce)',
  'linear-gradient(135deg,#0a0a1a,#1a1a3a,#4338ca)',
]

// Dynamic per-post SVG — pass category as param so no Sanity fetch needed in the route
function getPhotoUrl(category: string, slug: string, square = false): string {
  return `/api/cover/${slug}?c=${encodeURIComponent(category)}${square ? '&sq=1' : ''}`
}

const ALL_CATEGORIES = [
  'All Posts',
  'Lead Generation',
  'AI Automation',
  'Automation',
  'CRM & Pipeline',
  'Setup Guide',
  'Business Growth',
  'Reputation',
  'Authority',
  'Troubleshooting',
  'Funnels & Landing Pages',
  'Industry Guides',
  'Integrations',
  'Platform Review',
  'Lead Recovery',
]

export async function generateMetadata({ searchParams }: { searchParams: { page?: string; category?: string } }): Promise<Metadata> {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10))
  const category = searchParams.category || ''
  const base = 'Blog — GoHighLevel Tips, Guides & Automation Insights'
  const title = category
    ? `${category} Articles | GHL Service Provider`
    : page > 1 ? `Blog — Page ${page} | GoHighLevel Tips & Automation Insights` : base
  const canonical = category
    ? `${SITE_URL}/blog?category=${encodeURIComponent(category)}`
    : page > 1 ? `${SITE_URL}/blog?page=${page}` : `${SITE_URL}/blog`
  return {
    title,
    description: 'Expert GoHighLevel tips, setup guides, automation strategies and business growth insights from a certified GHL specialist.',
    openGraph: { url: canonical },
    alternates: { canonical },
  }
}

function Pagination({ currentPage, totalPages, category }: { currentPage: number; totalPages: number; category?: string }) {
  if (totalPages <= 1) return null

  function pageUrl(pg: number) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (pg > 1) params.set('page', String(pg))
    const qs = params.toString()
    return qs ? `/blog?${qs}` : '/blog'
  }

  // Build page number list with ellipsis
  const pages: (number | 'dot')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== 'dot') {
      pages.push('dot')
    }
  }

  return (
    <nav className="pagination" aria-label="Blog pagination" style={{ marginTop: '3rem', marginBottom: '1rem' }}>
      <Link
        href={currentPage > 1 ? pageUrl(currentPage - 1) : '#'}
        className={`page-btn${currentPage <= 1 ? ' disabled' : ''}`}
        aria-disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        ← Prev
      </Link>

      {pages.map((pg, i) =>
        pg === 'dot' ? (
          <span key={`dot-${i}`} className="page-dots">…</span>
        ) : (
          <Link
            key={pg}
            href={pageUrl(pg)}
            className={`page-btn${pg === currentPage ? ' active' : ''}`}
            aria-current={pg === currentPage ? 'page' : undefined}
          >
            {pg}
          </Link>
        )
      )}

      <Link
        href={currentPage < totalPages ? pageUrl(currentPage + 1) : '#'}
        className={`page-btn${currentPage >= totalPages ? ' disabled' : ''}`}
        aria-disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        Next →
      </Link>
    </nav>
  )
}

export default async function BlogPage({ searchParams }: { searchParams: { page?: string; category?: string } }) {
  const currentPage = Math.max(1, parseInt(searchParams.page || '1', 10))
  const activeCategory = searchParams.category || ''
  const { posts, total } = await getPaginatedPosts(currentPage, activeCategory || undefined)

  // With a category filter: simple 9-per-page grid, no featured post
  // Without filter on page 1: featured + 9 grid
  const hasCategory = !!activeCategory
  const totalPages = hasCategory
    ? Math.ceil(total / POSTS_PER_PAGE)
    : total <= 10 ? 1 : 1 + Math.ceil((total - 10) / POSTS_PER_PAGE)

  const featured = !hasCategory && currentPage === 1 ? posts[0] : null
  const gridPosts = !hasCategory && currentPage === 1 ? posts.slice(1) : posts

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', padding: '5rem 0 4rem', background: 'var(--clr-bg)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(99,102,241,0.3),transparent 70%)', top: '-200px', left: '-100px', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4 }}/>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,black,transparent)' }}/>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8125rem', color: 'var(--clr-text-2)', background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', padding: '0.4em 1em', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--clr-green)', borderRadius: '50%', animation: 'pulse 2s infinite' }}/>
            {activeCategory ? `${activeCategory} — ${total} articles` : `Knowledge Base & Insights — ${total} Articles`}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
            GoHighLevel Tips, <span className="gradient-text">Guides &amp; Strategies</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--clr-text-2)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Practical, no-fluff advice on GoHighLevel setup, automation and business growth — written by someone who builds these systems every day.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {ALL_CATEGORIES.map(cat => {
              const isAll = cat === 'All Posts'
              const isActive = isAll ? !activeCategory : activeCategory === cat
              const href = isAll ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`
              return (
                <Link key={cat} href={href} style={{ fontSize: '0.8125rem', fontWeight: 600, padding: '0.4em 1em', borderRadius: 'var(--radius-full)', border: `1px solid ${isActive ? 'transparent' : 'var(--clr-border)'}`, color: isActive ? '#fff' : 'var(--clr-text-3)', background: isActive ? 'var(--grad-primary)' : 'transparent', textDecoration: 'none', transition: 'all 0.2s', boxShadow: isActive ? '0 2px 12px rgba(99,102,241,0.35)' : 'none' }}>
                  {cat}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Post (page 1 only) ── */}
      {featured && (
        <section style={{ padding: '3rem 0 0', background: 'var(--clr-bg)' }}>
          <div className="container">
            <Link href={`/blog/${featured.slug.current}`} className="card-hover-glow featured-card" style={{ display: 'grid', gridTemplateColumns: '460px 1fr', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--clr-surface)', textDecoration: 'none', minHeight: '460px' }}>
              <div className="featured-card-image" style={{ position: 'relative', width: '460px', height: '460px', flexShrink: 0, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getPhotoUrl(featured.category || 'Automation', featured.slug.current, true)} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', position: 'absolute', inset: 0 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,transparent 50%,rgba(6,8,18,0.55) 100%)' }}/>
                <span style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'var(--grad-primary)', color: '#fff', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.35em 0.9em', borderRadius: 'var(--radius-full)', zIndex: 1 }}>⭐ Featured</span>
              </div>
              <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--clr-text-3)', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--clr-primary)', fontWeight: 600 }}>{featured.category}</span>
                  <span>·</span>
                  <time>{new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '1rem', color: 'var(--clr-text)' }}>{featured.title}</h2>
                <p style={{ fontSize: '1rem', color: 'var(--clr-text-2)', lineHeight: 1.8, marginBottom: '2rem' }}>{featured.excerpt}</p>
                <span className="btn btn-primary" style={{ width: 'fit-content' }}>Read Article →</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Posts Grid ── */}
      <section style={{ padding: '3rem 0 5rem', background: 'var(--clr-bg)' }}>
        <div className="container">

          {posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--clr-surface)', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--clr-border)' }}>
              <p style={{ fontSize: '1rem', color: 'var(--clr-text-2)', marginBottom: '1rem' }}>No posts found. Run the seed script:</p>
              <code style={{ background: 'var(--clr-bg-3)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', color: 'var(--clr-cyan)' }}>node scripts/seed.mjs</code>
            </div>
          )}

          <div className="blog-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
            {gridPosts.map((post: Post, i: number) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className="card-hover" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: POST_GRADIENTS[i % POST_GRADIENTS.length] }}>
                  {/* Auto-generated OG image as thumbnail */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getPhotoUrl(post.category || 'Automation', post.slug.current)}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.78rem', color: 'var(--clr-text-3)', marginBottom: '0.625rem' }}>
                    <time>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                    <span>·</span><span>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.625rem', color: 'var(--clr-text)', flex: 1 }}>{post.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--clr-text-2)', lineHeight: 1.65, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: 'auto' }}>Read →</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} category={activeCategory || undefined} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '6rem 0', background: 'var(--clr-bg-2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse,rgba(99,102,241,0.12),transparent 70%)', pointerEvents: 'none' }}/>
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px', position: 'relative', zIndex: 1 }}>
          <span className="section-eyebrow">Ready to Grow?</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 800, margin: '0.75rem 0 1.25rem' }}>Stop Reading. Start Automating.</h2>
          <p style={{ fontSize: '1.0625rem', color: 'var(--clr-text-2)', marginBottom: '2.5rem', lineHeight: 1.75 }}>Everything in this blog — I build it for businesses like yours. Book a free consultation and see exactly what your system would look like before you pay a cent.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <Link href="/#contact" className="btn btn-primary btn-xl">Book Free Consultation</Link>
            <Link href="/case-studies" className="btn btn-outline btn-xl">See Real Results →</Link>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--clr-text-3)' }}>
            <span>✓ Demo First</span><span>✓ Pay After Satisfaction</span><span>✓ 50% Launch Offer</span>
          </div>
        </div>
      </section>
    </>
  )
}
     