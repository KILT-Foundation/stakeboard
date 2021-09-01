import React, { useState } from 'react'
import { Account, Data } from '../../types'
import styles from './CollatorListItem.module.css'
import rowStyles from '../../styles/row.module.css'
import { StakeRow } from '../StakeRow/StakeRow'
import { NewStakeRow } from '../NewStakeRow/NewStakeRow'
import { CollatorRow } from '../CollatorRow/CollatorRow'

export interface Props {
  entry: Data
  rank: number | undefined
  accounts: Account[]
}

const COLS = 7

export const CollatorListItem: React.FC<Props> = ({
  entry,
  rank,
  accounts,
}) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <tr className={styles.firstRow}></tr>
      <CollatorRow
        entry={entry}
        rank={rank}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      {entry.stakes.length > 0 && (
        <>
          {entry.stakes.map((stakeInfo) => (
            <StakeRow
              key={stakeInfo.account}
              stakeInfo={stakeInfo}
              accounts={accounts}
              collator={entry.collator}
            />
          ))}
          <NewStakeRow
            accounts={accounts}
            staked={true}
            collator={entry.collator}
          />
        </>
      )}
      {expanded && (
        <NewStakeRow accounts={accounts} collator={entry.collator} />
      )}
      <tr className={styles.lastRow}>
        <td className={rowStyles.spacer}></td>
        <td colSpan={COLS}></td>
        <td className={rowStyles.spacer}></td>
      </tr>
    </>
  )
}
