import React, { useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { AccountContext } from '../../utils/AccountContext'
import styles from './IdentityView.module.css'

export interface Props {
  toggleDetailedIdentityView: () => void
}

export const IdentityView: React.FC<Props> = ({
  toggleDetailedIdentityView,
}) => {
  const {
    state: { account },
    dispatch,
  } = useContext(AccountContext)

  return (
    <div className={styles.container}>
      <p>
        Hello World!
        {account?.address}
      </p>

      <Button
        onClick={() => {
          dispatch({ type: 'unselectAccount', account: undefined })
          toggleDetailedIdentityView()
        }}
        label={'close'}
      />
    </div>
  )
}
