import React, { useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { StateContext } from '../../utils/StateContext'
import styles from './IdentityView.module.css'
import { shortenAddress } from '../../utils/shortenAddress'
import { TokenBar } from '../../components/Dashboard/TokenBar'
import { Identicon } from '../../components/Identicon/Identicon'

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
        <Identicon address={account.address} />
        <>
          {account?.name}
          <span />
          {shortAddress}
        </>
        <TokenBar staked={account.staked} stakeable={account.stakeable} />
        <p>MY STAKE {account.staked}</p>
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
