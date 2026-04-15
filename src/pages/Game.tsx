import { useEffect } from 'react'
import { ClickButton } from '../components/ClickButton'
import { useGame } from '../lib/GameContext'

export function HomePage() {
  const { money, setMoney, incomePerSecond } = useGame()
  const clickValue = 1

  const handleClick = () => {
    setMoney(money + clickValue)
  }

  useEffect(() => {
    if (incomePerSecond === 0) return

    const interval = setInterval(() => {
      setMoney((prev) => prev + incomePerSecond)
    }, 1000)

    return () => clearInterval(interval)
  }, [incomePerSecond])

  return (
    <section className="hero">
      <div className="gameboard">
        <h1>Startup Tycoon</h1>
      </div>
      <ClickButton clickValue={clickValue} onClick={handleClick} />
    </section>
  )
}
