import React from 'react'
import { Dashboard } from '../../components/Dashboard/Dashboard'
import { CollatorList } from '../../components/CollatorList/CollatorList'
import { Header } from '../../components/Header/Header'
import { ChainInfo } from '../../components/ChainInfo/ChainInfo'
import styles from './Page.module.css'
import { Account, BlockNumber, Data, RoundInfo } from '../../types'

export interface Props {
  accounts: Account[]
  dataSet: Data[]
  sessionInfo?: RoundInfo
  bestBlock?: BlockNumber
  bestFinalisedBlock?: BlockNumber
}

export const Page: React.FC<Props> = ({
  accounts,
  dataSet,
  sessionInfo,
  bestBlock,
  bestFinalisedBlock,
}) => {
  return (
    <div className={styles.page}>
      <Header />
      <ChainInfo
        sessionInfo={sessionInfo}
        bestBlock={bestBlock}
        bestFinalisedBlock={bestFinalisedBlock}
      />
      <Dashboard accounts={accounts} />
      <CollatorList dataSet={dataSet} accounts={accounts} />
    </div>
  )
}
