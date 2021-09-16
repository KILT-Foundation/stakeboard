import React, { useContext } from 'react'
import { StoredStateContext } from '../../utils/StoredStateContext'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'

export const Scale: React.FC = () => {
  const {
    state: { denomination },
    dispatch,
  } = useContext(StoredStateContext)
  return (
    <div>
      {denomination === 10000 ? (
        <Icon type={'bulb_gray'} />
      ) : (
        <Button onClick={() => dispatch({ type: 'increaseDenomination' })}>
          {' '}
          <Icon type={'arrow_up'} />
        </Button>
      )}
      /
      {denomination === 10 ? (
        <Icon type={'bulb_gray'} />
      ) : (
        <Button onClick={() => dispatch({ type: 'decreaseDenomination' })}>
          <Icon type={'arrow_down'} />
        </Button>
      )}
    </div>
  )
}
