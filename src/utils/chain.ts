import { ApiPromise, WsProvider } from '@polkadot/api'
import { types12 as types } from '@kiltprotocol/type-definitions'
import type { Vec, Option, BTreeMap } from '@polkadot/types'
import type {
  AccountId,
  BalanceOf,
  BlockNumber,
} from '@polkadot/types/interfaces'
import { Candidate, ChainTypes } from '../types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { SubmittableExtrinsic } from '@polkadot/api/promise/types'

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

export async function getCandidatePool() {
  const api = await connect()
  const candidatePool = await api.query.parachainStaking.candidatePool<
    Vec<ChainTypes.Stake>
  >()
  return candidatePool
}

export async function subscribeToCandidatePool(
  listener: (result: Vec<ChainTypes.Stake>) => void
) {
  const api = await connect()
  // @ts-ignore
  window.trigger = (pool) => {
    listener(pool)
  }
  api.query.parachainStaking.candidatePool<Vec<ChainTypes.Stake>>(listener)
}

export async function subscribeToCollatorState(
  account: string,
  listener: (result: Option<ChainTypes.Collator>) => void
) {
  const api = await connect()
  return await api.query.parachainStaking.collatorState<
    Option<ChainTypes.Collator>
  >(account, listener)
}

export async function getAllCollatorState() {
  const api = await connect()
  return api.query.parachainStaking.collatorState.entries<
    Option<ChainTypes.Collator>,
    [AccountId]
  >()
}

export const mapCollatorStateToCandidate = (
  state: ChainTypes.Collator
): Candidate => ({
  id: state.id.toString(),
  stake: state.stake.toBigInt(),
  delegators: state.delegators.map((delegator) => {
    return {
      id: delegator.owner.toString(),
      amount: delegator.amount.toBigInt(),
    }
  }),
  total: state.total.toBigInt(),
  isLeaving: state.state.isLeaving ? state.state.asLeaving.toBigInt() : false,
  userStakes: [],
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
  const roundInfo = api.query.parachainStaking.round<ChainTypes.RoundInfo>()
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

export async function getBalance(account: string) {
  const api = await connect()
  return api.query.system.account(account)
}

export async function getUnstakingAmounts(account: string) {
  const api = await connect()
  return api.query.parachainStaking.unstaking<BTreeMap<BlockNumber, BalanceOf>>(
    account
  )
}

export async function getDelegatorStake(account: string) {
  const api = await connect()
  return api.query.parachainStaking.delegatorState<
    Option<ChainTypes.Delegator>
  >(account)
}

async function signAndSend(address: string, tx: SubmittableExtrinsic) {
  const injector = await web3FromAddress(address)
  return tx.signAndSend(address, { signer: injector.signer }, (status) => {
    console.log(status.status.toHuman())
  })
}

export async function joinDelegators(
  delegator: string,
  collator: string,
  stake: bigint
) {
  const api = await connect()
  const tx = api.tx.parachainStaking.joinDelegators(collator, stake)
  return signAndSend(delegator, tx)
}
export async function delegatorStakeMore(
  delegator: string,
  collator: string,
  more: bigint
) {
  const api = await connect()
  const tx = api.tx.parachainStaking.delegatorStakeMore(collator, more)
  return signAndSend(delegator, tx)
}
export async function delegatorStakeLess(
  delegator: string,
  collator: string,
  less: bigint
) {
  const api = await connect()
  const tx = api.tx.parachainStaking.delegatorStakeLess(collator, less)
  return signAndSend(delegator, tx)
}
export async function leaveDelegators(delegator: string) {
  const api = await connect()
  const tx = api.tx.parachainStaking.leaveDelegators()
  return signAndSend(delegator, tx)
}

export async function withdrawStake(account: string) {
  const api = await connect()
  const tx = api.tx.parachainStaking.unlockUnstaked(account)
  return signAndSend(account, tx)
}
