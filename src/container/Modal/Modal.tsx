import styles from './Modal.module.css'

export interface Props {
  isVisible: boolean
  toggleModal: any
  text: {
    title: string
    text: string
  }
  data: any
}

export const Modal: React.FC<Props> = ({
  isVisible,
  toggleModal,
  text,
  data,
}) => {
  return isVisible ? (
    <>
      <div className={styles.modalOverlay} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <h1>{text.title}</h1>
          <p>{text.text}</p>
          <div className={styles.buttonWrapper}>
            <button className={styles.buttonClose} onClick={toggleModal}>
              Close
            </button>
            <button className={styles.buttonSubmit} onClick={data}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null
}
