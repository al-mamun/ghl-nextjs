# GHL Service Provider — Next.js + Sanity

## Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io
- **Hosting:** Vercel (free)
- **SEO:** Built-in Next.js metadata + next-sitemap

## Setup (5 Steps)

### 1. Install Dependencies
```bash
cd nextjs-app
npm install
```

### 2. Create Sanity Project
1. Go to https://sanity.io/manage
2. Create new project → name it "GHL Service Provider"
3. Copy your **Project ID**

### 3. Configure Environment
```bash
cp .env.local.example .env.local
```
Edit `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
NEXT_PUBLIC_SITE_URL=https://ghlserviceprovider.com
SANITY_REVALIDATE_SECRET=any_random_string_here
```

### 4. Run Development Server
```bash
npm run dev
```
- Site: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio (add studio route — see below)

### 5. Deploy to Vercel
```bash
npx vercel
```
Add all `.env.local` variables in Vercel dashboard → Settings → Environment Variables.

---

## Adding Sanity Studio Route
Create `app/studio/[[...tool]]/page.tsx`:
```tsx
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
export default function StudioPage() {
  return <NextStudio config={config} />
}
```

Then access your CMS at: `yourdomain.com/studio`

---

## Content Management

After setup, go to `/studio` and:
1. **Create Blog Posts** — fill title, slug, category, excerpt, body
2. **Create Case Studies** — fill title, industry, results metrics, body
3. Content publishes instantly via webhook revalidation

---

## Webhook Setup (Auto-rebuild on publish)

In Sanity dashboard → API → Webhooks → Add:
- URL: `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`
- Trigger: On Create + Update + Delete
- Filter: `_type == "post" || _type == "caseStudy"`

---

## File Structure
```
nextjs-app/
├── app/
│   ├── layout.tsx          Root layout (Header + Footer)
│   ├── page.tsx            Home page
│   ├── blog/
│   │   ├── page.tsx        Blog listing
│   │   └── [slug]/page.tsx Blog post
│   ├── case-studies/
│   │   ├── page.tsx        Case studies listing
│   │   └── [slug]/page.tsx Case study
│   └── api/revalidate/     Webhook endpoint
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   ├── sanity.ts           Sanity client
│   └── queries.ts          GROQ queries + TypeScript types
├── sanity/schemas/
│   ├── post.ts             Blog post schema
│   ├── caseStudy.ts        Case study schema
│   └── index.ts
├── styles/globals.css      Global styles (matches existing site)
├── sanity.config.ts        Sanity studio config
├── next.config.js
└── next-sitemap.config.js
```
# ghl-nextjs
