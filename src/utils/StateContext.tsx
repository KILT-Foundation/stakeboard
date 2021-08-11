import React, { Dispatch, useEffect, useReducer } from 'react'
import {
  FavoriteActions,
  PausedAction,
  favoriteReducer,
  pauseReducer,
} from '../state/reducers'

export interface State {
  favorites: string[]
  refreshPaused: boolean
}

export const StateContext = React.createContext<{
  state: State
  dispatch: Dispatch<FavoriteActions | PausedAction>
}>({ state: { favorites: [], refreshPaused: false }, dispatch: () => null })

const mainReducer = (
  { favorites, refreshPaused }: State,
  action: FavoriteActions | PausedAction
) => ({
  favorites: favoriteReducer(favorites, action as FavoriteActions),
  refreshPaused: pauseReducer(refreshPaused, action as PausedAction),
})

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    mainReducer,
    {
      favorites: [],
      refreshPaused: false,
    },
    (initialArg) => {
      try {
        const item = window.localStorage.getItem('staking-state')
        return item ? JSON.parse(item) : initialArg
      } catch (err) {
        console.log(err)
        return initialArg
      }
    }
  )

  useEffect(() => {
    try {
      window.localStorage.setItem('staking-state', JSON.stringify(state))
    } catch (err) {
      console.log(err)
    }
  }, [state])

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
