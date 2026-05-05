'use client'

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useSyncExternalStore,
} from 'react'
import type { ReactNode } from 'react'
import type { GameState, GameAction } from '../types/gameState'
import { gameReducer } from './gameReducer'
import { INITIAL_STATE } from '../types/gameState'
import { UPGRADES } from '../data/upgrades'
import { loadGameState } from '../services/storage'
import { useAutoSave } from '../hooks/useAutoSave'

/** Durée d'une partie solo en secondes (5 minutes). */
export const GAME_DURATION_S = 5 * 60

/**
 * Clé sessionStorage pour le timestamp de début de partie.
 * sessionStorage survit aux redirections dans le même onglet (ex : Clerk → /sign-in → retour)
 * mais est effacé à la fermeture de l'onglet → pas de timer obsolète entre les sessions.
 */
const SESSION_START_KEY = 'startup-tycoon-session-start'

/** Lit sessionStorage et renvoie les secondes écoulées depuis le début de la partie. */
function getElapsedSeconds(): number {
  const stored = sessionStorage.getItem(SESSION_START_KEY)
  if (!stored) {
    sessionStorage.setItem(SESSION_START_KEY, String(Date.now()))
    return 0
  }
  return Math.min(
    Math.floor((Date.now() - parseInt(stored, 10)) / 1000),
    GAME_DURATION_S
  )
}

export type GameContextType = {
  state: GameState
  dispatch: (action: GameAction) => void
  lastSavedAt: number | null
  /** Secondes écoulées depuis le début de la session courante. */
  sessionSeconds: number
  /** Vrai quand les 5 minutes sont écoulées. */
  isGameOver: boolean
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}

type GameProviderProps = {
  children: ReactNode
}

export function GameProvider({ children }: GameProviderProps) {
  const getInitialState = (): GameState => {
    const saved = loadGameState()
    if (saved) {
      return saved
    }

    return {
      ...INITIAL_STATE,
      upgrades: UPGRADES.map((u) => ({ ...u, count: 0 })),
    }
  }

  const [state, dispatch] = useReducer(gameReducer, undefined, getInitialState)
  const { saveImmediate, lastSavedAt } = useAutoSave(state)

  // ── Timer de session ───────────────────────────────────────────────────────
  // useSyncExternalStore : solution React 18 officielle pour un état externe mutable.
  //  - subscribe  : interval 1 s qui notifie React à chaque tick
  //  - getSnapshot: lit sessionStorage côté client → secondes écoulées réelles
  //  - getServerSnapshot: renvoie 0 côté SSR → server et client s'accordent → pas de hydration mismatch
  const sessionSeconds = useSyncExternalStore(
    (notify) => {
      const id = setInterval(notify, 1000)
      return () => clearInterval(id)
    },
    getElapsedSeconds, // client
    () => 0 // server
  )
  const isGameOver = sessionSeconds >= GAME_DURATION_S

  // ── Tick d'income automatique ─────────────────────────────────────────────
  useEffect(() => {
    if (state.incomePerSecond === 0) return

    const interval = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 1000)

    return () => clearInterval(interval)
  }, [state.incomePerSecond])

  const enhancedDispatch = (action: GameAction) => {
    dispatch(action)

    if (action.type === 'RESET_GAME') {
      // Réinitialiser le timer dans sessionStorage pour une nouvelle partie
      sessionStorage.removeItem(SESSION_START_KEY)
      sessionStorage.setItem(SESSION_START_KEY, String(Date.now()))
      saveImmediate()
    }

    if (action.type === 'BUY_UPGRADE') {
      saveImmediate()
    }
  }

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch: enhancedDispatch,
        lastSavedAt,
        sessionSeconds,
        isGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
