import React, { useContext } from 'react'
import { Modal } from 'react-dialog-polyfill'
import styles from '../../styles/modal.module.css'
import { StateContext } from '../../utils/StateContext'

export const ConnectionNotification: React.FC = () => {
  const { state } = useContext(StateContext)

  switch (state.connection.status) {
    case 'connected': {
      console.log('+++connected')
      break
    }
    case 'disconnected':
    case 'error':
      return (
        <div className={styles.modalOverlay}>
          <Modal open className={styles.modal}>
            <div className={styles.modalTitleWrapper}>
              <span className={styles.modalTitle}>Connection</span>
            </div>
            <div className={styles.textWrapper}>
              Not connected to the Blockchain. Trying to reconnect...
            </div>
          </Modal>
        </div>
      )
  }

  return null
}
