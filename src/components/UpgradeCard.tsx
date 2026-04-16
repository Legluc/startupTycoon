import type { Upgrade } from '../types/upgrade'
import { formatNumber } from '../utils/formatNumbers'

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
  const hasIncomeBonus = upgrade.incomePerSecondGain > 0
  const hasClickBonus = upgrade.clickValueGain > 0

  // Ratio coût / bonus
  const incomeEfficiency = hasIncomeBonus
    ? currentCost / upgrade.incomePerSecondGain
    : null

  const clickEfficiency = hasClickBonus
    ? currentCost / upgrade.clickValueGain
    : null

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
        {hasIncomeBonus && (
          <p>
            +${formatNumber(upgrade.incomePerSecondGain)}/sec
            <br />
            <small>({formatNumber(incomeEfficiency)}/sec)</small>
          </p>
        )}
        {hasClickBonus && (
          <p>
            +${formatNumber(upgrade.clickValueGain)}/clic
            <br />
            <small>({formatNumber(clickEfficiency)}/clic)</small>
          </p>
        )}
        {!hasIncomeBonus && !hasClickBonus && <p>Aucun bonus</p>}
      </div>
      <button onClick={onBuy} disabled={!canAfford} className="secondary-btn">
        {canAfford ? 'Acheter' : 'Trop cher'}
      </button>
    </div>
  )
}
