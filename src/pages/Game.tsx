import { useCallback } from 'react'
import { ClickButton } from '../components/ClickButton'
import { useGame } from '../lib/GameContext'

export function HomePage() {
  const { state, dispatch } = useGame()

  // Memoize le handler du clic
  const handleClick = useCallback(() => {
    dispatch({ type: 'CLICK' })
  }, [dispatch])

  return (
    <section className="hero hero-game">
      <div className="gameboard">
        <h1>Startup Tycoon</h1>
      </div>
      <ClickButton clickValue={state.clickValue} onClick={handleClick} />
    </section>
  )
}
