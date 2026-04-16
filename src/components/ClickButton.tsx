import { memo } from 'react'
import { formatNumber } from '../utils/formatNumbers'

type ClickButtonProps = {
  clickValue: number
  onClick: () => void
}

export const ClickButton = memo(
  function ClickButton({ clickValue, onClick }: ClickButtonProps) {
    return (
      <button type="button" onClick={onClick} className="primary-btn">
        <span>Développer</span> <br />
        <span> + {formatNumber(clickValue)}$ / clic</span>
      </button>
    )
  },
  (prev, next) => formatNumber(prev) === formatNumber(next)
)
