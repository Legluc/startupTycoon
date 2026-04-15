import { formatNumber } from '@/utils/formatNumbers'

type MoneyDisplayProps = {
  money: number
}

export function MoneyDisplay({ money }: MoneyDisplayProps) {
  return <p>Money: ${formatNumber(money)}</p>
}
