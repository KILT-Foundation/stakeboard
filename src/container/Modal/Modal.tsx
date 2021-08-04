import styles from './Modal.module.css'
import { Icon } from '../../components/Icon/Icon'
import { Button } from '../../components/Button/Button'
import { Account } from '../../types'
export interface Props {
  isVisible: boolean
  toggleModal: any
  text: {
    title: string
    text: string
  }
  onConfirm: () => void
  label: string
  account?: Account
}

export const Modal: React.FC<Props> = ({
  isVisible,
  toggleModal,
  text,
  onConfirm,
  label,
  account,
}) => {
  return isVisible ? (
    <>
      <div className={styles.modalOverlay} onClick={toggleModal} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.modalTitleWrapper}>
            <span className={styles.modalTitle}>{text.title}</span>
            <Icon type='skateboarder' width={35} />
          </div>
          <div className={styles.textWrapper}>
            {account?.address}
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
            <Button onClick={onConfirm} label={label} />
          </div>
        </div>
      </div>
    </>
  ) : null
}
