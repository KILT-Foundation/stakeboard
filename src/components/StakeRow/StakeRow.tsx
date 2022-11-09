import React, { useContext, useEffect, useState } from 'react'
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
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'

export interface Props {
  stakeInfo: DataStake
  collator: string
}

export const StakeRow: React.FC<Props> = ({ stakeInfo, collator }) => {
  const { isVisible, showModal, hideModal } = useModal()
  const [editStake, setEditStake] = useState(false)
  const [newStake, setNewStake] = useState<number | undefined>()
  const [stakeable, setStakeable] = useState<number>()
  const signAndSubmitTx = useTxSubmitter()
  const { accounts, minDelegatorStake } = useContext(BlockchainDataContext)

  const handleEdit = () => {
    setEditStake(!editStake)
    setNewStake(stakeInfo.stake)
  }
  const changeStake = async (
    account: Account,
    current: number,
    newStake: number | undefined
  ) => {
    let tx
    if (!newStake || newStake === 0) {
      tx = await leaveDelegators()
    } else if (newStake > current) {
      const more = newStake - current
      const differenceInFemto = kiltToFemto(more)
      tx = await delegatorStakeMore(differenceInFemto)
    } else if (newStake < current) {
      const less = current - newStake
      const differenceInFemto = kiltToFemto(less)
      tx = await delegatorStakeLess(differenceInFemto)
    }

    if (tx) {
      await signAndSubmitTx(account.address, tx)
    }
  }

  const account = accounts.find(
    (account) => account.address === stakeInfo.account
  )
  useEffect(() => {
    if (!account || !newStake) return
    setStakeable(account.stakeable + account.staked - newStake)
  }, [account, newStake])

  if (!account) return null

  const handleStake = async () => {
    await changeStake(account, stakeInfo.stake, newStake)
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
            <span>NEW STAKE</span>
            {editStake ? (
              <>
                <Input
                  number
                  value={newStake?.toString() || ''}
                  onInput={(e) => {
                    return Number(e.target.value) <
                      account.stakeable + account.staked
                      ? setNewStake(parseInt(e.target.value))
                      : 0
                  }}
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
              {format(stakeable ? stakeable : account.stakeable)}
            </span>
          </div>
        </td>
        <td>
          {!editStake ? (
            <Button label="CHANGE" onClick={handleEdit} />
          ) : (
            <Button
              label="APPLY"
              onClick={showModal}
              disabled={
                newStake === stakeInfo.stake ||
                Boolean(
                  minDelegatorStake && newStake && newStake < minDelegatorStake
                )
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
          collatorAddress={collator}
          newStake={newStake}
          status={getStatus(newStake, stakeInfo.stake)}
          closeModal={hideModal}
          onConfirm={handleStake}
        />
      )}
    </>
  )
}
