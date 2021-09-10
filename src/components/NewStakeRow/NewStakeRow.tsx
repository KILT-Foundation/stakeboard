import React, { useContext, useMemo, useState } from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { IdentitySelector } from '../../container/IdentitySelector/IdentitySelector'
import { Account } from '../../types'
import { useModal } from '../../utils/useModal'
import { StakeModal } from '../StakeModal/StakeModal'
import { getStatus } from '../../utils/stakeStatus'
import { joinDelegators } from '../../utils'
import { kiltToFemto } from '../../utils/conversion'
import { StateContext } from '../../utils/StateContext'

export interface Props {
  staked?: boolean
  accounts: Account[]
  collator: string
}

async function stake(
  account: Account,
  collator: string,
  amount: number,
  onSuccess: () => void,
  onError: (error: Error) => void
) {
  const amountInFemto = kiltToFemto(amount)
  return joinDelegators(
    account.address,
    collator,
    amountInFemto,
    onSuccess,
    onError
  )
}

export const NewStakeRow: React.FC<Props> = ({
  staked = false,
  accounts,
  collator,
}) => {
  const { isVisible, toggleModal } = useModal()
  const { dispatch } = useContext(StateContext)
  const [newStake, setNewStake] = useState<number | undefined>()
  const [address, setAddress] = useState('')
  const account = useMemo(() => {
    if (!address) return undefined
    return accounts.find((val) => val.address === address)
  }, [address, accounts])

  const onSuccess = () => {
    console.log('success', new Date().getTime())
  }
  const onError = (error: any) => {
    dispatch({ type: 'handleError', error: true, errorInfo: error })
  }

  const handleDelegatorStake = async () => {
    if (!account) throw new Error('No account selected')
    if (!newStake) throw new Error('No amount given')
    await stake(account, collator, newStake, onSuccess, onError)
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
        {account && isVisible && newStake !== undefined && newStake >= 0 && (
          <StakeModal
            modalStake={{
              name: account.name,
              address: account.address,
              newStake,
            }}
            status={getStatus(newStake, account.staked)}
            toggleModal={toggleModal}
            onConfirm={handleDelegatorStake}
          />
        )}
        <Button
          label={'Stake'}
          onClick={toggleModal}
          disabled={!(address && newStake !== undefined && newStake > 0)}
        />
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
