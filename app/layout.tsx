import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Conversational Intelligence & Auto-resolution system',
  description: 'Conversational Intelligence & Auto-resolution system',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
