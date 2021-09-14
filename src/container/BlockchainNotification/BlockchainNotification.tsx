import React, { useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import { StateContext } from '../../utils/StateContext'

export const BlockchainNotication: React.FC = () => {
  const {
    state: {
      chainInfo: { chainInfo, hasChainInfo },
    },
    dispatch,
  } = useContext(StateContext)

  if (!hasChainInfo) return null

  return (
    <Modal
      title="Notification"
      buttons={
        <Button
          onClick={() => dispatch({ type: 'resetChainInfo' })}
          label={'close'}
        />
      }
    >
      <p>Chain Information: {chainInfo}</p>
    </Modal>
  )
}
