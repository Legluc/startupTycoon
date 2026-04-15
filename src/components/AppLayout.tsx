import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { GameProvider } from '../lib/GameContext'
import { GameCounter } from './GameCounter'

export function AppLayout() {
  const currentYear = new Date().getFullYear()
  const [money, setMoneyState] = useState(0)
  const [incomePerSecond, setIncomePerSecondState] = useState(0)

  const setMoney = (value: number | ((prev: number) => number)) => {
    if (typeof value === 'function') {
      setMoneyState(value)
    } else {
      setMoneyState(value)
    }
  }

  const setIncomePerSecond = (value: number | ((prev: number) => number)) => {
    if (typeof value === 'function') {
      setIncomePerSecondState(value)
    } else {
      setIncomePerSecondState(value)
    }
  }

  return (
    <GameProvider
      value={{ money, setMoney, incomePerSecond, setIncomePerSecond }}
    >
      <div className="app-shell">
        <header className="site-header">
          <Link to="/" className="brand">
            Startup Tycoon
          </Link>
          <nav className="main-nav" aria-label="Navigation principale">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              Jeu
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Boutique
            </NavLink>
            <NavLink
              to="/stats"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Stats
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Parametres
            </NavLink>
          </nav>
        </header>

        <GameCounter money={money} incomePerSecond={incomePerSecond} />

        <main>
          <Outlet />
        </main>

        <footer className="site-footer">Startup Tycoon {currentYear}</footer>
      </div>
    </GameProvider>
  )
}
