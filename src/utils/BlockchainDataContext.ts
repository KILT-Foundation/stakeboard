import React from 'react'
import { Data, Account, ChainTypes } from '../types'
import { OverallTotalStake } from './polling'

export const BlockchainDataContext = React.createContext<{
  dataSet: Data[]
  accounts: Account[]
  sessionInfo?: ChainTypes.RoundInfo
  bestBlock?: number
  bestFinalisedBlock?: number
  overallTotalStake?: OverallTotalStake
  totalIssuance?: bigint
}>({
  dataSet: [],
  accounts: [],
})
