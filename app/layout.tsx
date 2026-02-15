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
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Lora:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
