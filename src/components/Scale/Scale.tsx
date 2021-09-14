import React, { useContext } from 'react'
import { StoredStateContext } from '../../utils/StoredStateContext'
import { Button } from '../Button/Button'

export const Scale: React.FC = () => {
  const {
    state: { denomination },
    dispatch,
  } = useContext(StoredStateContext)
  return (
    <div>
      <Button
        onClick={() => dispatch({ type: 'increaseDenomination' })}
        disabled={denomination === 10000}
      />
      /{denomination}
      <Button
        onClick={() => dispatch({ type: 'decreaseDenomination' })}
        disabled={denomination === 10}
      />
    </div>
  )
}
