import { Balance } from '@polkadot/types/interfaces'
import React from 'react'
import { Data, Account, ChainTypes } from '../types'

export const BlockchainDataContext = React.createContext<{
  dataSet: Data[]
  accounts: Account[]
  sessionInfo?: ChainTypes.RoundInfo
  bestBlock?: ChainTypes.BlockNumber
  bestFinalisedBlock?: ChainTypes.BlockNumber
  overallTotalStake?: ChainTypes.TotalStake
  totalIssuance?: Balance
}>({
  dataSet: [],
  accounts: [],
})
