import React, { useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { AccountContext } from '../../utils/AccountContext'
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
  } = useContext(AccountContext)

  // placeholder for the error notifications
  if (!account) return <></>

  const shortAddress = shortenAddress(account.address)

  return (
    <div className={styles.container}>
      <p>
        Hello World!
        {shortAddress}
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
