import React, { useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import styles from '../../components/Modal/Modal.module.css'
import { StateContext } from '../../utils/StateContext'

export const ErrorNotification: React.FC = () => {
  const {
    state: {
      error: { error, errorInfo },
    },
    dispatch,
  } = useContext(StateContext)

  if (!error) return null

  return (
    <Modal
      title="Error"
      buttons={
        <Button
          onClick={() =>
            dispatch({ type: 'resetError', error: false, errorInfo: '' })
          }
          label={'close'}
        />
      }
    >
      <>
        There was an Error:
        <p className={styles.errorText}>{errorInfo.toString()}</p>
      </>
    </Modal>
  )
}
