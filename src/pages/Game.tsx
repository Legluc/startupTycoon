import { useState, useEffect } from 'react'
import { MoneyDisplay } from '@/components/MoneyDisplay'
import { IncomeDisplay } from '@/components/IncomeDisplay'
import { ClickButton } from '@/components/ClickButton'

export function HomePage() {
  const [money, setMoney] = useState(0)
  const clickValue = 1
  const [incomePerSecond, setIncomePerSecond] = useState(0)

  const handleClick = () => {
    setMoney(money + clickValue)
  }

  const handleIncreaseIncome = () => {
    setIncomePerSecond((prev) => prev + 1)
  }

  const handleResetIncome = () => {
    setIncomePerSecond(0)
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
        <div className="counter">
          <IncomeDisplay income={incomePerSecond} />
          <MoneyDisplay money={money} />
        </div>
      </div>
      <ClickButton clickValue={clickValue} onClick={handleClick} />
      <div className="debug-buttons">
        <button onClick={handleIncreaseIncome} className="secondary-btn">
          +1 income/sec
        </button>
        <button onClick={handleResetIncome} className="secondary-btn">
          Reset income/sec
        </button>
      </div>
    </section>
  )
}
