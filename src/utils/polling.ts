import { Candidate, ChainTypes } from '../types'
import {
  getAllCollatorState,
  getCurrentCandidates,
  getSelectedCandidates,
  mapCollatorStateToCandidate,
  getBalance,
  queryBestBlock,
  queryBestFinalisedBlock,
  querySessionInfo,
  getUnstakingAmounts,
  getDelegatorStake,
} from './chain'

const updateCollators = async () => {
  const [
    collatorStates,
    selectedCandidatesChain,
    currentCandidatesChain,
  ] = await Promise.all([
    getAllCollatorState(),
    getSelectedCandidates(),
    getCurrentCandidates(),
  ])
  const candidates: Record<string, Candidate> = {}
  collatorStates.forEach(async ([accountId, state]) => {
    if (state.isNone) return
    const unwrapped = state.unwrap()
    const candidateId = unwrapped.id.toString()
    candidates[candidateId] = mapCollatorStateToCandidate(unwrapped)
  })

  const selectedCandidates = selectedCandidatesChain.map((selected) =>
    selected.toString()
  )

  const currentCandidates = currentCandidatesChain.map((candidate) =>
    candidate.toString()
  )

  return { candidates, selectedCandidates, currentCandidates }
}

type ChainInfo = {
  sessionInfo: ChainTypes.RoundInfo
  bestBlock: ChainTypes.BlockNumber
  bestFinalisedBlock: ChainTypes.BlockNumber
}

const updateChainInfo = async (): Promise<ChainInfo> => {
  const [sessionInfo, bestBlock, bestFinalisedBlock] = await Promise.all([
    querySessionInfo(),
    queryBestBlock(),
    queryBestFinalisedBlock(),
  ])
  return { sessionInfo, bestBlock, bestFinalisedBlock }
}

const updateAccountInfos = async (accounts: string[]) => {
  const balanceGetters = Promise.all(
    accounts.map((account) => getBalance(account))
  )
  const unstakingGetters = Promise.all(
    accounts.map((account) => getUnstakingAmounts(account))
  )
  const delegatorGetters = Promise.all(
    accounts.map((account) => getDelegatorStake(account))
  )

  const [balances, unstakingAmounts, delegatorStakes] = await Promise.all([
    balanceGetters,
    unstakingGetters,
    delegatorGetters,
  ])

  return { balances, unstakingAmounts, delegatorStakes }
}

export const initialize = async (
  interval: number,
  accounts: string[],
  updateCallback: (
    newCandidates: Record<string, Candidate>,
    selectedCandidates: string[],
    currentCandidates: string[],
    chainInfo: ChainInfo
  ) => void
) => {
  let timer = 0

  const update = async () => {
    const [
      { candidates, currentCandidates, selectedCandidates },
      chainInfo,
      accountInfos,
    ] = await Promise.all([
      updateCollators(),
      updateChainInfo(),
      updateAccountInfos(accounts),
    ])

    console.log(accountInfos)

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
