import { useContext } from 'react'
import { StateContext } from './StateContext'
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types'
import { signAndSend } from './chain'

export const useTxSubmitter = () => {
  const { dispatch } = useContext(StateContext)

  const onSuccess = (txHash: string) => {
    dispatch({ type: 'transactionFinished', txHash })
  }
  const onError = (error: any) => {
    dispatch({ type: 'handleError', error })
    dispatch({ type: 'resetTransaction' })
  }

  const signAndSubmitTx = async (address: string, tx: SubmittableExtrinsic) => {
    try {
      dispatch({ type: 'needsSignature' })
      await signAndSend(address, tx, onSuccess, onError)

      dispatch({ type: 'transactionInProgress' })
    } catch (e) {
      console.error(e)
      onError(e)
      dispatch({ type: 'resetTransaction' })
    }
  }

  return signAndSubmitTx
}
