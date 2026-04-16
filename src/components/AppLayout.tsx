import { GameProvider } from '../lib/GameContext'
import { GameCounter } from './GameCounter'
import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <GameProvider>
      <div className="app-shell">
        <AppHeader />
        <GameCounter />
        <main>
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </GameProvider>
  )
}
