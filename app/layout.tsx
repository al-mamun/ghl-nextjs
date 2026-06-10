import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ghlserviceprovider.com'),
  title: {
    default: 'GHL Service Provider | GoHighLevel Expert',
    template: '%s | GHL Service Provider',
  },
  description: 'Expert GoHighLevel service provider for funnels, CRM, AI chatbots, workflows & automation.',
  keywords: ['GoHighLevel expert', 'GHL service provider', 'GHL setup', 'GoHighLevel automation'],
  authors: [{ name: 'GHL Service Provider', url: 'https://ghlserviceprovider.com' }],
  openGraph: {
    type: 'website',
    siteName: 'GHL Service Provider',
    locale: 'en_US',
    images: [{ url: '/assets/images/og-image.jpg', width: 1200, height: 630, alt: 'GHL Service Provider' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: { google: '4beed2728d3984f4' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable + ' ' + spaceGrotesk.variable}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollAnimations />
        <WhatsAppFloat />
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  )
}
