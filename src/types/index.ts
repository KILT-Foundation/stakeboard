import { Unstaking } from '../utils/polling'

export * as ChainTypes from './chainTypes'

export interface Stake {
  stake: bigint
  account: string
}

export interface DataStake {
  stake: number
  account: string
}

export interface Data {
  collator: string
  active: boolean
  activeNext: boolean
  isLeaving: boolean
  totalStake: number
  delegators: number
  lowestStake: number | null
  stakes: Array<DataStake>
  favorite: boolean
}

export interface DataWithRank extends Data {
  rank: number
}

export interface Account {
  address: string
  name?: string
  staked: number
  stakeable: number
  unstaking: Array<Unstaking>
  used?: boolean
}

export interface AccountWithPct extends Account {
  total: number
  stakedPct: string
  stakeablePct: string
}
export interface Candidate {
  id: string
  stake: bigint
  delegators: {
    id: string
    amount: bigint
  }[]
  total: bigint
  isLeaving: bigint | false
  unsub?: Promise<() => void>
  userStakes: Array<Stake>
}

export interface ModalStake {
  name: string | undefined
  address: string
  newStake: number
  staked?: number
}

export interface Extension {
  name: string
  version: string
}
