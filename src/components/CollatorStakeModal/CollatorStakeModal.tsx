// import { useEffect, useState } from 'react'
import { Modal } from 'react-dialog-polyfill'
import { Stake } from '../../types'
import styles from '../../styles/modal.module.css'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { shortenAddress } from '../../utils/shortenAddress'
// import { Input } from '../Input/Input'
export interface Props {
  stakeInfo: Stake
  toggleModal: any
  isVisible: boolean
  newStake: number
  onConfirm: () => void
  status: 'increaseStake' | 'decreaseStake' | 'unstake'
}

export const CollatorStakeModal: React.FC<Props> = ({
  stakeInfo,
  toggleModal,
  isVisible,
  newStake,
  onConfirm,
  status,
}) => {
  const shortAddress = shortenAddress(stakeInfo.account.address)

  const NOTES_MESSAGE = (
    <span className={styles.noteWrapper}>
      Note: <br />
      You can withdraw <br />
      the unstaked amount after 7 days <br />
      (see progress in your dashboard) <br />
      or use the unstaked balance immediately to back a Collator
    </span>
  )

  const modals = {
    increaseStake: (
      <>
        <div className={styles.modalTitleWrapper}>
          <span className={styles.modalTitle}> INCREASE STAKE</span>
          <Icon type='skateboarder' width={35} />
        </div>
        <div className={styles.textWrapper}>
          Do you want to increase the stake of <br />
          Collator {shortAddress} <br />
          (new staked amount <br />
          {newStake} from {stakeInfo.account.name})?
          {NOTES_MESSAGE}
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={toggleModal} label='CANCEL' />
          <Button onClick={onConfirm} label='STAKE' orangeButton={true} />
        </div>
      </>
    ),
    decreaseStake: (
      <>
        <div className={styles.modalTitleWrapper}>
          <span className={styles.modalTitle}> DECREASE STAKE</span>
          <Icon type='skateboarder' width={35} />
        </div>
        <div className={styles.textWrapper}>
          Do you want to decrease the stake of <br />
          Collator {shortAddress} <br />
          (new staked amount <br />
          {newStake} from {stakeInfo.account.name})?
          {NOTES_MESSAGE}
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={toggleModal} label='CANCEL' />
          <Button onClick={onConfirm} label='STAKE' orangeButton={true} />
        </div>
      </>
    ),
    unstake: (
      <>
        <div className={styles.modalTitleWrapper}>
          <span className={styles.modalTitle}> UNSTAKE</span>
          <Icon type='skateboarder' width={35} />
        </div>
        <div className={styles.textWrapper}>
          Do you want to stop staking <br />
          Collator {shortAddress} <br />
          (unstake {newStake} from {stakeInfo.account.name})?
          {NOTES_MESSAGE}
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={toggleModal} label='CANCEL' />
          <Button onClick={onConfirm} label='UNSTAKE' orangeButton={true} />
        </div>
      </>
    ),
  }

  if (!isVisible) return null

  return (
    <div className={styles.modalOverlay}>
      <Modal open={isVisible} className={styles.modal}>
        {modals[status]}
      </Modal>
    </div>
  )
}
