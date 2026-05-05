'use client'

// Page leaderboard — publique, données temps réel via useLeaderboard()

import { useLeaderboard } from '@/hooks/useLeaderboard'
import { formatNumber } from '@/utils/formatNumbers'

export default function LeaderboardPage() {
  const { data, isLoading, isError, error } = useLeaderboard(20)

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Leaderboard</h1>
      <p style={{ color: '#888', marginBottom: '1.5rem' }}>
        Classement public — top 20 all-time (mis à jour toutes les 10 s).
      </p>

      {isLoading && <p>Chargement…</p>}

      {isError && (
        <p style={{ color: '#e55' }}>Erreur : {(error as Error).message}</p>
      )}

      {data && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Joueur</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Score</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Durée</th>
            </tr>
          </thead>
          <tbody>
            {data.entries.map((entry, index) => (
              <tr key={entry.userId} style={index === 0 ? goldRowStyle : {}}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={{ ...tdStyle, textAlign: 'left' }}>
                  {entry.displayName || entry.userId.slice(0, 8)}
                  {/* Score optimiste en attente de confirmation */}
                  {entry.userId === 'optimistic' && (
                    <span
                      style={{
                        color: '#888',
                        fontSize: '0.75rem',
                        marginLeft: '0.5rem',
                      }}
                    >
                      (en cours…)
                    </span>
                  )}
                </td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>
                  ${formatNumber(entry.score)}
                </td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>
                  {formatDuration(entry.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m${String(s).padStart(2, '0')}s`
}

const thStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  borderBottom: '2px solid #333',
  color: '#888',
  fontSize: '0.875rem',
  textAlign: 'center',
}

const tdStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #222',
  textAlign: 'center',
}

const goldRowStyle: React.CSSProperties = {
  background: 'rgba(255, 200, 0, 0.06)',
}
