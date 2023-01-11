import {
  ParachainStakingCandidate,
  ParachainStakingCandidateStatus,
  ParachainStakingRoundInfo,
  ParachainStakingStake,
  ParachainStakingTotalStake,
} from '@kiltprotocol/augment-api'
import type {
  BlockNumber,
} from '@polkadot/types/interfaces'
export type { BlockNumber }

export type Stake = ParachainStakingStake

export type CollatorStatus = ParachainStakingCandidateStatus

export type Collator = ParachainStakingCandidate

export type RoundInfo = ParachainStakingRoundInfo

export type TotalStake = ParachainStakingTotalStake
