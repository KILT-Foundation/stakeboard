import { Reducer } from 'react'
import { Account } from '../types'

export type PausedAction = { type: 'refreshPaused'; refreshPaused: boolean }

export type ConnectionActions =
  | { type: 'connected' }
  | { type: 'disconnected' }
  | { type: 'error'; err: any }

export type AccountActions =
  | { type: 'selectedAccount'; account: Account }
  | { type: 'unselectAccount'; account: undefined }

export type ToggleDetailedIdentityViewAction = {
  type: 'toggleIdentityView'
  toggleDetailedIdentityView: boolean
}

export type ErrorAction =
  | {
      type: 'handleError'
      error: boolean
      errorInfo: any
    }
  | {
      type: 'resetError'
      error: boolean
      errorInfo: any
    }

export type Actions =
  | PausedAction
  | ConnectionActions
  | AccountActions
  | ToggleDetailedIdentityViewAction
  | ErrorAction

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
    case 'selectedAccount':
      return { ...action.account }
    case 'unselectAccount':
      return action.account
    default:
      return state
  }
}

export const toggleDetailedIdentityViewReducer: Reducer<boolean, Actions> = (
  state,
  action
) => {
  switch (action.type) {
    case 'toggleIdentityView':
      return !action.toggleDetailedIdentityView
    default:
      return state
  }
}

export const errorReducer: Reducer<any, Actions> = (state, action) => {
  switch (action.type) {
    case 'handleError':
      return { error: action.error, errorInfo: action.errorInfo }
    case 'resetError':
      return { error: action.error, errorInfo: action.errorInfo }
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
