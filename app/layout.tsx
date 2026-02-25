import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spilled Palette Studio | Aswathi Bindhu Jawahar',
  description: 'Handcrafted digital paintings that transform your space into a sanctuary of color, calm, and creative energy.',
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
  return (
    <html lang="en">
      <head>
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
