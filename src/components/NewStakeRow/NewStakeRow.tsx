import React, { useState } from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { IdentitySelector } from '../../container/IdentitySelector/IdentitySelector'
import { Account } from '../../types'

export interface Props {
  staked?: boolean
  accounts: Account[]
}

export const NewStakeRow: React.FC<Props> = ({ staked = false, accounts }) => {
  const [newStake, setNewStake] = useState('')
  const [account, setAccount] = useState('')
  return (
    <tr
      className={cx(rowStyles.row, rowStyles.stakeRow, {
        [rowStyles.staked]: staked,
      })}
    >
      <td></td>
      <td></td>
      <td></td>
      <td className={rowStyles.column}>
        <div className={rowStyles.wrapper}>
          STAKE COLLATOR FROM
          <span className={rowStyles.padTop10} />
          <IdentitySelector
            accounts={accounts}
            onChange={(val) => setAccount(val?.value || '')}
          />
        </div>
      </td>
      <td className={rowStyles.column}>
        <div className={rowStyles.wrapper}>
          MY STAKE
          <span className={rowStyles.padTop10} />
          <Input
            number
            value={newStake}
            onInput={(e) => setNewStake(e.currentTarget.value)}
          />
        </div>
      </td>
      <td>
        <div className={rowStyles.wrapper}>
          NOTE
          <span className={rowStyles.informationBox}>
            Staked amounts can be withdrawn after 7 days.
          </span>
        </div>
      </td>
      <td>
        <Button label='Stake' disabled={!(newStake && account)} />
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
