'use client'

import { memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs'

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
        <Link
          href="/leaderboard"
          className={pathname === '/leaderboard' ? 'active' : undefined}
        >
          Leaderboard
        </Link>
      </nav>
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          alignItems: 'center',
          marginLeft: 'auto',
        }}
      >
        <Show when="signed-out">
          <SignInButton
            mode="modal"
            forceRedirectUrl="/"
          >
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontWeight: 600,
                padding: '0.4rem 0.8rem',
                borderRadius: '999px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(20, 99, 86, 0.12)'
                e.currentTarget.style.color = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.color = 'var(--text-muted)'
              }}
            >
              Connexion
            </button>
          </SignInButton>
          <SignUpButton
            mode="modal"
            forceRedirectUrl="/"
          >
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontWeight: 600,
                padding: '0.4rem 0.8rem',
                borderRadius: '999px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(20, 99, 86, 0.12)'
                e.currentTarget.style.color = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.color = 'var(--text-muted)'
              }}
            >
              Inscription
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </header>
  )
})
