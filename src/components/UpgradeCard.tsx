'use client'

import { memo, useCallback, useMemo } from 'react'
import type { Upgrade } from '../types/upgrade'
import { formatNumber } from '../utils/formatNumbers'

type UpgradeCardProps = {
  upgrade: Upgrade
  canAfford: boolean
  currentCost: number
  onBuy: (id: string) => void
}

export const UpgradeCard = memo(
  function UpgradeCard({
    upgrade,
    canAfford,
    currentCost,
    onBuy,
  }: UpgradeCardProps) {
    const hasIncomeBonus = upgrade.incomePerSecondGain > 0
    const hasClickBonus = upgrade.clickValueGain > 0

    // Memoize les calculs d'efficiency
    const efficiencies = useMemo(
      () => ({
        income: hasIncomeBonus
          ? currentCost / upgrade.incomePerSecondGain
          : null,
        click: hasClickBonus ? currentCost / upgrade.clickValueGain : null,
      }),
      [
        currentCost,
        upgrade.incomePerSecondGain,
        upgrade.clickValueGain,
        hasIncomeBonus,
        hasClickBonus,
      ]
    )

    const handleClick = useCallback(() => {
      onBuy(upgrade.id)
    }, [onBuy, upgrade.id])

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
          {hasIncomeBonus && efficiencies.income && (
            <p>
              +${formatNumber(upgrade.incomePerSecondGain)}/sec
              <br />
              <small>({formatNumber(efficiencies.income)}/sec)</small>
            </p>
          )}
          {hasClickBonus && efficiencies.click && (
            <p>
              +${formatNumber(upgrade.clickValueGain)}/clic
              <br />
              <small>({formatNumber(efficiencies.click)}/clic)</small>
            </p>
          )}
          {!hasIncomeBonus && !hasClickBonus && <p>Aucun bonus</p>}
        </div>
        <button
          onClick={handleClick}
          disabled={!canAfford}
          className="secondary-btn"
        >
          {canAfford ? 'Acheter' : 'Trop cher'}
        </button>
      </div>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.upgrade.id === nextProps.upgrade.id &&
      prevProps.upgrade.count === nextProps.upgrade.count &&
      prevProps.currentCost === nextProps.currentCost &&
      prevProps.canAfford === nextProps.canAfford
    )
  }
)
