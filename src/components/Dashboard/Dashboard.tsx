import React, { useContext, useState } from 'react'
import styles from './Dashboard.module.css'
import { Account } from '../../types'
import { Accounts } from './Accounts'
import { StateContext } from '../../utils/StateContext'
import cx from 'classnames'
import { IdentityView } from '../../container/IdentityView/IdentityView'

export interface Props {
  accounts: Account[]
}

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
      <div
        className={cx(styles.accountsContainer, {
          [styles.pauseOverlay]: refreshPaused === true,
        })}
      />
      <div className={styles.accounts}>
        {openIdentityView === false ? (
          <Accounts
            accounts={accounts}
            toggleDetailedIdentityView={toggleDetailedIdentityView}
          />
        ) : (
          <IdentityView
            toggleDetailedIdentityView={toggleDetailedIdentityView}
          />
        )}
      </div>
    </div>
  )
}
