import { memo, useState, useEffect } from 'react'

type SaveTimeDisplayProps = {
  lastSavedAt: number | null
}

export const SaveTimeDisplay = memo(function SaveTimeDisplay({
  lastSavedAt,
}: SaveTimeDisplayProps) {
  // Ticker interne pour mettre à jour l'affichage chaque seconde
  const [, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatSaveTime = (timestamp: number): string => {
    const diffSec = Math.floor((Date.now() - timestamp) / 1000)

    if (diffSec < 60) return `Il y a ${diffSec}s`
    if (diffSec < 3600) return `Il y a ${Math.floor(diffSec / 60)}m`
    if (diffSec < 86400) return `Il y a ${Math.floor(diffSec / 3600)}h`

    return new Date(timestamp).toLocaleString('fr-FR')
  }

  return (
    <div className="settings-save-info">
      <p>
        <strong>Dernière sauvegarde:</strong>
      </p>
      {lastSavedAt ? (
        <>
          <p className="settings-save-time">{formatSaveTime(lastSavedAt)}</p>
          <span className="settings-save-time-absolute">
            {new Date(lastSavedAt).toLocaleString('fr-FR')}
          </span>
        </>
      ) : (
        <p className="settings-save-empty">Aucune sauvegarde</p>
      )}
    </div>
  )
})
