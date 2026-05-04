'use client'

import { useCallback } from 'react'
import { useGame } from '../lib/GameContext'
import { clearGameSave } from '../services/storage'
import { SaveTimeDisplay } from '../components/SaveTimeDisplay'

export function Settings() {
  const { dispatch, lastSavedAt } = useGame()

  const handleResetSave = useCallback(() => {
    if (window.confirm('Êtes-vous sûr ? Cela effacera votre sauvegarde.')) {
      clearGameSave()
      dispatch({ type: 'RESET_GAME' })
    }
  }, [dispatch])

  return (
    <section className="hero">
      <h1>Settings</h1>
      <p className="subtitle">Ici vous gererez les options de la partie.</p>

      <SaveTimeDisplay lastSavedAt={lastSavedAt} />

      <button onClick={handleResetSave} className="secondary-btn">
        Reset Save
      </button>
    </section>
  )
}
