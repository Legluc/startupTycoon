import { memo } from 'react'
import { formatNumber } from '../utils/formatNumbers'

type IncomeDisplayProps = {
  income: number
}

export const IncomeDisplay = memo(function IncomeDisplay({
  income,
}: IncomeDisplayProps) {
  return <p>Income: ${formatNumber(income)}/s</p>
})
