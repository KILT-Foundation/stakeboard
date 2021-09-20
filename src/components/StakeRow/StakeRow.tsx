import React, { useState } from 'react'
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
import { useTxSubmitter } from '../../utils/useTxSubmitter'
import { UnstakeRow } from '../UnstakeRow/UnstakeRow'

export interface Props {
  stakeInfo: DataStake
  accounts: Account[]
  collator: string
}

export const StakeRow: React.FC<Props> = ({
  stakeInfo,
  accounts,
  collator,
}) => {
  const { isVisible, showModal, hideModal } = useModal()
  const [editStake, setEditStake] = useState(false)
  const [newStake, setNewStake] = useState<number | undefined>()
  const signAndSubmitTx = useTxSubmitter()

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
    let tx
    if (!newStake || newStake === 0) {
      tx = await leaveDelegators()
    } else if (newStake > current) {
      const more = newStake - current
      const differenceInFemto = kiltToFemto(more)
      tx = await delegatorStakeMore(collator, differenceInFemto)
    } else if (newStake < current) {
      const less = current - newStake
      const differenceInFemto = kiltToFemto(less)
      tx = await delegatorStakeLess(collator, differenceInFemto)
    }

    if (tx) {
      await signAndSubmitTx(account.address, tx)
    }
  }

  const account = accounts.find(
    (account) => account.address === stakeInfo.account
  )

  if (!account) return null

  const handleStake = async () => {
    await changeStake(account, collator, stakeInfo.stake, newStake)
    hideModal()
    setEditStake(false)
  }

  const handleUnstake = async () => {
    setNewStake(0)
    showModal()
  }

  return (
    <>
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
              <>
                <Input
                  number
                  value={newStake?.toString() || ''}
                  onInput={(e) => setNewStake(parseInt(e.target.value))}
                />
              </>
            ) : (
              <span className={rowStyles.myStake}>
                {format(stakeInfo.stake)}
              </span>
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
            <Button
              label="APPLY"
              onClick={showModal}
              disabled={
                newStake === stakeInfo.stake ||
                Boolean(newStake && newStake < 0)
              }
            />
          )}
        </td>
        <td></td>
        <td></td>
      </tr>
      {editStake && <UnstakeRow handleUnstake={handleUnstake} />}
      {editStake && isVisible && newStake !== undefined && (
        <StakeModal
          modalStake={{
            name: account.name,
            address: account.address,
            newStake,
            staked: stakeInfo.stake,
          }}
          status={getStatus(newStake, stakeInfo.stake)}
          closeModal={hideModal}
          onConfirm={handleStake}
        />
      )}
    </>
  )
}
