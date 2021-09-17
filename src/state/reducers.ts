import { Reducer } from 'react'
import { Account } from '../types'

export type PausedAction = { type: 'refreshPaused'; refreshPaused: boolean }

export type ConnectionActions =
  | { type: 'connected' }
  | { type: 'disconnected' }
  | { type: 'error'; err: any }

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

export type TransactionInfoActions =
  | {
      type: 'transactionInProgress'
    }
  | {
      type: 'handleTransactionInfo'
      transactionInfo: any
    }
  | {
      type: 'resetTransactionInfo'
    }

export type Actions =
  | PausedAction
  | ConnectionActions
  | AccountActions
  | ErrorActions
  | TransactionInfoActions

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

export type TransactionInfoState = {
  isInProgress: boolean
  hasTransactionInfo: boolean
  transactionInfo: any
}

export const transactionInfoReducer: Reducer<TransactionInfoState, Actions> = (
  state,
  action
) => {
  switch (action.type) {
    case 'transactionInProgress':
      return {
        isInProgress: true,
        hasTransactionInfo: false,
        transactionInfo: undefined,
      }
    case 'handleTransactionInfo':
      return {
        hasTransactionInfo: true,
        transactionInfo: action.transactionInfo,
        isInProgress: false,
      }
    case 'resetTransactionInfo':
      return {
        hasTransactionInfo: false,
        transactionInfo: undefined,
        isInProgress: false,
      }
    default:
      return state
  }
}
