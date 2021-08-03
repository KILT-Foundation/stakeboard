import styles from './Modal.module.css'
import { Icon } from '../../components/Icon/Icon'
import { Button } from '../../components/Button/Button'
export interface Props {
  isVisible: boolean
  toggleModal: any
  text: {
    title: string
    text: string
  }
  onConfirm: () => void
  label: string
}

export const Modal: React.FC<Props> = ({
  isVisible,
  toggleModal,
  text,
  onConfirm,
  label,
}) => {
  return isVisible ? (
    <>
      <div className={styles.modalOverlay} onClick={toggleModal}/>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.modalTitleWrapper}>
            <span className={styles.modalTitle}>{text.title}</span>
            <span className={styles.modalIconWrapper}>
              <Icon type='skateboarder' width={35} />
            </span>
          </div>
          <p>{text.text}</p>
          <div className={styles.buttonWrapper}>
            <Button
              onClick={toggleModal}
              label='CANCEL'
            />
            <Button
              onClick={onConfirm}
              label={label}
            />
          </div>
        </div>
      </div>
    </>
  ) : null
}
