'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import type { GameState } from '../types/gameState'
import { saveGameState } from '../services/storage'

const SAVE_INTERVAL_MS = 5000 // 5 secondes

export function useAutoSave(state: GameState) {
  const stateRef = useRef<GameState>(state)
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  const performSave = useCallback(() => {
    saveGameState(stateRef.current)
    setLastSavedAt(Date.now()) // ← mise à jour instantanée, pas de polling
  }, [])

  const saveImmediate = useCallback(() => {
    performSave()
  }, [performSave])

  useEffect(() => {
    const interval = setInterval(() => {
      performSave()
    }, SAVE_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [performSave])

  return { saveImmediate, lastSavedAt }
}
