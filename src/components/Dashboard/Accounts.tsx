import React, { useContext } from 'react'
import styles from './Accounts.module.css'
import { Account, AccountWithPct } from '../../types'
import { TokenBar } from './TokenBar'
import { MetaDown, MetaUp } from './Meta'
import { UnusedMeta } from './Meta'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'

export interface UnusedAccountsProps {
  accounts: Account[]
  down?: boolean
}
export const UnusedAccounts: React.FC<UnusedAccountsProps> = ({
  accounts,
  down,
}) => {
  if (!accounts.length) return null
  const total = accounts.reduce((prev, curr) => prev + curr.stakeable, 0)
  return (
    <span className={styles.account}>
      {!down && <UnusedMeta accounts={accounts} total={total} down={false} />}
      <TokenBar stakeable={total} staked={0} down={down} />
      {down && <UnusedMeta accounts={accounts} total={total} down={true} />}
    </span>
  )
}

export const Accounts: React.FC = () => {
  const { accounts } = useContext(BlockchainDataContext)
  const usedAccounts = accounts.filter((account) => account.used)
  const unusedAccounts = accounts.filter((account) => !account.used)

  return (
    <div className={styles.accounts}>
      {usedAccounts.map((account, index) => {
        const total = account.staked + account.stakeable
        const stakedPct = ((account.staked / total) * 100).toFixed(1)
        const stakeablePct = ((account.stakeable / total) * 100).toFixed(1)
        const accountWithPct: AccountWithPct = {
          ...account,
          total,
          stakedPct,
          stakeablePct,
        }
        return (
          <React.Fragment key={account.address}>
            <span className={styles.account}>
              {index % 2 === 0 && (
                <>
                  <MetaUp account={accountWithPct} />
                </>
              )}
              <TokenBar
                staked={account.staked}
                stakeable={account.stakeable}
                down={index % 2 !== 0}
              />
              {index % 2 !== 0 && (
                <>
                  <MetaDown account={accountWithPct} />
                </>
              )}
            </span>
          </React.Fragment>
        )
      })}
      <UnusedAccounts
        accounts={unusedAccounts}
        down={usedAccounts.length % 2 !== 0}
      />
    </div>
  )
}
