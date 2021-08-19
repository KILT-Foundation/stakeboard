import React, { Dispatch, useReducer } from 'react'
import { PausedAction, pauseReducer } from '../state/reducers'

export interface State {
  refreshPaused: boolean
}

export const PauseContext = React.createContext<{
  state: State
  dispatch: Dispatch<PausedAction>
}>({ state: { refreshPaused: true }, dispatch: () => null })

const mainReducer = ({ refreshPaused }: State, action: PausedAction) => ({
  refreshPaused: pauseReducer(refreshPaused, action as PausedAction),
})

export const PauseProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, {
    refreshPaused: true,
  })

  return (
    <PauseContext.Provider value={{ state, dispatch }}>
      {children}
    </PauseContext.Provider>
  )
}
