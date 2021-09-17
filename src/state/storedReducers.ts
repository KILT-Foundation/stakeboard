import { Reducer } from 'react'

export type FavoriteActions =
  | { type: 'favorize'; id: string }
  | { type: 'unfavorize'; id: string }

export type DenominationActions =
  | { type: 'increaseDenomination' }
  | { type: 'decreaseDenomination' }

export type StoredStateActions = FavoriteActions | DenominationActions

export const favoriteReducer: Reducer<string[], StoredStateActions> = (
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

export const denominationReducer: Reducer<number, StoredStateActions> = (
  state,
  action
) => {
  switch (action.type) {
    case 'increaseDenomination':
      return state * 10
    case 'decreaseDenomination':
      return state / 10
    default:
      return state
  }
}
