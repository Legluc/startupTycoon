import { memo } from 'react'
import { Link, NavLink } from 'react-router-dom'

export const AppHeader = memo(function AppHeader() {
  return (
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
  )
})
