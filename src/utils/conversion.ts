export const kiltToFemto = (kilt: number) => {
  const factor = 10n ** 15n
  const inFemto = BigInt(kilt) * factor
  return inFemto
}
