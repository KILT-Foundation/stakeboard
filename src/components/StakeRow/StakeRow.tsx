import React, { useState } from 'react'
import cx from 'classnames'
import rowStyles from '../../styles/row.module.css'
import { format } from '../../utils'
import { Stake } from '../../types'
import { Button } from '../Button/Button'
import { useModal } from '../../utils/useModal'
import { CollatorStakeModal } from '../CollatorStakeModal/CollatorStakeModal'
import { Input } from '../Input/Input'
import { getStatus } from '../../utils/stakeStatus'

export interface Props {
  stakeInfo: Stake
}

export const StakeRow: React.FC<Props> = ({ stakeInfo }) => {
  const { isVisible, toggleModal } = useModal()
  const [editStake, setEditStake] = useState(false)
  const [newStake, setNewStake] = useState<number | undefined>()

  const handleEdit = () => {
    setEditStake(!editStake)
  }

  const handleStake = () => {
    toggleModal()
  }

  return (
    <tr className={cx(rowStyles.row, rowStyles.stakeRow, rowStyles.staked)}>
      <td className={rowStyles.spacer}></td>
      <td></td>
      <td></td>
      <td>
        <div className={rowStyles.wrapper}>
          <span>COLLATOR STAKE FROM</span>
          <span className={rowStyles.identityStaked}>
            {stakeInfo.account.name}
          </span>
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
            {format(stakeInfo.account.available)}
          </span>
        </div>
      </td>
      <td>
        {!editStake ? (
          <Button label='Edit' onClick={handleEdit} />
        ) : (
          <>
            <Button label='CLOSE' onClick={handleEdit} />
            <Button label='CONFIRM' onClick={handleStake} orangeButton />
          </>
        )}

        {editStake && newStake !== undefined && newStake >= 0 && (
          <CollatorStakeModal
            newStake={newStake}
            status={getStatus(newStake, stakeInfo.stake)}
            stakeInfo={stakeInfo}
            isVisible={isVisible}
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
