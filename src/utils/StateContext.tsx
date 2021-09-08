import React, { Dispatch, useReducer } from 'react'
import {
  AccountActions,
  accountReducer,
  PausedAction,
  pauseReducer,
  ToggleDetailedIdentityViewAction,
  toggleDetailedIdentityViewReducer,
} from '../state/reducers'
import { Account } from '../types'

export interface State {
  refreshPaused: boolean
  account?: Account
  toggleDetailedIdentityView: boolean
}

export const StateContext = React.createContext<{
  state: State
  dispatch: Dispatch<
    PausedAction | AccountActions | ToggleDetailedIdentityViewAction
  >
}>({
  state: {
    refreshPaused: false,
    account: undefined,
    toggleDetailedIdentityView: false,
  },
  dispatch: () => null,
})

const mainReducer = (
  { refreshPaused, account, toggleDetailedIdentityView }: State,
  action: PausedAction | AccountActions | ToggleDetailedIdentityViewAction
) => ({
  refreshPaused: pauseReducer(refreshPaused, action as PausedAction),
  account: accountReducer(account, action as AccountActions),
  toggleDetailedIdentityView: toggleDetailedIdentityViewReducer(
    toggleDetailedIdentityView,
    action as ToggleDetailedIdentityViewAction
  ),
})

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    refreshPaused: false,
    account: undefined,
    toggleDetailedIdentityView: false,
  })

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
