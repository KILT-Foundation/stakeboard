import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { IdentitySelector } from '../../container/IdentitySelector/IdentitySelector'
import { Account } from '../../types'
import { useModal } from '../../utils/UseModal'
import { DelegatorStakeModal } from '../DelegatorStakeModal/DelegatorStakeModal'

export interface Props {
  staked?: boolean
  accounts: Account[]
}

export const NewStakeRow: React.FC<Props> = ({ staked = false, accounts }) => {
  const [newStake, setNewStake] = useState('')
  const [address, setAddress] = useState('')
  const [account, setAccount] = useState<Account>()
  const [status, setStatus] = useState<
    'increaseStake' | 'decreaseStake' | 'unstake'
  >()

  useEffect(() => {
    if (!address) return
    const accountData = accounts.find((val) => val.address === address)
    if (!accountData) return
    setAccount(accountData)
  }, [address, accounts])

  useEffect(() => {
    if (!account) return
    if (newStake === '0') {
      setStatus('unstake')
    } else if (parseInt(newStake) < account.staked) {
      setStatus('decreaseStake')
    } else if (parseInt(newStake) > account.staked) {
      setStatus('increaseStake')
    }
  }, [newStake, account])

  const { isVisible, toggleModal } = useModal()
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
        {account && newStake && status && (
          <DelegatorStakeModal
            account={account}
            status={status}
            newStake={newStake}
            isVisible={isVisible}
            toggleModal={toggleModal}
            onConfirm={handleDelegatorStake}
          />
        )}
        <Button
          label={newStake === '0' ? 'Unstake' : 'Stake'}
          onClick={toggleModal}
          disabled={!(newStake && address)}
        />
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
