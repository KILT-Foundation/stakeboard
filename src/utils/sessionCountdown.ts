import { queryBestBlock, querySessionInfo } from './chain'

export async function sessionCounter() {
  const getSessionInfo = await querySessionInfo()

  const getFinalisedBlockNumber = await queryBestBlock()

  const sessionLastBlock = getSessionInfo.first.add(getSessionInfo.length)

  const a = getFinalisedBlockNumber.sub(sessionLastBlock)

  const countdown = getSessionInfo.length.add(a)

  return countdown.toNumber()
}

export async function sessionTimer() {
  const getSessionInfo = await querySessionInfo()

  const getFinalisedBlockNumber = await queryBestBlock()

  const sessionLastBlock = getSessionInfo.first.add(getSessionInfo.length)

  const currentSessionBlock = sessionLastBlock.sub(getFinalisedBlockNumber)

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
