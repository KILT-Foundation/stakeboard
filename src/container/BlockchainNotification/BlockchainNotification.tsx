import React, { useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import { StateContext } from '../../utils/StateContext'

export const BlockchainNotication: React.FC = () => {
  const {
    state: {
      transactionInfo: { transactionInfo, hasTransactionInfo },
    },
    dispatch,
  } = useContext(StateContext)

  if (!hasTransactionInfo) return null

  return typeof transactionInfo === 'string' ? (
    <Modal
      title="Transaction successful"
      buttons={
        <Button
          onClick={() => dispatch({ type: 'resetTransactionInfo' })}
          label={'close'}
        />
      }
    >
      <p>Transaction hash: {transactionInfo}</p>
    </Modal>
  ) : (
    <Modal
      title="Ongoing Transaction"
      buttons={
        <Button
          onClick={() => dispatch({ type: 'resetTransactionInfo' })}
          label={'close'}
        />
      }
    >
      <p>Transaction in progress</p>
    </Modal>
  )
}
