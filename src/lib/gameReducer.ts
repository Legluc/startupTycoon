import type { GameState, GameAction } from '../types/gameState'
import { UPGRADES } from '../data/upgrades'
import { calculateUpgradeCost } from '../utils/calculateUpgradeCost'

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CLICK':
      return {
        ...state,
        money: state.money + state.clickValue,
        totalClicks: state.totalClicks + 1,
      }

    case 'TICK':
      return {
        ...state,
        money: state.money + state.incomePerSecond,
        totalEarned: state.totalEarned + state.incomePerSecond,
      }

    case 'BUY_UPGRADE': {
      const upgrade = state.upgrades.find((u) => u.id === action.payload)
      if (!upgrade) return state

      const currentCost = calculateUpgradeCost(upgrade.baseCost, upgrade.count)

      // Vérifier les fonds
      if (state.money < currentCost) return state

      return {
        ...state,
        money: state.money - currentCost,
        incomePerSecond: state.incomePerSecond + upgrade.incomePerSecondGain,
        clickValue: state.clickValue + upgrade.clickValueGain,
        upgrades: state.upgrades.map((u) =>
          u.id === action.payload ? { ...u, count: u.count + 1 } : u
        ),
      }
    }

    case 'RESET_GAME':
      return {
        money: 0,
        clickValue: 1,
        incomePerSecond: 0,
        upgrades: UPGRADES.map((u) => ({ ...u, count: 0 })),
        totalClicks: 0,
        totalEarned: 0,
      }

    default:
      return state
  }
}
