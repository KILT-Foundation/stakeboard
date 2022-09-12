export const kiltToFemto = (kilt: number) => {
  const factor = 10n ** 15n
  const inFemto = BigInt(kilt) * factor
  return inFemto
}

export function femtoToKilt(big: bigint) {
  const inKilt = big / 10n ** 15n
  return Number(inKilt)
}
