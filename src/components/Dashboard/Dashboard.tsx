import React, { useContext, useState } from 'react'
import styles from './Dashboard.module.css'
import { Account } from '../../types'
import { Accounts } from './Accounts'
import { StateContext } from '../../utils/StateContext'
import { IdentityView } from '../../container/IdentityView/IdentityView'

export interface Props {
  accounts: Account[]
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

export const Dashboard: React.FC<Props> = ({ accounts }) => {
  const {
    state: { refreshPaused },
  } = useContext(StateContext)
  const [openIdentityView, setOpenIdentityView] = useState(false)

  const toggleDetailedIdentityView = () => {
    setOpenIdentityView(!openIdentityView)
  }

  return (
    <div className={styles.dashboard}>
      <RefreshPausedOverlay refreshPaused={refreshPaused}>
        {openIdentityView === false ? (
          <div className={styles.accountsContainer}>
            <div className={styles.accounts}>
              <Accounts
                accounts={accounts}
                toggleDetailedIdentityView={toggleDetailedIdentityView}
              />
            </div>
          </div>
        ) : (
          <IdentityView
            toggleDetailedIdentityView={toggleDetailedIdentityView}
          />
        )}
      </RefreshPausedOverlay>
    </div>
  )
}
