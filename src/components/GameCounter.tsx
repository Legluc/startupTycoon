import { formatNumber } from '../utils/formatNumbers'
import '../styles/game-counter.css'

type GameCounterProps = {
  money: number
  incomePerSecond: number
}

export function GameCounter({ money, incomePerSecond }: GameCounterProps) {
  return (
    <div className="game-counter">
      <div className="counter-item">
        <span className="counter-label">Argent</span>
        <span className="counter-value">${formatNumber(money)}</span>
      </div>
      <div className="counter-divider"></div>
      <div className="counter-item">
        <span className="counter-label">Revenu/sec</span>
        <span className="counter-value income-value">
          +${formatNumber(incomePerSecond)}/s
        </span>
      </div>
    </div>
  )
}
