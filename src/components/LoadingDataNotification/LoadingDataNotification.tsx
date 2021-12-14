import React, { useContext } from 'react'
import { StateContext } from '../../utils/StateContext'
import { Modal } from '../Modal/Modal'

export const LoadingDataNotification: React.FC = () => {
  const { state } = useContext(StateContext)

  switch (state.loadingData) {
    case 'loading':
      return (
        <Modal title="Loading">
          The data is being fetched from the KILT chain
        </Modal>
      )
    case 'available':
    case 'unavailable':
    default:
      return null
  }
}
