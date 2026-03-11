import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spilled Palette Studio | Aswathi Bindhu Jawahar',
  description: 'Handcrafted digital paintings that transform your space into a sanctuary of color, calm, and creative energy. Browse 100+ original artworks.',
  keywords: ['digital art', 'original artwork', 'handcrafted paintings', 'art for home', 'interior design art', 'botanical art', 'abstract art', 'Oman art', 'UAE art'],
  authors: [{ name: 'Aswathi Bindhu Jawahar' }],
  openGraph: {
    title: 'Spilled Palette Studio | Original Digital Art',
    description: 'Handcrafted digital paintings that transform your space into a sanctuary of color, calm, and creative energy.',
    url: 'https://spilledpalettestudio.com',
    siteName: 'Spilled Palette Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spilled Palette Studio | Original Digital Art',
    description: 'Handcrafted digital paintings that transform your space into a sanctuary of color, calm, and creative energy.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

import { Cormorant_Garamond, Open_Sans } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-opensans',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    "name": "Spilled Palette Studio",
    "description": "Handcrafted digital paintings that transform your space into a sanctuary of color, calm, and creative energy.",
    "url": "https://spilledpalettestudio.com",
    "artist": {
      "@type": "Person",
      "name": "Aswathi Bindhu Jawahar",
      "url": "https://spilledpalettestudio.com/#about"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "OM"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@spilledpalettestudio.com"
    },
    "sameAs": [
      "https://www.instagram.com/spilledpalettestudio"
    ],
    "priceRange": "$$"
  }

  return (
    <html lang="en" className={`${cormorant.variable} ${openSans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-[#4a4a4a] leading-relaxed flex flex-col min-h-screen">
        <Navigation />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
