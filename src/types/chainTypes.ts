import type { Struct, Vec, Enum, Null } from '@polkadot/types'
import type {
  AccountId,
  Balance,
  SessionIndex,
  BlockNumber,
} from '@polkadot/types/interfaces'
export type { BlockNumber }

export interface Stake extends Struct {
  owner: AccountId
  amount: Balance
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

export interface RoundInfo extends Struct {
  current: SessionIndex
  first: BlockNumber
  length: BlockNumber
}

export interface Delegator extends Struct {
  delegations: Vec<Stake>
  total: Balance
}
