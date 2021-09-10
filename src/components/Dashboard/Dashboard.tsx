import React, { useContext, useState } from 'react'
import styles from './Dashboard.module.css'
import { Account, ChainTypes } from '../../types'
import { Accounts } from './Accounts'
import { StateContext } from '../../utils/StateContext'
import { IdentityView } from '../../container/IdentityView/IdentityView'

export interface Props {
  accounts: Account[]
  bestBlock?: ChainTypes.BlockNumber
}

type RefreshPausedOverlayProps = {
  refreshPaused: boolean
}

const RefreshPausedOverlay: React.FC<RefreshPausedOverlayProps> = ({
  children,
  refreshPaused,
}) =>
  refreshPaused ? (
    <div className={styles.pauseOverlay} children={children} />
  ) : (
    <>{children}</>
  )

export const Dashboard: React.FC<Props> = ({ accounts, bestBlock }) => {
  const {
    state: { refreshPaused, account },
  } = useContext(StateContext)

  return (
    <div className={styles.dashboard}>
      <RefreshPausedOverlay refreshPaused={refreshPaused}>
        {account ? (
          <IdentityView bestBlock={bestBlock} />
        ) : (
          <div className={styles.accountsContainer}>
            <div className={styles.accounts}>
              <Accounts accounts={accounts} />
            </div>
          </div>
        )}
      </RefreshPausedOverlay>
    </div>
  )
}
