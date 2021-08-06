import { useEffect, useState } from 'react'
import { Modal } from 'react-dialog-polyfill'
import { Stake } from '../../types'
import styles from '../../styles/modal.module.css'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { ShortenAddress } from '../../utils/shortenAddress'
import { Input } from '../Input/Input'

export interface Props {
  stakeInfo: Stake
  toggleModal: any
  isVisible: boolean
}

export const CollatorStakeModal: React.FC<Props> = ({
  stakeInfo,
  toggleModal,
  isVisible,
}) => {
  const shortAddress = ShortenAddress(stakeInfo.account.address)
  const [newStake, setNewStake] = useState('')
  const [status, setStatus] = useState<
    'increaseStake' | 'decreaseStake' | 'unstake'
  >('increaseStake')

  useEffect(() => {
    if (newStake === '0') {
      setStatus('unstake')
    } else if (parseInt(newStake) < stakeInfo.stake) {
      setStatus('decreaseStake')
    } else if (parseInt(newStake) > stakeInfo.stake) {
      setStatus('increaseStake')
    }
  }, [newStake, stakeInfo])

  const onConfirm = () => {
    if (!newStake) return
    toggleModal()
  }

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
          (new staked amount <br />
          {newStake} from {stakeInfo.account.name})?
          <div>
            <Input
              number
              value={newStake}
              onInput={(e) => setNewStake(e.currentTarget.value)}
            />
          </div>
          {NOTES_MESSAGE}
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={toggleModal} label='CANCEL' />
          <Button onClick={onConfirm} label='STAKE' />
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
          <div>
            <Input
              number
              value={newStake}
              onInput={(e) => setNewStake(e.currentTarget.value)}
            />
          </div>
          {NOTES_MESSAGE}
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={toggleModal} label='CANCEL' />
          <Button onClick={onConfirm} label='STAKE' />
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
          (unstake {stakeInfo.account} from {stakeInfo.account.name})?
          <div>
            <Input
              number
              value={newStake}
              onInput={(e) => setNewStake(e.currentTarget.value)}
            />
          </div>
          {NOTES_MESSAGE}
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={toggleModal} label='CANCEL' />
          <Button onClick={onConfirm} label='UNSTAKE' />
        </div>
      </>
    ),
  }

  return isVisible ? (
    <div className={styles.modalOverlay}>
      <Modal open={isVisible} className={styles.modal}>
        {modals[status]}
      </Modal>
    </div>
  ) : null
}
