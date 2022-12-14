import React, { useContext } from 'react'
import { Dashboard } from '../../components/Dashboard/Dashboard'
import { CollatorList } from '../../components/CollatorList/CollatorList'
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'
import { ChainInfo } from '../../components/ChainInfo/ChainInfo'
import styles from './Page.module.css'
import { BlockchainData } from '../BlockchainData/BlockchainData'
import { useExtension } from '../../utils/useExtension'
import { ErrorNotification } from '../ErrorNotification/ErrorNotification'
import { useConnect } from '../../utils/useConnect'
import { LoadingDataNotification } from '../../components/LoadingDataNotification/LoadingDataNotification'
import { ConnectionNotification } from '../../components/ConnectionNotification/ConnectionNotification'
import { BlockchainNotication } from '../BlockchainNotification/BlockchainNotification'
import { Maintenance } from '../Maintenance/Maintenance'
import { StateContext } from '../../utils/StateContext'

export interface Props {}

export const Page: React.FC<Props> = () => {
  const { state } = useContext(StateContext)
  useConnect()
  const { allAccounts, extensions } = useExtension(state.termsAccepted)
  if (process.env.REACT_APP_MAINTENANCE === 'true') return <Maintenance />
  return (
    <div className={styles.page}>
      <Header />
      <BlockchainData partialAccounts={allAccounts}>
        <ChainInfo />
        <Dashboard extensions={extensions} />
        <CollatorList />
        <div className={styles.spacer} />
        <Footer />
      </BlockchainData>
      <ErrorNotification />
      <ConnectionNotification />
      <LoadingDataNotification />
      <BlockchainNotication />
    </div>
  )
}
