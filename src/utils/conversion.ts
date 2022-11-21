export const kiltToFemto = (kilt: number) => {
  const factor = 10n ** 15n
  const inFemto = BigInt(kilt) * factor
  return inFemto
}

export function femtoToKilt(big: bigint) {
  const inKilt = big / 10n ** 15n
  return Number(inKilt)
}

export function femtoKiltToDigits(femtoKilt: bigint, digits: number) {
  const exponent =  BigInt(15 - digits)
  const shiftedKilt = femtoKilt / 10n ** exponent

  return Number(shiftedKilt) / Math.pow(10, digits)
}
