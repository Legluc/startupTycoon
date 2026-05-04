'use client'

import { useAuth } from '@clerk/nextjs'

export function MultiplayerButton() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return (
      <button type="button" className="secondary-btn">
        Partie multi
      </button>
    )
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        className="secondary-btn"
        disabled
        aria-disabled="true"
        title="Créez un compte pour jouer en multijoueur"
        style={{ cursor: 'not-allowed', opacity: 0.5 }}
      >
        Partie multi
      </button>
      <span
        role="tooltip"
        style={{
          display: 'block',
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: 'var(--color-muted, #888)',
          textAlign: 'center',
        }}
      >
        Créez un compte pour jouer en multijoueur
      </span>
    </div>
  )
}

