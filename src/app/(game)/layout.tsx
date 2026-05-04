'use client'

import { GameProvider } from '@/lib/GameContext'
import { GameCounter } from '@/components/GameCounter'
import { AppHeader } from '@/components/AppHeader'
import { AppFooter } from '@/components/AppFooter'

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GameProvider>
      <div className="app-shell">
        <AppHeader />
        <GameCounter />
        <main>{children}</main>
        <AppFooter />
      </div>
    </GameProvider>
  )
}
