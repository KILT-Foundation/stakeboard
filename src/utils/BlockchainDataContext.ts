import React from 'react'
import { Data, Account, ChainTypes, StakingRates } from '../types'
import { OverallTotalStake } from './polling'

export const BlockchainDataContext = React.createContext<{
  dataSet: Data[]
  accounts: Account[]
  sessionInfo?: ChainTypes.RoundInfo
  bestBlock?: number
  bestFinalisedBlock?: number
  overallTotalStake?: OverallTotalStake
  totalIssuance?: bigint
  maxCandidateCount?: number
  minDelegatorStake?: number
  maxNumberDelegators?: number
  stakingRates?: StakingRates
}>({
  dataSet: [],
  accounts: [],
})
