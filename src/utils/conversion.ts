export const kiltToFemto = (kilt: number) => {
  const factor = 10n ** 15n
  const inFemto = BigInt(kilt) * factor
  return inFemto
}

export function femtoToKilt(big: bigint) {
  const inKilt = big / 10n ** 15n
  return Number(inKilt)
}

export function microToKilt(big: bigint) {
  const inMicroKilt = big / 10n ** 12n
  return Number(inMicroKilt) / Math.pow(10, 3)
}
