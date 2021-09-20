import React from 'react'
import cx from 'classnames'
import { Button } from '../Button/Button'
import rowStyles from '../../styles/row.module.css'

export interface UnstakeRowProps {
  handleUnstake: () => void
}

export const UnstakeRow: React.FC<UnstakeRowProps> = ({ handleUnstake }) => {
  return (
    <tr className={cx(rowStyles.row, rowStyles.stakeRow, rowStyles.staked)}>
      <td className={rowStyles.spacer}></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <div className={rowStyles.wrapper}>
          <span>OR UNSTAKE COLLATOR</span>
          <span className={rowStyles.informationBox}>
            (note: you can withdraw the unstaked amount in 7 days, but it can be
            used for staking other collators immediately)
          </span>
        </div>
      </td>
      <td>
        <Button label="unstake" onClick={handleUnstake} orangeButton />
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
