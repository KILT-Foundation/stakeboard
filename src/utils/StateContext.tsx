import React, { Dispatch, useReducer } from 'react'
import {
  accountReducer,
  pauseReducer,
  errorReducer,
  connectionReducer,
  ConnectionState,
  Actions,
  ErrorState,
  TransactionInfoState,
  transactionInfoReducer,
} from '../state/reducers'
import { Account } from '../types'

export interface State {
  refreshPaused: boolean
  account?: Account
  error: ErrorState
  connection: ConnectionState
  transactionInfo: TransactionInfoState
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
    transactionInfo: {
      transactionInfo: undefined,
      hasTransactionInfo: false,
      isInProgress: true,
    },
  },
  dispatch: () => null,
})

const mainReducer = (
  { refreshPaused, account, error, connection, transactionInfo }: State,
  action: Actions
) => ({
  refreshPaused: pauseReducer(refreshPaused, action),
  account: accountReducer(account, action),
  error: errorReducer(error, action),
  connection: connectionReducer(connection, action),
  transactionInfo: transactionInfoReducer(transactionInfo, action),
})

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    refreshPaused: false,
    account: undefined,
    error: { error: undefined, hasError: false },
    connection: { status: 'disconnected' },
    transactionInfo: {
      transactionInfo: undefined,
      hasTransactionInfo: false,
      isInProgress: true,
    },
  })

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
