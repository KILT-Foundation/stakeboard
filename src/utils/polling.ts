import { Candidate, RoundInfo, BlockNumber } from '../types'
import {
  getAllCollatorState,
  getCurrentCandidates,
  getSelectedCandidates,
  mapCollatorStateToCandidate,
  queryBestBlock,
  queryBestFinalisedBlock,
  querySessionInfo,
} from './chain'

const updateCollators = async () => {
  const collatorStates = await getAllCollatorState()
  const candidates: Record<string, Candidate> = {}
  collatorStates.forEach(async ([accountId, state]) => {
    if (state.isNone) return
    const unwrapped = state.unwrap()
    const candidateId = unwrapped.id.toString()
    candidates[candidateId] = mapCollatorStateToCandidate(unwrapped)
  })

  const selectedCandidates = (await getSelectedCandidates()).map((selected) =>
    selected.toString()
  )

  const currentCandidates = (await getCurrentCandidates()).map((candidate) =>
    candidate.toString()
  )

  return { candidates, selectedCandidates, currentCandidates }
}

type ChainInfo = {
  sessionInfo: RoundInfo
  bestBlock: BlockNumber
  bestFinalisedBlock: BlockNumber
}

const updateChainInfo = async (): Promise<ChainInfo> => {
  const sessionInfo = await querySessionInfo()
  const bestBlock = await queryBestBlock()
  const bestFinalisedBlock = await queryBestFinalisedBlock()

  return { sessionInfo, bestBlock, bestFinalisedBlock }
}

export const initialize = async (
  interval: number,
  updateCallback: (
    newCandidates: Record<string, Candidate>,
    selectedCandidates: string[],
    currentCandidates: string[],
    chainInfo: ChainInfo
  ) => void
) => {
  let timer = 0

  const update = async () => {
    const {
      candidates,
      currentCandidates,
      selectedCandidates,
    } = await updateCollators()

    const chainInfo = await updateChainInfo()

    updateCallback(candidates, selectedCandidates, currentCandidates, chainInfo)
  }

  const keepUpdating = () => {
    timer = window.setTimeout(async () => {
      await update()
      keepUpdating()
    }, interval * 1000)
  }

  await update()
  keepUpdating()

  const stop = () => {
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
  }
  return stop
}
