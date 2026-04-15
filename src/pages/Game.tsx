import { MoneyDisplay } from '@/components/MoneyDisplay'
import { IncomeDisplay } from '@/components/IncomeDisplay'
import { ClickButton } from '@/components/ClickButton'

export function HomePage() {
  return (
    <section className="hero">
      <h1>Startup Tycoon</h1>
      <p className="subtitle">Ici vous jouerez au clicker.</p>
      <div className="counter">
        <MoneyDisplay money={0} />
        <IncomeDisplay income={0} />
      </div>
      <ClickButton clickValue={1} onClick={() => {}} />
    </section>
  )
}
