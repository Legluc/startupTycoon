import { useState, useCallback, useMemo } from 'react'
import { UpgradeCard } from '../components/UpgradeCard'
import { useGame } from '../lib/GameContext'
import { calculateUpgradeCost } from '../utils/calculateUpgradeCost'
import { useDebounce } from '../hooks/useDebounce'

export function Shop() {
  const { state, dispatch } = useGame()
  const [searchInput, setSearchInput] = useState('')

  // Debounce la recherche : délai de 300ms
  const debouncedSearch = useDebounce(searchInput, 300)

  const handleBuy = useCallback(
    (id: string) => {
      dispatch({ type: 'BUY_UPGRADE', payload: id })
    },
    [dispatch]
  )

  // Memoize la liste des upgrades avec leurs coûts
  const upgradesWithCosts = useMemo(
    () =>
      state.upgrades.map((upgrade) => ({
        upgrade,
        currentCost: calculateUpgradeCost(upgrade.baseCost, upgrade.count),
        canAfford:
          state.money >= calculateUpgradeCost(upgrade.baseCost, upgrade.count),
      })),
    [state.upgrades, state.money]
  )

  // Filtrer les upgrades basé sur la recherche debounced
  const filteredUpgrades = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return upgradesWithCosts
    }

    const query = debouncedSearch.toLowerCase()

    const results = upgradesWithCosts.filter(
      ({ upgrade }) =>
        upgrade.name.toLowerCase().includes(query) ||
        upgrade.description.toLowerCase().includes(query)
    )

    return results
  }, [debouncedSearch, upgradesWithCosts])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
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

      <div className="shop-search">
        <input
          type="text"
          placeholder="Rechercher un upgrade..."
          value={searchInput}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchInput && (
          <small style={{ opacity: 0.6 }}>
            Affichage : {filteredUpgrades.length} résultat
            {filteredUpgrades.length > 1 ? 's' : ''}
          </small>
        )}
      </div>

      <div className="upgrades-grid">
        {filteredUpgrades.map(({ upgrade, currentCost, canAfford }) => (
          <UpgradeCard
            key={upgrade.id}
            upgrade={upgrade}
            currentCost={currentCost}
            canAfford={canAfford}
            onBuy={handleBuy}
          />
        ))}
      </div>

      {filteredUpgrades.length === 0 && searchInput && (
        <p style={{ textAlign: 'center', opacity: 0.6 }}>
          Aucun upgrade trouvé pour "{searchInput}"
        </p>
      )}
    </section>
  )
}
