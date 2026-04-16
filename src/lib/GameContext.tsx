import { createContext, useContext, useEffect, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { GameState, GameAction } from '../types/gameState'
import { gameReducer } from './gameReducer'
import { INITIAL_STATE } from '../types/gameState'
import { UPGRADES } from '../data/upgrades'
import { loadGameState } from '../services/storage'
import { useAutoSave } from '../hooks/useAutoSave'

export type GameContextType = {
  state: GameState
  dispatch: (action: GameAction) => void
  lastSavedAt: number | null
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

  const enhancedDispatch = (action: GameAction) => {
    dispatch(action)

    if (action.type === 'BUY_UPGRADE' || action.type === 'RESET_GAME') {
      saveImmediate()
    }
  }

  useEffect(() => {
    if (state.incomePerSecond === 0) return

    const interval = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 1000)

    return () => clearInterval(interval)
  }, [state.incomePerSecond])

  return (
    <GameContext.Provider
      value={{ state, dispatch: enhancedDispatch, lastSavedAt }}
    >
      {children}
    </GameContext.Provider>
  )
}
