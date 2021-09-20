import React, { Dispatch, useEffect, useReducer } from 'react'
import {
  favoriteReducer,
  denominationReducer,
  StoredStateActions,
  termsReducer,
} from '../state/storedReducers'

export interface State {
  favorites: string[]
  denomination: number
  termsAccepted: boolean
}

export const StoredStateContext = React.createContext<{
  state: State
  dispatch: Dispatch<StoredStateActions>
}>({
  state: { favorites: [], denomination: 100, termsAccepted: false },
  dispatch: () => null,
})

const mainReducer = (
  { favorites, denomination, termsAccepted }: State,
  action: StoredStateActions
) => ({
  favorites: favoriteReducer(favorites, action),
  denomination: denominationReducer(denomination, action),
  termsAccepted: termsReducer(termsAccepted, action),
})

export const StoredStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    mainReducer,
    {
      favorites: [],
      denomination: 100,
      termsAccepted: false,
    },
    (initialArg) => {
      try {
        const item = window.localStorage.getItem('staking-state')
        const data = item ? JSON.parse(item) : initialArg
        if (!data.denomination) data.denomination = 100
        return data
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
