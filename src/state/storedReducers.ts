import { Reducer } from 'react'

export type FavoriteActions =
  | { type: 'favorize'; id: string }
  | { type: 'unfavorize'; id: string }

export const favoriteReducer: Reducer<string[], FavoriteActions> = (
  state,
  action
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
