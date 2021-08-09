import { Modal } from 'react-dialog-polyfill'
import { ModalStake } from '../../types'
import styles from '../../styles/modal.module.css'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { shortenAddress } from '../../utils/shortenAddress'

export interface Props {
  modalStake: ModalStake
  onConfirm: () => void
  toggleModal: () => void
  isVisible: boolean
  status: 'increaseStake' | 'decreaseStake' | 'unstake'
}

export const StakeModal: React.FC<Props> = ({
  modalStake,
  onConfirm,
  toggleModal,
  isVisible,
  status,
}) => {
  const shortAddress = shortenAddress(modalStake.address)

  const NOTES_MESSAGE = (
    <span className={styles.noteWrapper}>
      Note: <br />
      You can withdraw <br />
      the unstaked amount after 7 days <br />
      (see progress in your dashboard) <br />
      or use the unstaked balance immedietaly to back a Collator
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
          (new staked amount {modalStake.newStake} <br />
          from {modalStake.name})?
          {NOTES_MESSAGE}
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={toggleModal} label='CANCEL' />
          <Button onClick={onConfirm} label='STAKE' orangeButton />
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
          (new staked amount {modalStake.newStake} <br />
          from {modalStake.name})?
          {NOTES_MESSAGE}
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={toggleModal} label='CANCEL' />
          <Button onClick={onConfirm} label='STAKE' orangeButton />
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
          (unstake {modalStake?.staked} <br />
          from {modalStake.name})?
          {NOTES_MESSAGE}
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={toggleModal} label='CANCEL' />
          <Button onClick={onConfirm} label='UNSTAKE' orangeButton />
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
