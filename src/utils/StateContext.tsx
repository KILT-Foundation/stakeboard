import React, { Dispatch, useReducer } from 'react'
import { PausedAction, pauseReducer } from '../state/reducers'

export interface State {
  refreshPaused: boolean
}

export const StateContext = React.createContext<{
  state: State
  dispatch: Dispatch<PausedAction>
}>({ state: { refreshPaused: true }, dispatch: () => null })

const mainReducer = ({ refreshPaused }: State, action: PausedAction) => ({
  refreshPaused: pauseReducer(refreshPaused, action as PausedAction),
})

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    refreshPaused: true,
  })

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
