import { useMemo } from 'react'
import { useGame } from '../lib/GameContext'
import { formatNumber } from '../utils/formatNumbers'

export function Stats() {
  const { state } = useGame()

  const stats = useMemo(() => {
    const totalUpgradesBought = state.upgrades.reduce(
      (sum, upgrade) => sum + upgrade.count,
      0
    )

    const avgUpgradePrice =
      state.upgrades.length > 0
        ? state.upgrades.reduce((sum, u) => sum + u.baseCost * u.count, 0) /
          totalUpgradesBought
        : 0

    const earningRate =
      state.incomePerSecond > 0
        ? state.totalEarned / state.incomePerSecond / 60 // en minutes
        : 0

    return {
      totalUpgradesBought,
      avgUpgradePrice,
      earningRate,
      timeToEarnTotal:
        state.incomePerSecond > 0
          ? state.totalEarned / state.incomePerSecond
          : 0,
    }
  }, [state])

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${Math.floor(seconds)}s`
    if (seconds < 3600) {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}m ${secs}s`
    }
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${mins}m`
  }

  return (
    <section className="hero stats-page">
      <header className="stats-header">
        <h1>Statistiques</h1>
        <p className="subtitle">Suivez votre progression et vos performances</p>
      </header>

      <div className="stats-grid">
        {/* Argent total */}
        <div className="stat-card">
          <div className="stat-card__header">
            <h3>Argent actuellement</h3>
          </div>
          <p className="stat-card__value">${formatNumber(state.money)}</p>
        </div>

        {/* Argent généré */}
        <div className="stat-card">
          <div className="stat-card__header">
            <h3>Argent généré total</h3>
          </div>
          <p className="stat-card__value">${formatNumber(state.totalEarned)}</p>
          {state.incomePerSecond > 0 && (
            <p className="stat-card__subtitle">
              via {formatTime(stats.timeToEarnTotal)} d'automation
            </p>
          )}
        </div>

        {/* Clics */}
        <div className="stat-card">
          <div className="stat-card__header">
            <h3>Clics totaux</h3>
          </div>
          <p className="stat-card__value">{formatNumber(state.totalClicks)}</p>
          {state.totalClicks > 0 && (
            <p className="stat-card__subtitle">
              {formatNumber(state.clickValue)} par clic
            </p>
          )}
        </div>

        {/* Revenu par seconde */}
        <div className="stat-card">
          <div className="stat-card__header">
            <h3>Revenu/sec</h3>
          </div>
          <p className="stat-card__value">
            +${formatNumber(state.incomePerSecond)}
          </p>
          {state.incomePerSecond > 0 && (
            <p className="stat-card__subtitle">
              = ${formatNumber(state.incomePerSecond * 60)}/min
            </p>
          )}
        </div>

        {/* Upgrades achetés */}
        <div className="stat-card">
          <div className="stat-card__header">
            <h3>Upgrades achetés</h3>
          </div>
          <p className="stat-card__value">{stats.totalUpgradesBought}</p>
          <p className="stat-card__subtitle">
            {state.upgrades.filter((u) => u.count > 0).length} types différents
          </p>
        </div>

        {/* Coût moyen */}
        {stats.totalUpgradesBought > 0 && (
          <div className="stat-card">
            <div className="stat-card__header">
              <h3>Coût moyen/upgrade</h3>
            </div>
            <p className="stat-card__value">
              ${formatNumber(stats.avgUpgradePrice)}
            </p>
          </div>
        )}

        {/* Investissement total */}
        {stats.totalUpgradesBought > 0 && (
          <div className="stat-card">
            <div className="stat-card__header">
              <h3>Investissement total</h3>
            </div>
            <p className="stat-card__value">
              $
              {formatNumber(
                state.upgrades.reduce((sum, u) => sum + u.baseCost * u.count, 0)
              )}
            </p>
            <p className="stat-card__subtitle">
              en {stats.totalUpgradesBought} achats
            </p>
          </div>
        )}

        {/* Efficacité des clics */}
        {state.totalClicks > 0 && (
          <div className="stat-card">
            <div className="stat-card__header">
              <h3>Efficacité/clic</h3>
            </div>
            <p className="stat-card__value">
              ${formatNumber(state.totalEarned / state.totalClicks)}
            </p>
            <p className="stat-card__subtitle">argent par clic en moyenne</p>
          </div>
        )}
      </div>

      {/* Section des upgrades détaillés */}
      <div className="stats-upgrades">
        <h2>Détail des upgrades</h2>
        {state.upgrades.filter((u) => u.count > 0).length > 0 ? (
          <div className="upgrades-detail-list">
            {state.upgrades
              .filter((u) => u.count > 0)
              .map((upgrade) => (
                <div key={upgrade.id} className="upgrade-detail">
                  <span className="upgrade-detail__name">{upgrade.name}</span>
                  <span className="upgrade-detail__count">
                    x{upgrade.count}
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <p style={{ opacity: 0.6 }}>Aucun upgrade acheté pour le moment</p>
        )}
      </div>
    </section>
  )
}
