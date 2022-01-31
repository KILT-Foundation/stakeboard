import { useContext } from 'react'
import { StateContext } from './StateContext'
import { SubmittableExtrinsic } from '@polkadot/api/promise/types'
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

  let hasError = false

  const signAndSubmitTx = async (address: string, tx: SubmittableExtrinsic) => {
    try {
      dispatch({ type: 'needsSignature' })
      console.log('handled 2')
      await signAndSend(address, tx, onSuccess, onError).catch((error) => {
        hasError = true
        onError(error)
      })
      if (!hasError) {
        dispatch({ type: 'transactionInProgress' })
      }
    } catch (e) {
      console.error(e)
      dispatch({ type: 'resetTransaction' })
    }
  }

  return signAndSubmitTx
}
