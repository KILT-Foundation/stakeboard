import React, { useContext } from 'react'
import cx from 'classnames'
import { Collator } from '../Collator/Collator'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import rowStyles from '../../styles/row.module.css'
import { format, leftFillZero } from '../../utils'
import { Data } from '../../types'
import { StateContext } from '../../utils/StateContext'

// Max candidates will be changed at a later date. Smaller now for testing purposes.
const MAX_SELECTED_CANDIDATES = 5
export interface Props {
  entry: Data
  rank: number | undefined
  setExpanded: (expanded: boolean) => void
  expanded: boolean
}

export const CollatorRow: React.FC<Props> = ({
  entry,
  rank,
  setExpanded,
  expanded,
}) => {
  const { dispatch } = useContext(StateContext)

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
            <Icon type='fav_yellow' />
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation()
              dispatch({ type: 'favorize', id: entry.collator })
            }}
          >
            <Icon type='fav_gray' />
          </Button>
        )}

        <Collator address={entry.collator} />
      </td>
      <td>
        {entry.isLeaving ? (
          <Icon type='pickaxe_orange' pulsing={true} />
        ) : entry.active ? (
          <Icon type='pickaxe_yellow' />
        ) : (
          <Icon type='pickaxe_gray' />
        )}
        {entry.activeNext ? (
          <Icon type='next_session_yellow' />
        ) : (
          <Icon type='next_session_gray' />
        )}
      </td>
      <td>
        <span
          className={cx({
            [rowStyles.topRank]: rank && rank <= MAX_SELECTED_CANDIDATES,
            [rowStyles.candidatePool]: rank && rank > MAX_SELECTED_CANDIDATES,
          })}
        >
          {leftFillZero(rank, 3)}
        </span>
        {format(entry.totalStake)}
      </td>
      <td>{entry.lowestStake ? format(entry.lowestStake) : '--'}</td>
      <td>{leftFillZero(entry.delegators, 2)} / 25</td>
      <td>8.88 %</td>
      <td>
        {hasStakes ? (
          <Icon type='tokens_yellow' />
        ) : (
          <Icon type='tokens_gray' />
        )}
      </td>
      <td className={rowStyles.spacer}></td>
    </tr>
  )
}
