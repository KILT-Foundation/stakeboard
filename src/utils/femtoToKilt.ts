export function femtoToKilt(big: bigint) {
  const inKilt = big / 10n ** 15n
  return Number(inKilt)
}
