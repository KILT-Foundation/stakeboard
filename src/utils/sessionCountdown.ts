import { BlockNumber, RoundInfo } from '../types'

export function sessionCounter(
  sessionInfo?: RoundInfo,
  bestBlock?: BlockNumber
) {
  if (!sessionInfo || !bestBlock) return 0
  return bestBlock.sub(sessionInfo.first).toNumber()
}

const padTime = (number: Number) => number.toString().padStart(2, '0')

export function sessionTimer(sessionInfo?: RoundInfo, bestBlock?: BlockNumber) {
  if (!sessionInfo || !bestBlock) return ''
  const blockInSession = bestBlock.sub(sessionInfo.first)
  const blockInSessionDescending = sessionInfo.length.sub(blockInSession)

  const inSeconds = blockInSessionDescending.muln(12).toNumber()

  const asTime = new Date(inSeconds * 1000)

  const hours = padTime(asTime.getUTCHours())
  const minutes = padTime(asTime.getUTCMinutes())
  const seconds = padTime(asTime.getSeconds())

  return `~${hours}:${minutes}:${seconds}`
}
