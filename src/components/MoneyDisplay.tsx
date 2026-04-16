import { memo } from 'react'
import { formatNumber } from '../utils/formatNumbers'

type MoneyDisplayProps = {
  money: number
}

export const MoneyDisplay = memo(function MoneyDisplay({
  money,
}: MoneyDisplayProps) {
  return <p>Money: ${formatNumber(money)}</p>
})
