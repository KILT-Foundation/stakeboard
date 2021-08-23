import React, { useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { StateContext } from '../../utils/StateContext'
import styles from './IdentityView.module.css'
import { shortenAddress } from '../../utils/shortenAddress'

export interface Props {
  toggleDetailedIdentityView: () => void
}

export const IdentityView: React.FC<Props> = ({
  toggleDetailedIdentityView,
}) => {
  const {
    state: { account },
    dispatch,
  } = useContext(StateContext)

  // placeholder for the error notifications
  if (!account) return <></>

  const shortAddress = shortenAddress(account.address)

  return (
    <div className={styles.identityView}>
      <div className={styles.container}>
        <p>
          Hello World!
          {shortAddress}
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => {
            dispatch({ type: 'unselectAccount', account: undefined })
            toggleDetailedIdentityView()
          }}
          label={'close'}
        />
      </div>
    </div>
  )
}
