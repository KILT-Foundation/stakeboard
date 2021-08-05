import { Modal } from 'react-dialog-polyfill'
import { Account } from '../../types'
import styles from '../../styles/modal.module.css'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'

export interface Props {
  account: Account | string
  onConfirm: () => void
  toggleModal: any
  isVisible: boolean
}

export const DelegatorStakeModal: React.FC<Props> = ({
  account,
  onConfirm,
  toggleModal,
  isVisible,
}) => {
  return isVisible ? (
    <div className={styles.modalOverlay} onClick={toggleModal}>
      <Modal open={isVisible} className={styles.modal}>
        <div className={styles.modalTitleWrapper}>
          <span className={styles.modalTitle}> Fucking STAKING!</span>
          <Icon type='skateboarder' width={35} />
        </div>
        <div className={styles.textWrapper}>
          <span className={styles.noteWrapper}>
            Note: <br />
            You can withdraw <br />
            the unstaked amount after 7 days <br />
            (see progress in your dashboard) <br />
            or use the unstaked balance immedietaly to back a Collator
          </span>
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={toggleModal} label='CANCEL' />
          <Button onClick={onConfirm} label='Unstake' />
        </div>
      </Modal>
    </div>
  ) : null
}
