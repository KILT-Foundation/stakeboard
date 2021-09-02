import { Account, Candidate, ChainTypes } from '../types'
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

export type Unstaking = {
  block: bigint
  amount: bigint
}

export type Delegation = {
  collator: string
  amount: bigint
}
export type AccountInfo = {
  stakeable: bigint
  totalStake: bigint
  unstaking: Array<Unstaking>
  stakes: Array<Delegation>
}

const updateAccountInfos = async (accounts: string[]) => {
  const getters = accounts.map((account) =>
    Promise.all([
      Promise.resolve(account),
      getBalance(account),
      getUnstakingAmounts(account),
      getDelegatorStake(account),
    ])
  )

  const resolved = await Promise.all(getters)

  const accountInfos: Record<string, AccountInfo> = {}

  resolved.forEach((account) => {
    const address = account[0]
    const balance = account[1]
    const unstakingChain = account[2]
    const stake = account[3]

    const {
      data: { free, reserved },
    } = balance

    const totalStake = stake.unwrapOrDefault().total.toBigInt()
    const stakeable = free.toBigInt() - reserved.toBigInt() - totalStake

    const unstaking: Array<Unstaking> = []
    unstakingChain.forEach((value, key) => {
      unstaking.push({
        block: key.toBigInt(),
        amount: value.toBigInt(),
      })
    })

    const stakes: Array<Delegation> = stake
      .unwrapOrDefault()
      .delegations.map((chainStake) => ({
        collator: chainStake.owner.toString(),
        amount: chainStake.amount.toBigInt(),
      }))

    accountInfos[address] = {
      totalStake,
      stakeable,
      unstaking,
      stakes,
    }
  })

  return accountInfos
}

export const initialize = async (
  interval: number,
  accounts: string[],
  updateCallback: (
    newCandidates: Record<string, Candidate>,
    selectedCandidates: string[],
    currentCandidates: string[],
    chainInfo: ChainInfo,
    accountInfos: Record<string, AccountInfo>
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

    Object.entries(accountInfos).forEach(([address, accountInfo]) => {
      accountInfo.stakes.forEach((delegation) => {
        if (candidates[delegation.collator]) {
          candidates[delegation.collator].userStakes.push({
            stake: delegation.amount,
            account: address,
          })
        }
      })
    })

    updateCallback(
      candidates,
      selectedCandidates,
      currentCandidates,
      chainInfo,
      accountInfos
    )
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
