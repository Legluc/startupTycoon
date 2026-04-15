import type { Upgrade } from '../types/upgrade'
import { formatNumber } from '../utils/formatNumbers'
import { calculateUpgradeCost } from '../utils/calculateUpgradeCost'

type UpgradeCardProps = {
  upgrade: Upgrade
  canAfford: boolean
  currentCost: number
  onBuy: () => void
}

export function UpgradeCard({
  upgrade,
  canAfford,
  currentCost,
  onBuy,
}: UpgradeCardProps) {
  return (
    <div className={`upgrade-card ${!canAfford ? 'disabled' : ''}`}>
      <h3>{upgrade.name}</h3>
      <p className="description">{upgrade.description}</p>
      <div className="upgrade-stats">
        <p>
          Possédés: <strong>{upgrade.count}</strong>
        </p>
        <p>
          Coût: <strong>${formatNumber(currentCost)}</strong>
        </p>
        <p>+${formatNumber(upgrade.incomePerSecondGain)}/sec</p>
      </div>
      <button onClick={onBuy} disabled={!canAfford} className="secondary-btn">
        {canAfford ? 'Acheter' : 'Trop cher'}
      </button>
    </div>
  )
}
