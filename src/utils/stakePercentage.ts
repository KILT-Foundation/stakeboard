import { Perquintill } from '@polkadot/types/interfaces'
import { StakingRates as StakingRatesChain } from '@kiltprotocol/augment-api'

export function getPercent(percentageValue: number, secondValue: number) {
  const total = percentageValue + secondValue
  const percent = (percentageValue / total) * 100
  return percent.toFixed(1)
}

// Rounds 10^18 to 3 digits after comma and transforms into percent, e.g. 10^18 = 100
function perquintillToPercentage(num: Perquintill) {
  const precision = 10n ** 5n
  const perquintill = 10n ** 18n
  const percent = num.toBigInt() * precision * 100n
  const rounded =
    Math.round(Number(percent) / Number(perquintill)) / Number(precision)
  return rounded
}

export function stakingRatesToHuman(rates: StakingRatesChain) {
  return {
    collatorRewardRate: perquintillToPercentage(rates.collatorRewardRate),
    collatorStakingRate: perquintillToPercentage(rates.collatorStakingRate),
    delegatorRewardRate: perquintillToPercentage(rates.delegatorRewardRate),
    delegatorStakingRate: perquintillToPercentage(rates.delegatorStakingRate),
  }
}
