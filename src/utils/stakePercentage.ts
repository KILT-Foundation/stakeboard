export function getPercent(percentageValue: number, secondValue: number) {
  const total = percentageValue + secondValue
  const percent = (percentageValue / total) * 100
  return percent.toFixed(1)
}

export function getPercentage(total: number, value: number) {
  return ((total / value) * 100).toFixed(1)
}
