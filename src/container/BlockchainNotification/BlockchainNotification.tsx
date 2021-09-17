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
        title="Ongoing Transaction"
        buttons={
          <Button
            onClick={() => dispatch({ type: 'resetTransaction' })}
            label={'close'}
          />
        }
      >
        <p>Transaction in progress</p>
      </Modal>
    )
  }

  if (typeof txHash === 'string') {
    return (
      <Modal
        title="Transaction successful"
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
