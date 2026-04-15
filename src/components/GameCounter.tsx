import { useGame } from '../lib/GameContext'
import { formatNumber } from '../utils/formatNumbers'
import '../styles/game-counter.css'

export function GameCounter() {
  const { state } = useGame()

  return (
    <section className="game-counter" aria-label="Compteur de progression">
      <div className="game-counter__item">
        <span className="game-counter__label">Argent</span>
        <span className="game-counter__value">
          ${formatNumber(state.money)}
        </span>
      </div>
      <div className="game-counter__divider" aria-hidden="true"></div>
      <div className="game-counter__item">
        <span className="game-counter__label">Revenu/sec</span>
        <span className="game-counter__value game-counter__value--income">
          +${formatNumber(state.incomePerSecond)}/s
        </span>
      </div>
    </section>
  )
}
