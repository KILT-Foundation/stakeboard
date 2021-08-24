import { ApiPromise, WsProvider } from '@polkadot/api'
import { types12 as types } from '@kiltprotocol/type-definitions'
import type { Struct, Vec, Enum, Null, Option } from '@polkadot/types'
import type {
  AccountId,
  Balance,
  SessionIndex,
} from '@polkadot/types/interfaces'
import { Candidate, RoundInfo } from '../types'

let cachedApi: Promise<ApiPromise> | null = null

// const ENDPOINT = 'wss://kilt-peregrine-k8s.kilt.io'
const ENDPOINT = 'wss://kilt-peregrine-stg.kilt.io'

export async function connect() {
  if (!cachedApi) {
    const wsProvider = new WsProvider(ENDPOINT)
    cachedApi = ApiPromise.create({ provider: wsProvider, types })
  }
  let resolved = await cachedApi
  if (!resolved.isConnected) {
    resolved.connect()
  }
  return resolved
}

export async function disconnect() {
  return (await cachedApi)?.disconnect()
}

export async function getGenesis() {
  const api = await connect()
  // @ts-ignore
  window.api = api
  return api.genesisHash.toHex()
}

export interface Stake extends Struct {
  owner: AccountId
  amount: Balance
}
export async function getCandidatePool() {
  const api = await connect()
  const candidatePool = await api.query.parachainStaking.candidatePool<
    Vec<Stake>
  >()
  return candidatePool
}

export async function subscribeToCandidatePool(
  listener: (result: Vec<Stake>) => void
) {
  const api = await connect()
  // @ts-ignore
  window.trigger = (pool) => {
    listener(pool)
  }
  api.query.parachainStaking.candidatePool<Vec<Stake>>(listener)
}

export interface CollatorStatus extends Enum {
  asActive: Null
  asLeaving: SessionIndex
  isActive: boolean
  isLeaving: boolean
}
export interface Collator extends Struct {
  id: AccountId
  stake: Balance
  delegators: Vec<Stake>
  total: Balance
  state: CollatorStatus
}

export async function subscribeToCollatorState(
  account: string,
  listener: (result: Option<Collator>) => void
) {
  const api = await connect()
  return await api.query.parachainStaking.collatorState<Option<Collator>>(
    account,
    listener
  )
}

export async function getAllCollatorState() {
  const api = await connect()
  return api.query.parachainStaking.collatorState.entries<
    Option<Collator>,
    [AccountId]
  >()
}

export const mapCollatorStateToCandidate = (state: Collator): Candidate => ({
  id: state.id.toString(),
  stake: state.stake.toBigInt(),
  delegators: state.delegators.map((delegator) => {
    return {
      id: delegator.owner.toHuman(),
      amount: delegator.amount.toBigInt(),
    }
  }),
  total: state.total.toBigInt(),
  isLeaving: state.state.isLeaving ? state.state.asLeaving.toBigInt() : false,
})

export async function getSelectedCandidates() {
  const api = await connect()
  return api.query.parachainStaking.selectedCandidates<Vec<AccountId>>()
}

export async function getCurrentCandidates() {
  const api = await connect()
  return api.query.session.validators<Vec<AccountId>>()
}

export async function querySessionInfo() {
  const api = await connect()
  const roundInfo = api.query.parachainStaking.round<RoundInfo>()
  return roundInfo
}

export async function queryBestBlock() {
  const api = await connect()
  return api.derive.chain.bestNumber()
}

export async function queryBestFinalisedBlock() {
  const api = await connect()
  return api.derive.chain.bestNumberFinalized()
}
