import { Reducer } from 'react'
import { Account } from '../types'

export type FavoriteActions =
  | { type: 'favorize'; id: string }
  | { type: 'unfavorize'; id: string }

export const favoriteReducer: Reducer<string[], FavoriteActions> = (
  state: string[],
  action: FavoriteActions
) => {
  switch (action.type) {
    case 'favorize':
      return [...state, action.id]
    case 'unfavorize':
      return state.filter((id) => id !== action.id)
    default:
      return state
  }
}

export type PausedAction = { type: 'refreshPaused'; refreshPaused: boolean }

export const pauseReducer: Reducer<boolean, PausedAction> = (
  state: boolean,
  action: PausedAction
) => {
  switch (action.type) {
    case 'refreshPaused':
      return !action.refreshPaused
    default:
      return state
  }
}

export type AccountActions =
  | { type: 'selectedAccount'; account: Account }
  | { type: 'unselectAccount'; account: undefined }

export const accountReducer: Reducer<Account | undefined, AccountActions> = (
  state: Account | undefined,
  action: AccountActions
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

export type ToggleDetailedIdentityViewAction = {
  type: 'toggleIdentityView'
  toggleDetailedIdentityView: boolean
}

export const toggleDetailedIdentityViewReducer: Reducer<
  boolean,
  ToggleDetailedIdentityViewAction
> = (state: boolean, action: ToggleDetailedIdentityViewAction) => {
  switch (action.type) {
    case 'toggleIdentityView':
      return !action.toggleDetailedIdentityView
    default:
      return state
  }
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

export const errorReducer: Reducer<any, ErrorAction> = (
  state: boolean,
  action: ErrorAction
) => {
  switch (action.type) {
    case 'handleError':
      return { error: action.error, errorInfo: action.errorInfo }
    case 'resetError':
      return { error: action.error, errorInfo: action.errorInfo }
    default:
      return state
  }
}
