import { ChainTypes } from '../types'
import { blockToTime, padTime } from './timeConvert'

export function sessionCounter(
  sessionInfo?: ChainTypes.RoundInfo,
  bestBlock?: ChainTypes.BlockNumber
) {
  if (!sessionInfo || !bestBlock) return 0
  return bestBlock.sub(sessionInfo.first).toNumber()
}

export function sessionTimer(
  sessionInfo?: ChainTypes.RoundInfo,
  bestBlock?: ChainTypes.BlockNumber
) {
  if (!sessionInfo || !bestBlock) return ''
  const blockInSession = bestBlock.sub(sessionInfo.first)
  const blockInSessionDescending = sessionInfo.length.sub(blockInSession)

  const { hours, minutes, seconds } = blockToTime(
    blockInSessionDescending.toNumber()
  )

  const hoursPad = padTime(hours)
  const minutesPad = padTime(minutes)
  const secondsPad = padTime(seconds)

  return `~ ${hoursPad}h : ${minutesPad}m : ${secondsPad}s`
}
