import { useState } from 'react'
import { MoneyDisplay } from '@/components/MoneyDisplay'
import { IncomeDisplay } from '@/components/IncomeDisplay'
import { ClickButton } from '@/components/ClickButton'

export function HomePage() {
  const [money, setMoney] = useState(0)
  const clickValue = 1

  const handleClick = () => {
    setMoney(money + clickValue)
  }
  return (
    <section className="hero">
      <h1>Startup Tycoon</h1>
      <p className="subtitle">Ici vous jouerez au clicker.</p>
      <div className="counter">
        <MoneyDisplay money={money} />
        <IncomeDisplay income={0} />
      </div>
      <ClickButton clickValue={clickValue} onClick={handleClick} />
    </section>
  )
}
