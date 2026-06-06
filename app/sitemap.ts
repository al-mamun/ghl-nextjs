import type { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllCaseStudySlugs } from '@/lib/queries'
import { SITE_URL } from '@/lib/config'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, csSlugs] = await Promise.all([
    getAllPostSlugs(),
    getAllCaseStudySlugs(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = postSlugs.map(({ slug }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const caseStudyRoutes: MetadataRoute.Sitemap = csSlugs.map(({ slug }) => ({
    url: `${SITE_URL}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes]
}
