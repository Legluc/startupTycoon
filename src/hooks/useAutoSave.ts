import { useRef, useCallback, useEffect } from 'react'
import type { GameState } from '../types/gameState'
import { saveGameState } from '../services/storage'

const THROTTLE_DELAY_MS = 5000

type AutoSaveOptions = {
  immediate?: boolean // Sauvegarder immédiatement
}

/**
 * Hook qui sauvegarde l'état avec throttle
 * - Sauvegarde immédiate si `options.immediate = true`
 * - Sinon, throttle 5 secondes entre chaque sauvegarde
 */
export function useAutoSave(state: GameState) {
  const lastSaveRef = useRef<number>(0)
  const pendingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const performSave = useCallback(() => {
    saveGameState(state)
    lastSaveRef.current = Date.now()
  }, [state])

  const throttledSave = useCallback(
    (options?: AutoSaveOptions) => {
      const now = Date.now()
      const timeSinceLastSave = now - lastSaveRef.current

      if (options?.immediate) {
        // Sauvegarde immédiate
        if (pendingTimeoutRef.current) {
          clearTimeout(pendingTimeoutRef.current)
          pendingTimeoutRef.current = null
        }
        performSave()
        return
      }

      // Throttle normal
      if (timeSinceLastSave >= THROTTLE_DELAY_MS) {
        // Temps écoulé, sauvegarder maintenant
        if (pendingTimeoutRef.current) {
          clearTimeout(pendingTimeoutRef.current)
          pendingTimeoutRef.current = null
        }
        performSave()
      } else {
        // Pas assez de temps, programmer la sauvegarde pour plus tard
        if (!pendingTimeoutRef.current) {
          const delay = THROTTLE_DELAY_MS - timeSinceLastSave
          pendingTimeoutRef.current = setTimeout(() => {
            performSave()
            pendingTimeoutRef.current = null
          }, delay)
        }
      }
    },
    [performSave]
  )

  // Cleanup timeout à la destruction
  useEffect(() => {
    return () => {
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current)
      }
    }
  }, [])

  return throttledSave
}
