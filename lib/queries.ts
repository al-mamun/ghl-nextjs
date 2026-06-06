import { sanityClient } from './sanity'

// ── Types ──────────────────────────────────────────────
export interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
  body: any[]
  seo?: { metaTitle?: string; metaDescription?: string }
  author?: string
}

export interface CaseStudy {
  _id: string
  title: string
  slug: { current: string }
  industry: string
  excerpt: string
  publishedAt: string
  results: { label: string; value: string; sub?: string }[]
  body: any[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

// Exclude drafts explicitly — works regardless of CDN or token perspective
const NOT_DRAFT = '&& !(_id in path("drafts.**"))'

// ── Blog Queries ───────────────────────────────────────
export const POSTS_PER_PAGE = 9

export async function getPaginatedPosts(
  page = 1,
  category?: string
): Promise<{ posts: Post[]; total: number }> {
  const catFilter = category ? ` && category == "${category}"` : ''
  const baseFilter = `_type == "post" ${NOT_DRAFT}${catFilter}`

  // When filtering by category: simple 9-per-page (no featured logic)
  // No filter (page 1): 10 posts (1 featured + 9 grid)
  const hasCategory = !!category
  const perPage = hasCategory ? POSTS_PER_PAGE : (page === 1 ? 10 : POSTS_PER_PAGE)
  const start = hasCategory
    ? (page - 1) * POSTS_PER_PAGE
    : page === 1 ? 0 : (page - 1) * POSTS_PER_PAGE + 1
  const end = start + perPage

  try {
    const [posts, total] = await Promise.all([
      sanityClient.fetch<Post[]>(`
        *[${baseFilter}] | order(publishedAt desc) [${start}...${end}] {
          _id, title, slug, excerpt, category, readTime, publishedAt
        }
      `),
      sanityClient.fetch<number>(`count(*[${baseFilter}])`),
    ])
    return { posts: posts ?? [], total: total ?? 0 }
  } catch (err) {
    console.error('[Sanity] getPaginatedPosts error:', err)
    return { posts: [], total: 0 }
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await sanityClient.fetch<Post[]>(`
      *[_type == "post" ${NOT_DRAFT}] | order(publishedAt desc) {
        _id, title, slug, excerpt, category, readTime, publishedAt
      }
    `)
    return posts ?? []
  } catch (err) {
    console.error('[Sanity] getAllPosts error:', err)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await sanityClient.fetch<Post>(`
      *[_type == "post" ${NOT_DRAFT} && slug.current == $slug][0] {
        _id, title, slug, excerpt, category, readTime, publishedAt,
        body, author,
        seo { metaTitle, metaDescription }
      }
    `, { slug })
  } catch (err) {
    console.error('[Sanity] getPostBySlug error:', err)
    return null
  }
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  try {
    return await sanityClient.fetch(`
      *[_type == "post" ${NOT_DRAFT}] { "slug": slug.current }
    `)
  } catch {
    return []
  }
}

// ── Case Study Queries ─────────────────────────────────
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const studies = await sanityClient.fetch<CaseStudy[]>(`
      *[_type == "caseStudy" ${NOT_DRAFT}] | order(publishedAt desc) {
        _id, title, slug, industry, excerpt, publishedAt,
        results[] { label, value, sub }
      }
    `)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Sanity] case studies fetched:', studies?.length ?? 0)
    }
    return studies ?? []
  } catch (err) {
    console.error('[Sanity] getAllCaseStudies error:', err)
    return []
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    return await sanityClient.fetch<CaseStudy>(`
      *[_type == "caseStudy" ${NOT_DRAFT} && slug.current == $slug][0] {
        _id, title, slug, industry, excerpt, publishedAt,
        results[] { label, value, sub },
        body,
        seo { metaTitle, metaDescription }
      }
    `, { slug })
  } catch (err) {
    console.error('[Sanity] getCaseStudyBySlug error:', err)
    return null
  }
}

export async function getAllCaseStudySlugs(): Promise<{ slug: string }[]> {
  try {
    return await sanityClient.fetch(`
      *[_type == "caseStudy" ${NOT_DRAFT}] { "slug": slug.current }
    `)
  } catch {
    return []
  }
}
