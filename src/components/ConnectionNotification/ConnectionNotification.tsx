import React, { useContext } from 'react'
import { StateContext } from '../../utils/StateContext'
import { Modal } from '../Modal/Modal'

export const ConnectionNotification: React.FC = () => {
  const { state } = useContext(StateContext)

  switch (state.connection.status) {
    case 'disconnected':
    case 'error':
      return (
        <Modal title="Connection">
          Not connected to the Blockchain. Trying to reconnect...
        </Modal>
      )
    case 'connected':
    default:
      return null
  }
}
