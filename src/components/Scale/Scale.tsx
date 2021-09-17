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
      Scale:{' '}
      {denomination === 10000 ? (
        <Icon width={20} type={'plus_inactive'} />
      ) : (
        <Button onClick={() => dispatch({ type: 'increaseDenomination' })}>
          {' '}
          <Icon width={20} type={'plus_active'} />
        </Button>
      )}
      /
      {denomination === 10 ? (
        <Icon width={20} type={'minus_inactive'} />
      ) : (
        <Button onClick={() => dispatch({ type: 'decreaseDenomination' })}>
          <Icon width={20} type={'minus_active'} />
        </Button>
      )}
    </div>
  )
}
