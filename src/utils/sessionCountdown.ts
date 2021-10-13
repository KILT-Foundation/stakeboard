import { ChainTypes } from '../types'
import { blockToTime, padTime } from './timeConvert'

export function sessionCounter(
  sessionInfo?: ChainTypes.RoundInfo,
  bestBlock?: number
) {
  if (!sessionInfo || !bestBlock) return 0
  return bestBlock - sessionInfo.first.toNumber()
}

export function sessionTimer(
  sessionInfo?: ChainTypes.RoundInfo,
  bestBlock?: number
) {
  if (!sessionInfo || !bestBlock) return ''
  const blockInSession = bestBlock - sessionInfo.first.toNumber()
  const blockInSessionDescending =
    sessionInfo.length.toNumber() - blockInSession

  const { hours, minutes, seconds } = blockToTime(blockInSessionDescending)

  const hoursPad = padTime(hours)
  const minutesPad = padTime(minutes)
  const secondsPad = padTime(seconds)

  return `~ ${hoursPad}h : ${minutesPad}m : ${secondsPad}s`
}
