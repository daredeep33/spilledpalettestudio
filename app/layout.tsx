import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spilled Palette Studio | Aswathi Bindhu Jawahar',
  description: 'Digital paintings that breathe life into your space.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
