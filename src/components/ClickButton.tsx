import { formatNumber } from '../utils/formatNumbers'

type ClickButtonProps = {
  clickValue: number
  onClick: () => void
}

export function ClickButton({ clickValue, onClick }: ClickButtonProps) {
  return (
    <button type="button" onClick={onClick} className="primary-btn">
      <span>Développer</span> <br />
      <span> + {formatNumber(clickValue)}$ / clic</span>
    </button>
  )
}
