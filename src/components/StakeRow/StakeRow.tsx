import React, { useState } from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import { format } from '../../utils'
import { Account, DataStake } from '../../types'
import { Button } from '../Button/Button'
import { useModal } from '../../utils/useModal'
import { Input } from '../Input/Input'
import { getStatus } from '../../utils/stakeStatus'
import { StakeModal } from '../StakeModal/StakeModal'

export interface Props {
  stakeInfo: DataStake
  accounts: Account[]
}

export const StakeRow: React.FC<Props> = ({ stakeInfo, accounts }) => {
  const { isVisible, toggleModal } = useModal()
  const [editStake, setEditStake] = useState(false)
  const [newStake, setNewStake] = useState<number | undefined>()

  const handleEdit = () => {
    setEditStake(!editStake)
    setNewStake(stakeInfo.stake)
  }

  const handleStake = () => {
    toggleModal()
  }

  const account = accounts.find(
    (account) => account.address === stakeInfo.account
  )

  if (!account) return null

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
              onClick={handleStake}
              orangeButton
              disabled={newStake === stakeInfo.stake}
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
