import React, { useContext, useState } from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import {
  delegatorStakeLess,
  delegatorStakeMore,
  format,
  leaveDelegators,
} from '../../utils'
import { Account, DataStake } from '../../types'
import { Button } from '../Button/Button'
import { useModal } from '../../utils/useModal'
import { Input } from '../Input/Input'
import { getStatus } from '../../utils/stakeStatus'
import { StakeModal } from '../StakeModal/StakeModal'
import { kiltToFemto } from '../../utils/conversion'
import { StateContext } from '../../utils/StateContext'

export interface Props {
  stakeInfo: DataStake
  accounts: Account[]
  collator: string
}

export function stakeMore(
  account: Account,
  collator: string,
  difference: number,
  onSuccess: () => void,
  onError: (error: Error) => void
) {
  const differenceInFemto = kiltToFemto(difference)
  return delegatorStakeMore(
    account.address,
    collator,
    differenceInFemto,
    onSuccess,
    onError
  )
}

export async function stakeLess(
  account: Account,
  collator: string,
  difference: number,
  onSuccess: () => void,
  onError: (error: Error) => void
) {
  const differenceInFemto = kiltToFemto(difference)
  return delegatorStakeLess(
    account.address,
    collator,
    differenceInFemto,
    onSuccess,
    onError
  )
}

export function unstake(
  account: Account,
  onSuccess: () => void,
  onError: (error: Error) => void
) {
  return leaveDelegators(account.address, onSuccess, onError)
}

export const StakeRow: React.FC<Props> = ({
  stakeInfo,
  accounts,
  collator,
}) => {
  const { dispatch } = useContext(StateContext)
  const { isVisible, toggleModal } = useModal()
  const [editStake, setEditStake] = useState(false)
  const [newStake, setNewStake] = useState<number | undefined>()

  const onSuccess = () => {
    console.log('success', new Date().getTime())
  }
  const onError = (error: any) => {
    dispatch({ type: 'handleError', error: true, errorInfo: error })
  }

  const handleEdit = () => {
    setEditStake(!editStake)
    setNewStake(stakeInfo.stake)
  }
  const changeStake = async (
    account: Account,
    collator: string,
    current: number,
    newStake: number | undefined
  ) => {
    if (!newStake || newStake === 0) {
      await unstake(account, onSuccess, onError)
    } else if (newStake > current) {
      await stakeMore(account, collator, newStake - current, onSuccess, onError)
    } else if (newStake < current) {
      await stakeLess(account, collator, current - newStake, onSuccess, onError)
    }
  }

  const account = accounts.find(
    (account) => account.address === stakeInfo.account
  )

  if (!account) return null

  const handleStake = async () => {
    await changeStake(account, collator, stakeInfo.stake, newStake)
    toggleModal()
    setEditStake(false)
  }

  return (
    <tr className={cx(rowStyles.row, rowStyles.stakeRow, rowStyles.staked)}>
      <td className={rowStyles.spacer}></td>
      <td></td>
      <td></td>
      <td>
        <div className={rowStyles.wrapper}>
          <span>COLLATOR STAKE FROM</span>
          <span className={rowStyles.identityStaked}>{account.name}</span>
        </div>
      </td>
      <td>
        <div className={rowStyles.wrapper}>
          <span>MY STAKE</span>
          {editStake ? (
            <div>
              <Input
                number
                value={newStake?.toString() || ''}
                onInput={(e) => setNewStake(parseInt(e.target.value))}
              />
            </div>
          ) : (
            <span className={rowStyles.myStake}>{format(stakeInfo.stake)}</span>
          )}
        </div>
      </td>
      <td>
        <div className={rowStyles.wrapper}>
          <span>STAKEABLE</span>
          <span className={rowStyles.stakeable}>
            {format(account.stakeable)}
          </span>
        </div>
      </td>
      <td>
        {!editStake ? (
          <Button label="Edit" onClick={handleEdit} />
        ) : (
          <>
            <Button label="CLOSE" onClick={handleEdit} />
            <Button
              label="CONFIRM"
              onClick={toggleModal}
              orangeButton
              disabled={
                newStake === stakeInfo.stake ||
                Boolean(newStake && newStake < 0)
              }
            />
          </>
        )}

        {editStake && isVisible && newStake !== undefined && (
          <StakeModal
            modalStake={{
              name: account.name,
              address: account.address,
              newStake,
              staked: stakeInfo.stake,
            }}
            status={getStatus(newStake, stakeInfo.stake)}
            toggleModal={toggleModal}
            onConfirm={handleStake}
          />
        )}
      </td>
      <td></td>
      <td></td>
    </tr>
  )
}
