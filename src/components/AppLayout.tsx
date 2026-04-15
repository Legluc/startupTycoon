import { Link, NavLink, Outlet } from 'react-router-dom'
import { GameProvider } from '../lib/GameContext'
import { GameCounter } from './GameCounter'

export function AppLayout() {
  const currentYear = new Date().getFullYear()

  return (
    <GameProvider>
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

        <GameCounter />

        <main>
          <Outlet />
        </main>

        <footer className="site-footer">Startup Tycoon {currentYear}</footer>
      </div>
    </GameProvider>
  )
}
