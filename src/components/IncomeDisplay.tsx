import { formatNumber } from '@/utils/formatNumbers'

type IncomeDisplayProps = {
  income: number
}

export function IncomeDisplay({ income }: IncomeDisplayProps) {
  return <p>Income: ${formatNumber(income)}</p>
}
