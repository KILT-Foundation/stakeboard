import React, { useState } from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { IdentitySelector } from '../../container/IdentitySelector/IdentitySelector'
import { Account } from '../../types'
import { useModal } from '../../container/Modal/UseModal'
import { Modal } from '../../container/Modal/Modal'

export interface Props {
  staked?: boolean
  accounts: Account[]
}

const information = {
  stakeMore: {
    title: 'Increase Staked Amount',
    text: 'Do you want to increase the staked amount for',
  },

  stakeLess: {
    title: 'Decrease Staked Amount',
    text: 'Do you want to decrease the staked amount for',
  },

  unstake: {
    title: 'Unstake Collator',
    text: 'Do you want to stop staking for',
  },
}

export const NewStakeRow: React.FC<Props> = ({ staked = false, accounts }) => {
  const [newStake, setNewStake] = useState('')
  const [account, setAccount] = useState('')
  const { isVisible, toggleModal } = useModal()

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
        <Modal
          isVisible={isVisible}
          toggleModal={toggleModal}
          text={information.stakeLess}
          data={newStake}
        />
        <Button label='Stake' onClick={toggleModal} />
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
