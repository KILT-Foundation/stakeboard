import React, { Dispatch, useReducer } from 'react'
import {
  AccountActions,
  accountReducer,
  PausedAction,
  pauseReducer,
  ToggleDetailedIdentityViewAction,
  toggleDetailedIdentityViewReducer,
  HandleErrorBoundaryAction,
  handleErrorBoundaryReducer,
} from '../state/reducers'
import { Account } from '../types'

export interface State {
  refreshPaused: boolean
  account?: Account
  toggleDetailedIdentityView: boolean
  handleError: { error: boolean; errorInfo: any }
}

export const StateContext = React.createContext<{
  state: State
  dispatch: Dispatch<
    | PausedAction
    | AccountActions
    | ToggleDetailedIdentityViewAction
    | HandleErrorBoundaryAction
  >
}>({
  state: {
    refreshPaused: false,
    account: undefined,
    toggleDetailedIdentityView: false,
    handleError: { error: false, errorInfo: '' },
  },
  dispatch: () => null,
})

const mainReducer = (
  { refreshPaused, account, toggleDetailedIdentityView, handleError }: State,
  action:
    | PausedAction
    | AccountActions
    | ToggleDetailedIdentityViewAction
    | HandleErrorBoundaryAction
) => ({
  refreshPaused: pauseReducer(refreshPaused, action as PausedAction),
  account: accountReducer(account, action as AccountActions),
  toggleDetailedIdentityView: toggleDetailedIdentityViewReducer(
    toggleDetailedIdentityView,
    action as ToggleDetailedIdentityViewAction
  ),
  handleError: handleErrorBoundaryReducer(
    handleError,
    action as HandleErrorBoundaryAction
  ),
})

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    refreshPaused: false,
    account: undefined,
    toggleDetailedIdentityView: false,
    handleError: { error: false, errorInfo: '' },
  })

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
