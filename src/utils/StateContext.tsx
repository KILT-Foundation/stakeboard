import React, { Dispatch, useReducer } from 'react'
import {
  AccountActions,
  accountReducer,
  PausedAction,
  pauseReducer,
} from '../state/reducers'
import { Account } from '../types'

export interface State {
  refreshPaused: boolean
  account?: Account
}

export const StateContext = React.createContext<{
  state: State
  dispatch: Dispatch<PausedAction | AccountActions>
}>({
  state: { refreshPaused: false, account: undefined },
  dispatch: () => null,
})

const mainReducer = (
  { refreshPaused, account }: State,
  action: PausedAction | AccountActions
) => ({
  refreshPaused: pauseReducer(refreshPaused, action as PausedAction),
  account: accountReducer(account, action as AccountActions),
})

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    refreshPaused: false,
    account: undefined,
  })

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
