import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { IdentitySelector } from '../../container/IdentitySelector/IdentitySelector'
import { Account } from '../../types'
import { useModal } from '../../utils/useModal'
import { DelegatorStakeModal } from '../DelegatorStakeModal/DelegatorStakeModal'
import { getStatus } from '../../utils/stakeStatus'

export interface Props {
  staked?: boolean
  accounts: Account[]
}

export const NewStakeRow: React.FC<Props> = ({ staked = false, accounts }) => {
  const { isVisible, toggleModal } = useModal()
  const [newStake, setNewStake] = useState<number | undefined>()
  const [address, setAddress] = useState('')
  const [account, setAccount] = useState<Account>()

  useMemo(() => {
    if (!address) return
    const accountData = accounts.find((val) => val.address === address)
    if (!accountData) return
    setAccount(accountData)
  }, [address, accounts])

  const handleDelegatorStake = () => {
    toggleModal()
  }

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
            onChange={(val) => setAddress(val?.value || '')}
          />
        </div>
      </td>
      <td className={rowStyles.column}>
        <div className={rowStyles.wrapper}>
          MY STAKE
          <span className={rowStyles.padTop10} />
          <Input
            number
            value={newStake?.toString() || ''}
            onInput={(e) => setNewStake(parseInt(e.target.value))}
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
        {account && typeof newStake !== 'undefined' && newStake >= 0 && (
          <DelegatorStakeModal
            account={account}
            status={getStatus(newStake, account.staked)}
            newStake={newStake}
            isVisible={isVisible}
            toggleModal={toggleModal}
            onConfirm={handleDelegatorStake}
          />
        )}
        <Button
          label={newStake === 0 ? 'Unstake' : 'Stake'}
          onClick={toggleModal}
          disabled={
            !address && typeof newStake !== 'undefined' && newStake >= 0
          }
        />
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
