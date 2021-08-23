import React, { useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { StateContext } from '../../utils/StateContext'
import { shortenAddress } from '../../utils/shortenAddress'
import { TokenBar } from '../../components/Dashboard/TokenBar'
import { Identicon } from '../../components/Identicon/Identicon'
import styles from './IdentityView.module.css'
import cx from 'classnames'

function getPercent(percentageValue: number, secondValue: number) {
  const total = percentageValue + secondValue
  const percent = (percentageValue / total) * 100
  return percent.toFixed(1)
}

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
  const shortCollatorAddress = shortenAddress(account.address)

  return (
    <div className={styles.identityView}>
      <div className={styles.container}>
        <div className={styles.identityViewHeader}>
          <div className={styles.identiconContainer}>
            <Identicon address={account.address} />
          </div>
          <div className={cx(styles.label, styles.labelGray, styles.name)}>
            {account?.name}
          </div>
          <div className={styles.tokenbarContainer}>
            <TokenBar staked={account.staked} stakeable={account.stakeable} />
          </div>
        </div>

        <div className={styles.identityStakeContainer}>
          <span className={cx(styles.labelSmall, styles.labelGray)}>
            my stake <br />
            <span className={cx(styles.label, styles.labelYellow)}>
              {account.staked.toLocaleString()} KILT | <span />
              {getPercent(account.staked, account.stakeable)} %
            </span>
          </span>

          <span
            className={cx(
              styles.labelSmall,
              styles.labelGray,
              styles.textRight
            )}
          >
            stakeable <br />
            <span className={cx(styles.label, styles.labelOrange)}>
              {getPercent(account.stakeable, account.staked)} % | <span />
              {account.stakeable.toLocaleString()} KILT
            </span>
          </span>
        </div>

        <div className={styles.identityViewDetailsContainer}>
          <>
            STAKE COLLATOR <br />
            {shortCollatorAddress}
            since AUG 2021 <br />
          </>
          <>
            RANK | TOTAL STAKE <br />
            888 88,888,888.88 KILT
            <br />
          </>
          <>
            LOWEST STAKE | DELEGATORS <br />
            8,888.88 KILT 88/25
          </>
          <>
            REWARD (%) / YEAR <br />
            8.88 %
          </>
          <>
            PREDICTED REWARD <br />
            888,888,888.88 KILT
          </>
        </div>
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
