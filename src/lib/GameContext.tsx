import { createContext, useContext, useEffect, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { GameState, GameAction } from '../types/gameState'
import { gameReducer } from './gameReducer'
import { INITIAL_STATE } from '../types/gameState'
import { UPGRADES } from '../data/upgrades'

export type GameContextType = {
  state: GameState
  dispatch: (action: GameAction) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
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
  const initialState: GameState = {
    ...INITIAL_STATE,
    upgrades: UPGRADES.map((u) => ({ ...u, count: 0 })),
  }

  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    if (state.incomePerSecond === 0) return

    const interval = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 1000)

    return () => clearInterval(interval)
  }, [state.incomePerSecond, dispatch])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}
