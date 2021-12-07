import React, { useContext } from 'react'
import { StoredStateContext } from '../../utils/StoredStateContext'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import styles from './Scale.module.css'

export const Scale: React.FC = () => {
  const {
    storedState: { denomination },
    dispatch,
  } = useContext(StoredStateContext)
  return (
    <div>
      <span className={styles.label}>Scale</span>
      {denomination === 8 ? (
        <Icon width={15} type={'plus_inactive'} />
      ) : (
        <Button onClick={() => dispatch({ type: 'decreaseDenomination' })}>
          <Icon width={15} type={'plus_active'} />
        </Button>
      )}
      <span className={styles.spacer} />
      {denomination === 8192 ? (
        <Icon width={15} type={'minus_inactive'} />
      ) : (
        <Button onClick={() => dispatch({ type: 'increaseDenomination' })}>
          <Icon width={15} type={'minus_active'} />
        </Button>
      )}
    </div>
  )
}
