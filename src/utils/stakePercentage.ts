import { BlockNumber } from '@polkadot/types/interfaces'

export function getPercent(percentageValue: number, secondValue: number) {
  const total = percentageValue + secondValue
  const percent = (percentageValue / total) * 100
  return percent.toFixed(1)
}

export function getPercentage(total: number, value: number) {
  return ((total / value) * 100).toFixed(1)
}

export function delegatorsRewardRate(
  currentStakeRate: number,
  blocks: BlockNumber
) {
  const blocksInYear = 31557600 / 12
  let rewardRate
  if (blocks.toNumber() <= blocksInYear) {
    rewardRate = Math.min(40 / currentStakeRate, 1) * 8
  } else if (blocks.toNumber() <= blocksInYear * 2) {
    rewardRate = Math.min(40 / currentStakeRate, 1) * 6
  } else {
    rewardRate = 0
  }
  return rewardRate.toFixed(1)
}
