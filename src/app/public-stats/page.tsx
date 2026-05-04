// Server Component — rendu SSG (statique au build)
// Pas de 'use client' : ce composant s'exécute uniquement côté serveur

import publicStats from '@/data/public-stats.json'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Tycoon — Public Stats',
}

// Force le rendu statique (SSG) — valeur par défaut en App Router
// mais on le précise explicitement à titre pédagogique
export const dynamic = 'force-static'

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toString()
}

export default function PublicStatsPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Startup Tycoon — Public Stats</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Données générées statiquement au moment du build (SSG).
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        <StatCard
          label="Total Earned"
          value={`$${formatNumber(publicStats.totalEarned)}`}
        />
        <StatCard
          label="Total Clicks"
          value={formatNumber(publicStats.totalClicks)}
        />
        <StatCard
          label="Income / sec"
          value={`$${formatNumber(publicStats.incomePerSec)}/s`}
        />
      </div>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '1.5rem',
        textAlign: 'center',
      }}
    >
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#888' }}>{label}</p>
      <p style={{ margin: '0.5rem 0 0', fontSize: '2rem', fontWeight: 700 }}>
        {value}
      </p>
    </div>
  )
}
