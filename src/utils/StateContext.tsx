import React, { Dispatch, useReducer } from 'react'
import {
  AccountActions,
  accountReducer,
  PausedAction,
  pauseReducer,
  ToggleDetailedIdentityViewAction,
  toggleDetailedIdentityViewReducer,
  ErrorAction,
  errorReducer,
} from '../state/reducers'
import { Account } from '../types'

export interface State {
  refreshPaused: boolean
  account?: Account
  toggleDetailedIdentityView: boolean
  error: { error: boolean; errorInfo: any }
}

export const StateContext = React.createContext<{
  state: State
  dispatch: Dispatch<
    | PausedAction
    | AccountActions
    | ToggleDetailedIdentityViewAction
    | ErrorAction
  >
}>({
  state: {
    refreshPaused: false,
    account: undefined,
    toggleDetailedIdentityView: false,
    error: { error: false, errorInfo: '' },
  },
  dispatch: () => null,
})

const mainReducer = (
  { refreshPaused, account, toggleDetailedIdentityView, error }: State,
  action:
    | PausedAction
    | AccountActions
    | ToggleDetailedIdentityViewAction
    | ErrorAction
) => ({
  refreshPaused: pauseReducer(refreshPaused, action as PausedAction),
  account: accountReducer(account, action as AccountActions),
  toggleDetailedIdentityView: toggleDetailedIdentityViewReducer(
    toggleDetailedIdentityView,
    action as ToggleDetailedIdentityViewAction
  ),
  error: errorReducer(error, action as ErrorAction),
})

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    refreshPaused: false,
    account: undefined,
    toggleDetailedIdentityView: false,
    error: { error: false, errorInfo: '' },
  })

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
