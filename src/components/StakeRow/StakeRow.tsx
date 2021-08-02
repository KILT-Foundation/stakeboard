import React from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import { format } from '../../utils'
import { Stake } from '../../types'
import { Button } from '../Button/Button'

export interface Props {
  stakeInfo: Stake
}

export const StakeRow: React.FC<Props> = ({ stakeInfo }) => {
  return (
    <tr className={cx(rowStyles.row, rowStyles.stakeRow, rowStyles.staked)}>
      <td className={rowStyles.spacer}></td>
      <td></td>
      <td></td>
      <td>
        <div className={rowStyles.wrapper}>
          <span>COLLATOR STAKE FROM</span>
          <span className={rowStyles.identityStaked}>
            {stakeInfo.account.name}
          </span>
        </div>
      </td>
      <td>
        <div className={rowStyles.wrapper}>
          <span>MY STAKE</span>
          <span className={rowStyles.myStake}>{format(stakeInfo.stake)}</span>
        </div>
      </td>
      <td>
        <div className={rowStyles.wrapper}>
          <span>STAKEABLE</span>
          <span className={rowStyles.stakeable}>
            {format(stakeInfo.account.available)}
          </span>
        </div>
      </td>
      <td>
        <Button label='Edit' />
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
