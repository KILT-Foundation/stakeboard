import React, { Dispatch, useReducer } from 'react'
import {
  accountReducer,
  pauseReducer,
  errorReducer,
  connectionReducer,
  ConnectionState,
  Actions,
  ErrorState,
  TransactionState,
  transactionReducer,
  termsReducer,
} from '../state/reducers'
import { Account } from '../types'

export interface State {
  refreshPaused: boolean
  account?: Account
  error: ErrorState
  connection: ConnectionState
  transaction: TransactionState
  termsAccepted: boolean
}

export const StateContext = React.createContext<{
  state: State
  dispatch: Dispatch<Actions>
}>({
  state: {
    refreshPaused: false,
    account: undefined,
    error: { error: undefined, hasError: false },
    connection: { status: 'disconnected' },
    transaction: {
      isInProgress: false,
      needsSignature: false,
    },
    termsAccepted: false,
  },
  dispatch: () => null,
})

const mainReducer = (
  {
    refreshPaused,
    account,
    error,
    connection,
    transaction,
    termsAccepted,
  }: State,
  action: Actions
) => ({
  refreshPaused: pauseReducer(refreshPaused, action),
  account: accountReducer(account, action),
  error: errorReducer(error, action),
  connection: connectionReducer(connection, action),
  transaction: transactionReducer(transaction, action),
  termsAccepted: termsReducer(termsAccepted, action),
})

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    refreshPaused: false,
    account: undefined,
    error: { error: undefined, hasError: false },
    connection: { status: 'disconnected' },
    transaction: {
      isInProgress: false,
      needsSignature: false,
    },
    termsAccepted: false,
  })

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
