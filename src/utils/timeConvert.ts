export const padTime = (number: number) => number.toString().padStart(2, '0')

export function blockToTime(block: number) {
  const inSeconds = block * 12
  const secondsToMinutes = inSeconds / 60
  const minutesToHours = secondsToMinutes / 60
  const hoursToDays = minutesToHours / 24

  const seconds = Math.floor(inSeconds % 60)
  const minutes = Math.floor(secondsToMinutes % 60)
  const hours = Math.floor(minutesToHours % 24)
  const days = Math.floor(hoursToDays)

  return { days, hours, minutes, seconds }
}
