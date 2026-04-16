import { ClickButton } from '../components/ClickButton'
import { useGame } from '../lib/GameContext'

export function HomePage() {
  const { state, dispatch } = useGame()

  const handleClick = () => {
    dispatch({ type: 'CLICK' })
  }

  return (
    <section className="hero hero-game">
      <div className="gameboard">
        <h1>Startup Tycoon</h1>
      </div>
      <ClickButton clickValue={state.clickValue} onClick={handleClick} />
    </section>
  )
}
