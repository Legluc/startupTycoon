// Page publique — accessible sans compte
// Server Component (pas de 'use client')

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Tycoon — Leaderboard',
}

// Données mock — à remplacer par une vraie source (DB, API)
const mockLeaderboard = [
  { rank: 1, name: 'Alice', totalEarned: 9_870_000 },
  { rank: 2, name: 'Bob', totalEarned: 5_430_000 },
  { rank: 3, name: 'Charlie', totalEarned: 3_210_000 },
  { rank: 4, name: 'Diana', totalEarned: 1_980_000 },
  { rank: 5, name: 'Evan', totalEarned: 870_000 },
]

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toString()
}

export default function LeaderboardPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Leaderboard</h1>
      <p style={{ color: '#888', marginBottom: '1.5rem' }}>
        Classement public — visible sans compte.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>#</th>
            <th style={{ ...thStyle, textAlign: 'left' }}>Joueur</th>
            <th style={{ ...thStyle, textAlign: 'right' }}>Total gagné</th>
          </tr>
        </thead>
        <tbody>
          {mockLeaderboard.map((entry) => (
            <tr key={entry.rank} style={entry.rank === 1 ? goldRowStyle : {}}>
              <td style={tdStyle}>{entry.rank}</td>
              <td style={{ ...tdStyle, textAlign: 'left' }}>{entry.name}</td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>
                ${formatNumber(entry.totalEarned)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
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
