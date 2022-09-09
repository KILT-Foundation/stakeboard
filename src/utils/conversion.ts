import { Perquintill } from '@polkadot/types/interfaces'

export const kiltToFemto = (kilt: number) => {
  const factor = 10n ** 15n
  const inFemto = BigInt(kilt) * factor
  return inFemto
}

export function femtoToKilt(big: bigint) {
  const inKilt = big / 10n ** 15n
  return Number(inKilt)
}

// Rounds 10^18 to 3 digits after comma and transforms into percent, e.g. 10^18 = 100
export function perquintillToPercentage(num: Perquintill) {
  const precision = 10n ** 5n
  const perquintill = 10n ** 18n
  const percent = num.toBigInt() * precision * 100n
  return Math.round(Number(percent) / Number(perquintill)) / Number(precision)
}
