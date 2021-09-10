import React from 'react'
import { Dashboard } from '../../components/Dashboard/Dashboard'
import { CollatorList } from '../../components/CollatorList/CollatorList'
import { Header } from '../../components/Header/Header'
import { ChainInfo } from '../../components/ChainInfo/ChainInfo'
import styles from './Page.module.css'
import { useBlockchainData } from '../../utils/useBlockchainData'
import { useExtension } from '../../utils/useExtension'
import { ErrorNotification } from '../ErrorNotification/ErrorNotification'
import { useConnect } from '../../utils/useConnect'
import { ConnectionNotification } from '../../components/ConnectionNotification/ConnectionNotification'

export interface Props {}

export const Page: React.FC<Props> = () => {
  useConnect()
  const allAccounts = useExtension()
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
      <Dashboard accounts={accounts} bestBlock={bestBlock} />
      <CollatorList dataSet={dataSet} accounts={accounts} />
      <ErrorNotification />
      <ConnectionNotification />
    </div>
  )
}
