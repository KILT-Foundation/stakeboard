import React, { Dispatch, useEffect, useReducer } from 'react'
import { FavoriteActions, favoriteReducer } from '../state/storedReducers'

export interface State {
  favorites: string[]
}

export const StoredStateContext = React.createContext<{
  state: State
  dispatch: Dispatch<FavoriteActions>
}>({ state: { favorites: [] }, dispatch: () => null })

const mainReducer = ({ favorites }: State, action: FavoriteActions) => ({
  favorites: favoriteReducer(favorites, action as FavoriteActions),
})

export const StoredStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    mainReducer,
    {
      favorites: [],
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
    <StoredStateContext.Provider value={{ state, dispatch }}>
      {children}
    </StoredStateContext.Provider>
  )
}
