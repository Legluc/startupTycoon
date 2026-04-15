import { createContext, useContext, ReactNode } from 'react'

export type GameContextType = {
  money: number
  setMoney: (value: number | ((prev: number) => number)) => void
  incomePerSecond: number
  setIncomePerSecond: (value: number | ((prev: number) => number)) => void
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
  value: GameContextType
}

export function GameProvider({ children, value }: GameProviderProps) {
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
