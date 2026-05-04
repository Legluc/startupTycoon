'use client'

import { memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const AppHeader = memo(function AppHeader() {
  const pathname = usePathname()

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        Startup Tycoon
      </Link>
      <nav className="main-nav" aria-label="Navigation principale">
        <Link href="/" className={pathname === '/' ? 'active' : undefined}>
          Jeu
        </Link>
        <Link
          href="/shop"
          className={pathname === '/shop' ? 'active' : undefined}
        >
          Boutique
        </Link>
        <Link
          href="/stats"
          className={pathname === '/stats' ? 'active' : undefined}
        >
          Stats
        </Link>
        <Link
          href="/settings"
          className={pathname === '/settings' ? 'active' : undefined}
        >
          Parametres
        </Link>
      </nav>
    </header>
  )
})
