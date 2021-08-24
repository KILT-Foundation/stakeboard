import React from 'react'
import { Dashboard } from '../../components/Dashboard/Dashboard'
import { CollatorList } from '../../components/CollatorList/CollatorList'
import { Header } from '../../components/Header/Header'
import { ChainInfo } from '../../components/ChainInfo/ChainInfo'
import styles from './Page.module.css'
import { Account } from '../../types'
import { useBlockchainData } from '../../utils/useBlockchainData'

export interface Props {
  allAccounts: Pick<Account, 'address' | 'name'>[]
}

export const Page: React.FC<Props> = ({ allAccounts }) => {
  const {
    dataSet,
    accounts,
    sessionInfo,
    bestBlock,
    bestFinalisedBlock,
  } = useBlockchainData(allAccounts)
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
