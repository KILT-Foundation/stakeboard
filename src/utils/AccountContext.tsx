import React, { Dispatch, useReducer } from 'react'
import { Account } from '../types'
import { AccountActions, accountReducer } from '../state/reducers'

export interface State {
  account?: Account
}

export const AccountContext = React.createContext<{
  state: State
  dispatch: Dispatch<AccountActions>
}>({
  state: {
    account: undefined,
  },
  dispatch: () => null,
})

const mainReducer = ({ account }: State, action: AccountActions) => ({
  account: accountReducer(account, action as AccountActions),
})

export const AccountProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    account: undefined,
  })
  return (
    <AccountContext.Provider value={{ state, dispatch }}>
      {children}
    </AccountContext.Provider>
  )
}
