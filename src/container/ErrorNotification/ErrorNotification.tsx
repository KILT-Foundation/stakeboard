import React, { useContext } from 'react'
import { Modal } from 'react-dialog-polyfill'
import { Button } from '../../components/Button/Button'
import styles from '../../styles/modal.module.css'
import { StateContext } from '../../utils/StateContext'

export const ErrorNotification: React.FC = () => {
  const {
    state: {
      error: { error, errorInfo },
    },
    dispatch,
  } = useContext(StateContext)

  return (
    <Modal open={error} className={styles.modal}>
      <>
        There was an Error:
        <p className={styles.errorText}>{errorInfo.toString()}</p>
      </>
      <br />
      <Button
        onClick={() =>
          dispatch({ type: 'resetError', error: false, errorInfo: '' })
        }
        label={'close'}
      />
    </Modal>
  )
}
