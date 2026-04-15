import type { Upgrade } from './upgrade'

export type GameState = {
  money: number
  clickValue: number
  incomePerSecond: number
  upgrades: Upgrade[]
  totalClicks: number
  totalEarned: number
}

export type GameAction =
  | { type: 'CLICK' }
  | { type: 'TICK' }
  | { type: 'BUY_UPGRADE'; payload: string } // upgradeId
  | { type: 'RESET_GAME' }

export const INITIAL_STATE: GameState = {
  money: 0,
  clickValue: 1,
  incomePerSecond: 0,
  upgrades: [],
  totalClicks: 0,
  totalEarned: 0,
}
