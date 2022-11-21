import { Candidate, ChainTypes, StakingRates } from '../types'
import {
  getCandidatePool,
  getCurrentCollators,
  getNextCollators,
  mapCollatorStateToCandidate,
  getBalance,
  queryBestBlock,
  queryBestFinalisedBlock,
  querySessionInfo,
  getUnstakingAmounts,
  getDelegatorStake,
  queryTotalIssurance,
  queryOverallTotalStake,
  queryMaxCandidateCount,
  queryMinDelegatorStake,
  queryStakingRates,
  getUnclaimedStakingRewards,
  getMaxNumberDelegators,
} from './chain'
import { femtoToKilt } from './conversion'

const updateCollators = async () => {
  const [
    collatorStates,
    selectedCandidatesChain,
    currentCandidatesChain,
  ] = await Promise.all([
    getCandidatePool(),
    getNextCollators(),
    getCurrentCollators(),
  ])
  const candidates: Record<string, Candidate> = {}
  collatorStates.forEach(async ([accountId, state]) => {
    if (state.isNone) return
    const unwrapped = state.unwrap()
    const candidateId = unwrapped.id.toString()
    candidates[candidateId] = mapCollatorStateToCandidate(unwrapped)
  })

  const selectedCandidates = selectedCandidatesChain.map((selected) =>
    selected[0].toString()
  )

  const currentCandidates = currentCandidatesChain.map((candidate) =>
    candidate.toString()
  )

  return { candidates, selectedCandidates, currentCandidates }
}

export interface OverallTotalStake {
  collators: bigint
  delegators: bigint
}

type ChainInfo = {
  sessionInfo: ChainTypes.RoundInfo
  bestBlock: number
  bestFinalisedBlock: number
  overrallTotalStake: OverallTotalStake
  totalIssuance: bigint
  maxCandidateCount: number
  minDelegatorStake: number
  maxNumberDelegators: number
  stakingRates: StakingRates
}

const updateChainInfo = async (): Promise<ChainInfo> => {
  const [
    sessionInfo,
    bestBlock,
    bestFinalisedBlock,
    overrallTotalStake,
    totalIssuance,
    maxCandidateCount,
    minDelegatorStake,
    stakingRates,
    maxNumberDelegators,
  ] = await Promise.all([
    querySessionInfo(),
    queryBestBlock(),
    queryBestFinalisedBlock(),
    queryOverallTotalStake(),
    queryTotalIssurance(),
    queryMaxCandidateCount(),
    queryMinDelegatorStake(),
    queryStakingRates(),
    getMaxNumberDelegators(),
  ])

  const chainInfo: ChainInfo = {
    sessionInfo,
    bestBlock: bestBlock.toNumber(),
    bestFinalisedBlock: bestFinalisedBlock.toNumber(),
    overrallTotalStake: {
      collators: overrallTotalStake.collators.toBigInt(),
      delegators: overrallTotalStake.delegators.toBigInt(),
    },
    totalIssuance: totalIssuance.toBigInt(),
    maxCandidateCount: maxCandidateCount.toNumber(),
    minDelegatorStake: femtoToKilt(minDelegatorStake.toBigInt()),
    maxNumberDelegators: maxNumberDelegators.toNumber(),
    stakingRates,
  }

  return chainInfo
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
  delegation: Delegation
  rewards: bigint
}

const updateAccountInfos = async (accounts: string[]) => {
  const getters = accounts.map((account) =>
    Promise.all([
      Promise.resolve(account),
      getBalance(account),
      getUnstakingAmounts(account),
      getDelegatorStake(account),
      getUnclaimedStakingRewards(account),
    ])
  )

  const resolved = await Promise.all(getters)

  const accountInfos: Record<string, AccountInfo> = {}

  resolved.forEach((account) => {
    const address = account[0]
    const balance = account[1]
    const unstakingChain = account[2]
    const maybeDelegation = account[3]
    const rewards = account[4].toBigInt()

    let totalStake = 0n
    let delegation = {
      collator: '',
      amount: 0n,
    }

    // Only addresses which have an active delegation can be unwrapped
    if (maybeDelegation.isSome) {
      const stake = maybeDelegation.unwrap()
      totalStake = stake.amount.toBigInt()
      delegation = {
        collator: stake.owner.toString(),
        amount: stake.amount.toBigInt(),
      }
    }

    const {
      data: { free },
    } = balance

    const unstaking: Array<Unstaking> = []
    unstakingChain.forEach((value, key) => {
      unstaking.push({
        block: key.toBigInt(),
        amount: value.toBigInt(),
      })
    })

    const stakeable = free.toBigInt() - totalStake

    accountInfos[address] = {
      totalStake,
      stakeable,
      unstaking,
      delegation,
      rewards,
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
    accountInfos: Record<string, AccountInfo> | undefined
  ) => void
) => {
  let timer = 0
  let shouldKeepUpdating = true

  const update = async () => {
    const [
      { candidates, currentCandidates, selectedCandidates },
      chainInfo,
    ] = await Promise.all([updateCollators(), updateChainInfo()])

    if (!accounts.length) {
      updateCallback(
        candidates,
        selectedCandidates,
        currentCandidates,
        chainInfo,
        undefined
      )
    } else {
      const accountInfos = await updateAccountInfos(accounts)

      Object.entries(accountInfos).forEach(([address, { delegation }]) => {
        if (candidates[delegation.collator]) {
          candidates[delegation.collator].userStakes.push({
            stake: delegation.amount,
            account: address,
          })
        }
      })

      updateCallback(
        candidates,
        selectedCandidates,
        currentCandidates,
        chainInfo,
        accountInfos
      )
    }
  }

  const keepUpdating = () => {
    timer = window.setTimeout(async () => {
      await update()
      if (shouldKeepUpdating) keepUpdating()
    }, interval * 1000)
  }

  update().then(() => {
    if (shouldKeepUpdating) keepUpdating()
  })

  const stop = () => {
    shouldKeepUpdating = false
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
  }
  return stop
}
