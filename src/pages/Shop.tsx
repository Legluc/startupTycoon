import { useState } from 'react'
import { UPGRADES } from '../data/upgrades'
import { UpgradeCard } from '../components/UpgradeCard'
import { useGame } from '../lib/GameContext'
import { calculateUpgradeCost } from '../utils/calculateUpgradeCost'

export function Shop() {
  const { money, setMoney, incomePerSecond, setIncomePerSecond } = useGame()
  const [upgrades, setUpgrades] = useState(UPGRADES)

  const handleBuy = (id: string) => {
    const upgrade = upgrades.find((u) => u.id === id)
    if (!upgrade) return

    const currentCost = calculateUpgradeCost(upgrade.baseCost, upgrade.count)

    if (money < currentCost) {
      return
    }

    setMoney(money - currentCost)
    setIncomePerSecond(incomePerSecond + upgrade.incomePerSecondGain)

    setUpgrades(
      upgrades.map((u) => (u.id === id ? { ...u, count: u.count + 1 } : u))
    )
  }

  return (
    <section className="hero">
      <h1>Boutique</h1>
      <p className="subtitle">
        Achetez des upgrades pour augmenter vos revenus
      </p>

      <div className="upgrades-grid">
        {upgrades.map((upgrade) => {
          const currentCost = calculateUpgradeCost(
            upgrade.baseCost,
            upgrade.count
          )
          return (
            <UpgradeCard
              key={upgrade.id}
              upgrade={upgrade}
              currentCost={currentCost}
              canAfford={money >= currentCost}
              onBuy={() => handleBuy(upgrade.id)}
            />
          )
        })}
      </div>
    </section>
  )
}
