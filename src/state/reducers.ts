import { Reducer } from 'react'
import { Account } from '../types'

export type PausedAction = { type: 'refreshPaused'; refreshPaused: boolean }

export type ConnectionActions =
  | { type: 'connected' }
  | { type: 'disconnected' }
  | { type: 'error'; err: any }

export type LoadingDataActions =
  | { type: 'loading' }
  | { type: 'unavailable' }
  | { type: 'available' }

export type AccountActions =
  | { type: 'selectAccount'; account: Account }
  | { type: 'unselectAccount' }

export type ErrorActions =
  | {
      type: 'handleError'
      error: any
    }
  | {
      type: 'resetError'
    }

export type TransactionActions =
  | {
      type: 'needsSignature'
    }
  | {
      type: 'transactionInProgress'
    }
  | {
      type: 'transactionFinished'
      txHash: string
    }
  | {
      type: 'resetTransaction'
    }

export type TermsActions = { type: 'acceptTerms' }

export type Actions =
  | PausedAction
  | ConnectionActions
  | LoadingDataActions
  | AccountActions
  | ErrorActions
  | TransactionActions
  | TermsActions

export const pauseReducer: Reducer<boolean, Actions> = (state, action) => {
  switch (action.type) {
    case 'refreshPaused':
      return !action.refreshPaused
    default:
      return state
  }
}

export const accountReducer: Reducer<Account | undefined, Actions> = (
  state,
  action
) => {
  switch (action.type) {
    case 'selectAccount':
      return { ...action.account }
    case 'unselectAccount':
      return undefined
    default:
      return state
  }
}

export type ErrorState = {
  hasError: boolean
  error: any
}

export const errorReducer: Reducer<ErrorState, Actions> = (state, action) => {
  switch (action.type) {
    case 'handleError':
      return { hasError: true, error: action.error }
    case 'resetError':
      return { hasError: false, error: undefined }
    default:
      return state
  }
}

export type ConnectionState = {
  status: 'connected' | 'disconnected' | 'error'
  err?: any
}

export const connectionReducer: Reducer<ConnectionState, Actions> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'connected':
      return { status: 'connected' }
    case 'disconnected':
      return { status: 'disconnected' }
    case 'error':
      return { status: 'error', err: action.err }
    default:
      return prevState
  }
}

export type LoadingDataState = 'loading' | 'available' | 'unavailable'

export const loadingDataReducer: Reducer<LoadingDataState, Actions> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'unavailable':
      return 'unavailable'
    case 'loading':
      return 'loading'
    case 'available':
      return 'available'
    default:
      return prevState
  }
}

export type TransactionState = {
  isInProgress: boolean
  needsSignature: boolean
  txHash?: string
}

export const transactionReducer: Reducer<TransactionState, Actions> = (
  state,
  action
) => {
  switch (action.type) {
    case 'needsSignature': {
      return { isInProgress: false, needsSignature: true }
    }
    case 'transactionInProgress':
      return {
        isInProgress: true,
        needsSignature: false,
      }
    case 'transactionFinished':
      return {
        txHash: action.txHash,
        isInProgress: false,
        needsSignature: false,
      }
    case 'resetTransaction':
      return {
        isInProgress: false,
        needsSignature: false,
      }
    default:
      return state
  }
}

export const termsReducer: Reducer<boolean, Actions> = (state, action) => {
  switch (action.type) {
    case 'acceptTerms':
      return true
    default:
      return state
  }
}
