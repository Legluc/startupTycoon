import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryProvider } from '@/lib/QueryProvider'
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
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      <html lang="fr">
        <body>
          <QueryProvider>{children}</QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
