export interface Stake {
  stake: number
  account: {
    name: string
    address: string
    available: number
  }
}

export interface Data {
  collator: string
  active: boolean
  activeNext: boolean
  isLeaving: boolean
  totalStake: number
  delegators: number
  lowestStake: number | null
  stakes: Array<Stake>
  favorite: boolean
}

export interface Account {
  address: string
  name?: string
  staked: number
  stakeable: number
  used?: boolean
}

export interface AccountWithPct extends Account {
  total: number
  stakedPct: string
  stakeablePct: string
}

/* Types for chain data */
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
}

export interface ModalStake {
  name: string | undefined
  address: string
  newStake: number
  staked?: number
}
