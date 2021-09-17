import { useContext } from 'react'
import { StateContext } from './StateContext'
import { SubmittableExtrinsic } from '@polkadot/api/promise/types'
import { signAndSend } from './chain'

export const useTxSubmitter = () => {
  const { dispatch } = useContext(StateContext)

  const onSuccess = (transactionInfo: any) => {
    dispatch({ type: 'handleTransactionInfo', transactionInfo })
  }
  const onError = (error: any) => {
    dispatch({ type: 'handleError', error })
  }

  const signAndSubmitTx = async (address: string, tx: SubmittableExtrinsic) => {
    try {
      await signAndSend(address, tx, onSuccess, onError)
      dispatch({ type: 'transactionInProgress' })
    } catch (e) {
      console.error(e)
    }
  }

  return signAndSubmitTx
}
