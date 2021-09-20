import React, { useContext, useState } from 'react'
import { Account, Data } from '../../types'
import styles from './CollatorListItem.module.css'
import rowStyles from '../../styles/row.module.css'
import { StakeRow } from '../StakeRow/StakeRow'
import { NewStakeRow } from '../NewStakeRow/NewStakeRow'
import { CollatorRow } from '../CollatorRow/CollatorRow'
import { StoredStateContext } from '../../utils/StoredStateContext'

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
  const {
    state: { termsAccepted },
  } = useContext(StoredStateContext)
  return (
    <>
      <tr className={styles.firstRow}></tr>
      <CollatorRow
        entry={entry}
        rank={rank}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      {termsAccepted && entry.stakes.length > 0 && (
        <>
          {entry.stakes.map((stakeInfo) => (
            <StakeRow
              key={stakeInfo.account}
              stakeInfo={stakeInfo}
              accounts={accounts}
              collator={entry.collator}
            />
          ))}
          {
            <NewStakeRow
              accounts={accounts}
              staked={true}
              collator={entry.collator}
            />
          }
        </>
      )}
      {termsAccepted && expanded && (
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
