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

export type Actions =
  | PausedAction
  | ConnectionActions
  | AccountActions
  | ErrorActions

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
