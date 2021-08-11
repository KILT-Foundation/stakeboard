import { Reducer } from 'react'

export type FavoriteActions =
  | { type: 'favorize'; id: string }
  | { type: 'unfavorize'; id: string }

export const favoriteReducer: Reducer<string[], FavoriteActions> = (
  state: string[],
  action: FavoriteActions
) => {
  switch (action.type) {
    case 'favorize':
      return [...state, action.id]
    case 'unfavorize':
      return state.filter((id) => id !== action.id)
    default:
      return state
  }
}

export type PausedAction = { type: 'toggle'; toggle: boolean }

export const pauseReducer: Reducer<boolean, PausedAction> = (
  state: boolean,
  action: PausedAction
) => {
  switch (action.type) {
    case 'toggle':
      return !action.toggle
    default:
      return state
  }
}
