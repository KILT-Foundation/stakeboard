import React, { useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import { StateContext } from '../../utils/StateContext'

export const BlockchainNotication: React.FC = () => {
  const {
    state: {
      transaction: { txHash, isInProgress },
    },
    dispatch,
  } = useContext(StateContext)

  if (isInProgress) {
    return (
      <Modal
        title="TRANSACTION IN PROGRESS"
        buttons={
          <Button
            onClick={() => dispatch({ type: 'resetTransaction' })}
            label={'close'}
          />
        }
      >
        <p>Magic is happening...</p>
      </Modal>
    )
  }

  if (typeof txHash === 'string') {
    return (
      <Modal
        title="TRANSACTION COMPLETE"
        buttons={
          <Button
            onClick={() => dispatch({ type: 'resetTransaction' })}
            label={'close'}
          />
        }
      >
        <p>Transaction hash: {txHash}</p>
      </Modal>
    )
  }

  return null
}
