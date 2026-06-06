import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/queries'

// Curated Unsplash photo IDs relevant to each category
// Multiple per category so posts vary — slug hash picks one consistently
const CATEGORY_PHOTOS: Record<string, string[]> = {
  'Troubleshooting': [
    'Sk6TJoFEIBo', // laptop with code/error
    'mcSDtbWXUZU', // person fixing computer
    '1lDpAXzP9Hg', // code on screen
    'xkBaqlcqeb4', // debugging screen
    'CVvFVQ_-oUg', // technical work
  ],
  'AI Automation': [
    'IgUR1iX0mqM', // digital AI abstract
    'OZp_vSvgVeI', // futuristic AI
    'LJ9KY8pIH3E', // robot/machine learning
    'rFKUFzjPYiQ', // neural network
    'zwd435-ewb4', // AI interface
  ],
  'Lead Generation': [
    'Nt7z5FKkDuo', // business meeting
    'mfB1B1s4sMc', // marketing strategy
    'GinzpXaLqWk', // sales team
    'Q59HmzK38eQ', // growth chart
    'wD1LRb9OeEo', // funnel/leads
  ],
  'CRM & Pipeline': [
    'NbtIDoFKGO8', // dashboard on screen
    'ICTjWYzpoc0', // CRM interface
    '0LBLvMpnYT0', // business software
    'JKUTrJ4vK00', // sales pipeline
    '5fNmWej4tAA', // data management
  ],
  'Automation': [
    'jLwVAUtLOAQ', // automation/tech
    'Y7d265_7i08', // workflow digital
    '6Ci3WgIkSis', // laptop automation
    'G1N9kDHqBrQ', // robotic process
    'n6C-mzRNS5o', // digital automation
  ],
  'Funnels & Landing Pages': [
    'HgoKvtKpyHA', // website design
    'qI7USKbZY_A', // landing page laptop
    'Q1p7bh3SHj8', // web design
    'iDCtsz-INHI', // conversion design
    'Lks7vei-eAg', // funnel concept
  ],
  'Industry Guides': [
    'bJhT_8nbUA0', // business guide/book
    'f9YA8VFJfNs', // professional reading
    'WE_Kv_ZB1l0', // industry knowledge
    'eMP4sYPJ9x0', // guide/manual
    'o0RZziTd6YQ', // business handbook
  ],
  'Setup Guide': [
    'vGQ49l9I4EE', // software setup
    'KE0nC8-58MQ', // configuration
    'IJsbAA4ZRGE', // tech setup laptop
    'aQYgUYwnCsM', // onboarding
    'hGV2TfOh0ns', // setup process
  ],
  'Reputation': [
    'WpnoGiMd5lI', // 5 star review
    'JVD3XPqjLaQ', // customer satisfaction
    'kixfBEdyp64', // reviews/rating
    'f58CXKWX35w', // trust/reputation
    '1SAnrIxw5OY', // brand reputation
  ],
  'Business Growth': [
    'GFpwfQV-A3', // growth chart
    'nApaSgkzaxg', // business scaling
    'kn-UmDZQDjM', // team growth
    'bGdiuIyN3Rs', // revenue growth
    'yktK2qaiVHI', // business success
  ],
  'Authority': [
    'ZVkDLrXGMdw', // expertise/authority
    'bMMnSTUfGXE', // thought leadership
    'sBKLiRiunvM', // professional authority
    'qDY9ahp0Mto', // expert speaking
    'ILip77SbmOE', // business expert
  ],
}

// Simple deterministic hash of slug to pick a consistent photo per post
function hashSlug(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) {
    h = ((h << 5) - h + slug.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

const DEFAULT_PHOTOS = [
  'NbtIDoFKGO8',
  'ICTjWYzpoc0',
  'jLwVAUtLOAQ',
  'Nt7z5FKkDuo',
  'Q59HmzK38eQ',
]

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug).catch(() => null)
  const category = post?.category || ''

  const pool = CATEGORY_PHOTOS[category] || DEFAULT_PHOTOS
  const photoId = pool[hashSlug(params.slug) % pool.length]

  // Redirect to Unsplash CDN — high quality, fast, free
  const url = `https://images.unsplash.com/photo-${photoId}?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80`

  return NextResponse.redirect(url, {
    headers: {
      'Cache-Control': 'public, max-age=2592000', // cache 30 days
    },
  })
}
