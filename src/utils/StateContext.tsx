import React, { Dispatch, useReducer } from 'react'
import {
  accountReducer,
  pauseReducer,
  toggleDetailedIdentityViewReducer,
  errorReducer,
  connectionReducer,
  ConnectionState,
  Actions,
} from '../state/reducers'
import { Account } from '../types'

export interface State {
  refreshPaused: boolean
  account?: Account
  toggleDetailedIdentityView: boolean
  error: { error: boolean; errorInfo: any }
  connection: ConnectionState
}

export const StateContext = React.createContext<{
  state: State
  dispatch: Dispatch<Actions>
}>({
  state: {
    refreshPaused: false,
    account: undefined,
    toggleDetailedIdentityView: false,
    error: { error: false, errorInfo: '' },
    connection: { status: 'disconnected' },
  },
  dispatch: () => null,
})

const mainReducer = (
  {
    refreshPaused,
    account,
    toggleDetailedIdentityView,
    error,
    connection,
  }: State,
  action: Actions
) => ({
  refreshPaused: pauseReducer(refreshPaused, action),
  account: accountReducer(account, action),
  toggleDetailedIdentityView: toggleDetailedIdentityViewReducer(
    toggleDetailedIdentityView,
    action
  ),
  error: errorReducer(error, action),
  connection: connectionReducer(connection, action),
})

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    refreshPaused: false,
    account: undefined,
    toggleDetailedIdentityView: false,
    error: { error: false, errorInfo: '' },
    connection: { status: 'disconnected' },
  })

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
