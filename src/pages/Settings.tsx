import { useState, useEffect } from 'react'
import { useGame } from '../lib/GameContext'
import { clearGameSave, getLastSaveTime } from '../services/storage'

export function Settings() {
  const { dispatch } = useGame()
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null)

  useEffect(() => {
    const updateSaveTime = () => {
      setLastSaveTime(getLastSaveTime())
    }
    updateSaveTime()

    const interval = setInterval(updateSaveTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleResetSave = () => {
    if (window.confirm('Êtes-vous sûr ? Cela effacera votre sauvegarde.')) {
      clearGameSave()
      dispatch({ type: 'RESET_GAME' })
      setLastSaveTime(null)
    }
  }

  const formatSaveTime = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)

    if (diffSec < 60) return `Il y a ${diffSec}s`
    if (diffSec < 3600) {
      const mins = Math.floor(diffSec / 60)
      return `Il y a ${mins}m`
    }
    if (diffSec < 86400) {
      const hours = Math.floor(diffSec / 3600)
      return `Il y a ${hours}h`
    }

    return date.toLocaleString('fr-FR')
  }

  return (
    <section className="hero">
      <h1>Settings</h1>
      <p className="subtitle">Ici vous gererez les options de la partie.</p>

      <div className="settings-save-info">
        <p>
          <strong>Dernière sauvegarde:</strong>
        </p>
        {lastSaveTime ? (
          <>
            <p className="settings-save-time">{formatSaveTime(lastSaveTime)}</p>
            <span className="settings-save-time-absolute">
              {lastSaveTime.toLocaleString('fr-FR')}
            </span>
          </>
        ) : (
          <p className="settings-save-empty">Aucune sauvegarde</p>
        )}
      </div>

      <button onClick={handleResetSave} className="secondary-btn">
        Reset Save
      </button>
    </section>
  )
}
