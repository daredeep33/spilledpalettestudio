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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Open+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-[#4a4a4a] leading-relaxed">
        {children}
      </body>
    </html>
  )
}
