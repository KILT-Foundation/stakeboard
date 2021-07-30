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
      <td>
        STAKE COLLATOR FROM
        <IdentitySelector
          accounts={accounts}
          onChange={(val) => setAccount(val?.value || '')}
        />
      </td>
      <td className={rowStyles.column}>
        MY STAKE  
        <Input
          number
          value={newStake}
          onInput={(e) => setNewStake(e.currentTarget.value)}
        />
      </td>
      <td>NOTE Staked amounts can be withdrawn after 7 days.</td>
      <td>
        <Button label='Stake' disabled={!(newStake && account)} />
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
