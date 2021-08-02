import React from 'react'
import styles from './AccountInfo.module.css'
import { format } from '../../utils'
import { AccountWithPct } from '../../types'

export interface AccountInfoProps {
  account: AccountWithPct
}
export const AccountInfo: React.FC<AccountInfoProps> = ({ account }) => {
  return (
    <div className={styles.info}>
      <div className={styles.name}>{account.name}</div>
      <div>
        <span className={styles.stakeLabel}>MY STAKE: </span>
        <span className={styles.myStakeValue}>
          {format(account.staked)} ({account.stakedPct}%)
        </span>
      </div>
      <div>
        <span className={styles.stakeLabel}>STAKEABLE: </span>
        <span className={styles.availableStakeValue}>
          {format(account.stakeable)} {account.stakeablePct}%
        </span>
      </div>
    </div>
  )
}
