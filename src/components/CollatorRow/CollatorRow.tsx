import React, { useContext } from 'react'
import cx from 'classnames'
import { Collator } from '../Collator/Collator'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import rowStyles from '../../styles/row.module.css'
import { format, leftFillZero } from '../../utils'
import { DataWithRank } from '../../types'
import { StoredStateContext } from '../../utils/StoredStateContext'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'

export interface Props {
  entry: DataWithRank
  setExpanded: (expanded: boolean) => void
  expanded: boolean
}

export const CollatorRow: React.FC<Props> = ({
  entry,
  setExpanded,
  expanded,
}) => {
  const { dispatch } = useContext(StoredStateContext)
  const { maxCandidateCount, maxNumberDelegators } = useContext(
    BlockchainDataContext
  )

  const hasStakes = entry.stakes.length

  return (
    <tr
      className={cx(rowStyles.row, {
        [rowStyles.staked]: hasStakes,
        [rowStyles.expandable]: !hasStakes,
      })}
      onClick={() => {
        if (!hasStakes) {
          setExpanded(!expanded)
        }
      }}
    >
      <td className={rowStyles.spacer}></td>
      <td>
        {entry.favorite ? (
          <Button
            onClick={(e) => {
              e.stopPropagation()
              dispatch({ type: 'unfavorize', id: entry.collator })
            }}
          >
            <Icon type="fav_yellow" />
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation()
              dispatch({ type: 'favorize', id: entry.collator })
            }}
          >
            <Icon type="fav_gray" />
          </Button>
        )}

        <Collator address={entry.collator} />
      </td>
      <td>
        {entry.isLeaving ? (
          <Icon
            type="pickaxe_orange"
            pulsing={true}
            alt="leaving"
            tooltip="Leaving and won't build blocks soon."
          />
        ) : entry.active ? (
          <Icon
            type="pickaxe_yellow"
            alt="active"
            tooltip="Ready to build blocks."
          />
        ) : (
          <Icon
            type="pickaxe_gray"
            alt="waiting"
            tooltip="Waiting to become a collator."
          />
        )}
        {entry.activeNext ? (
          <Icon type="next_session_yellow" />
        ) : (
          <Icon type="next_session_gray" />
        )}
      </td>
      <td>
        <span
          className={cx(rowStyles.rank, {
            [rowStyles.topRank]:
              entry.rank &&
              maxCandidateCount &&
              entry.rank <= maxCandidateCount,
            [rowStyles.candidatePool]:
              entry.rank && maxCandidateCount && entry.rank > maxCandidateCount,
          })}
        >
          {leftFillZero(entry.rank, 3)}
        </span>
        {format(entry.totalStake)}
      </td>
      <td>{entry.lowestStake ? format(entry.lowestStake) : '--'}</td>
      <td colSpan={2}>
        {leftFillZero(entry.delegators, 2)}
        {!!maxNumberDelegators &&
          ` / 
          ${maxNumberDelegators}`}
      </td>

      <td>
        {hasStakes ? (
          <Icon type="tokens_yellow" />
        ) : (
          <Icon type="tokens_gray" />
        )}
      </td>
      <td className={rowStyles.spacer}></td>
    </tr>
  )
}
