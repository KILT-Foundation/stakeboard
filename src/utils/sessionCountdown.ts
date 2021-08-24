import { queryBestBlock, querySessionInfo } from './chain'

export async function sessionCounter() {
  const sessionInfo = await querySessionInfo()

  const finalisedBlockNumber = await queryBestBlock()

  const sessionLastBlock = sessionInfo.first.add(sessionInfo.length)

  const a = finalisedBlockNumber.sub(sessionLastBlock)

  const countdown = sessionInfo.length.add(a)

  return countdown.toNumber()
}

export async function sessionTimer() {
  const sessionInfo = await querySessionInfo()

  const finalisedBlockNumber = await queryBestBlock()

  const sessionLastBlock = sessionInfo.first.add(sessionInfo.length)

  const currentSessionBlock = sessionLastBlock.sub(finalisedBlockNumber)

  const countdown = currentSessionBlock.muln(12).toNumber()

  const date = new Date(countdown * 1000)

  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getSeconds()

  const timeString =
    '~' +
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0')

  return timeString
}
