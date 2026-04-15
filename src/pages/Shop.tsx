import { UpgradeCard } from '../components/UpgradeCard'
import { useGame } from '../lib/GameContext'
import { calculateUpgradeCost } from '../utils/calculateUpgradeCost'

export function Shop() {
  const { state, dispatch } = useGame()

  const handleBuy = (id: string) => {
    dispatch({ type: 'BUY_UPGRADE', payload: id })
  }

  return (
    <section className="hero shop-page">
      <header className="shop-header">
        <p className="eyebrow">Boutique</p>
        <h1>Investis pour scaler plus vite</h1>
        <p className="subtitle">
          Achète des upgrades de revenu passif et de clic pour accélérer ta
          croissance.
        </p>
      </header>

      <div className="upgrades-grid">
        {state.upgrades.map((upgrade) => {
          const currentCost = calculateUpgradeCost(
            upgrade.baseCost,
            upgrade.count
          )
          return (
            <UpgradeCard
              key={upgrade.id}
              upgrade={upgrade}
              currentCost={currentCost}
              canAfford={state.money >= currentCost}
              onBuy={() => handleBuy(upgrade.id)}
            />
          )
        })}
      </div>
    </section>
  )
}
