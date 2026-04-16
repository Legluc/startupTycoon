export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (
      (Math.floor((num / 1_000_000_000) * 1000) / 1000)
        .toFixed(2)
        .replace(/\.?0+$/, '') + 'MM'
    )
  }
  if (num >= 1_000_000) {
    return (
      (Math.floor((num / 1_000_000) * 100) / 100)
        .toFixed(2)
        .replace(/\.?0+$/, '') + 'M'
    )
  }
  if (num >= 1_000) {
    return (
      (Math.floor((num / 1_000) * 10) / 10).toFixed(1).replace(/\.?0+$/, '') +
      'K'
    )
  }
  return Number(num).toFixed(1).toString()
}
