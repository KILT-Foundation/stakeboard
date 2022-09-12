import React, { useContext } from 'react'
import styles from './AccountInfo.module.css'
import { format } from '../../utils'
import { AccountWithPct } from '../../types'
import { Button } from '../Button/Button'
import { StateContext } from '../../utils/StateContext'

export interface AccountInfoProps {
  account: AccountWithPct
}
export const AccountInfo: React.FC<AccountInfoProps> = ({ account }) => {
  const { dispatch } = useContext(StateContext)
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
      <div>
        <span className={styles.stakeLabel}>CLAIMABLE REWARDS: </span>
        <span className={styles.stakingRewardsValue}>{format(account.rewards)}</span>
      </div>
      <div className={styles.detailsButton}>
        <Button
          onClick={() => {
            dispatch({ type: 'selectAccount', account })
          }}
          label={'details'}
        />
      </div>
    </div>
  )
}
