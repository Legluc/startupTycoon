'use client'

import { memo, useMemo } from 'react'
import { useGame } from '../lib/GameContext'
import { formatNumber } from '../utils/formatNumbers'
import '../styles/game-counter.css'

export const GameCounter = memo(function GameCounter() {
  const { state } = useGame()

  // Memoize les affichages formatés
  const displayValues = useMemo(
    () => ({
      money: formatNumber(state.money),
      income: formatNumber(state.incomePerSecond),
    }),
    [state.money, state.incomePerSecond]
  )

  return (
    <section className="game-counter" aria-label="Compteur de progression">
      <div className="game-counter__item">
        <span className="game-counter__label">Argent</span>
        <span className="game-counter__value">${displayValues.money}</span>
      </div>
      <div className="game-counter__divider" aria-hidden="true"></div>
      <div className="game-counter__item">
        <span className="game-counter__label">Revenu/sec</span>
        <span className="game-counter__value game-counter__value--income">
          +${displayValues.income}/s
        </span>
      </div>
    </section>
  )
})
