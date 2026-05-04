import type { Metadata } from 'next'
import '@/index.css'

export const metadata: Metadata = {
  title: 'Startup Tycoon',
  description: 'Build your startup empire!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
