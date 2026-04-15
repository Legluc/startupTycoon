export function calculateUpgradeCost(baseCost: number, count: number): number {
  return Math.round(baseCost * Math.pow(1.15, count))
}
