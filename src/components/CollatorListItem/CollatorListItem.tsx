import React, { useContext, useState } from 'react'
import { DataWithRank } from '../../types'
import styles from './CollatorListItem.module.css'
import rowStyles from '../../styles/row.module.css'
import { StakeRow } from '../StakeRow/StakeRow'
import { NewStakeRow } from '../NewStakeRow/NewStakeRow'
import { CollatorRow } from '../CollatorRow/CollatorRow'
import { StoredStateContext } from '../../utils/StoredStateContext'

export interface Props {
  entry: DataWithRank
}

const COLS = 7

export const CollatorListItem: React.FC<Props> = ({ entry }) => {
  const [expanded, setExpanded] = useState(false)
  const {
    state: { termsAccepted },
  } = useContext(StoredStateContext)
  return (
    <>
      <tr className={styles.firstRow}></tr>
      <CollatorRow
        entry={entry}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      {termsAccepted && entry.stakes.length > 0 && (
        <>
          {entry.stakes.map((stakeInfo) => (
            <StakeRow
              key={stakeInfo.account}
              stakeInfo={stakeInfo}
              collator={entry.collator}
            />
          ))}
          {<NewStakeRow staked={true} collator={entry.collator} />}
        </>
      )}
      {termsAccepted && expanded && entry.stakes.length === 0 && (
        <NewStakeRow collator={entry.collator} />
      )}
      <tr className={styles.lastRow}>
        <td className={rowStyles.spacer}></td>
        <td colSpan={COLS}></td>
        <td className={rowStyles.spacer}></td>
      </tr>
    </>
  )
}
