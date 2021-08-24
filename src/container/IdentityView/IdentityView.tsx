import React, { useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { StateContext } from '../../utils/StateContext'
import { shortenAddress } from '../../utils/shortenAddress'
import { TokenBar } from '../../components/Dashboard/TokenBar'
import { Identicon } from '../../components/Identicon/Identicon'
import styles from './IdentityView.module.css'
import cx from 'classnames'

type Options = { date: Date; amount: number }

const options: Options[] = [
  { date: new Date('August 7, 2021 13:24:00'), amount: 554777 },
  { date: new Date('August 6, 2021 13:24:00'), amount: 547734 },
  { date: new Date('August 5, 2021 17:24:00'), amount: 123 },
  { date: new Date('August 5, 2021 18:24:00'), amount: 345 },
]

export interface Props {
  toggleDetailedIdentityView: () => void
}

function getPercent(percentageValue: number, secondValue: number) {
  const total = percentageValue + secondValue
  const percent = (percentageValue / total) * 100
  return percent.toFixed(1)
}

export const IdentityViewData: React.FC = () => {
  const {
    state: { account },
  } = useContext(StateContext)
  if (!account) return <></>

  const shortCollatorAddress = shortenAddress(account.address)

  return (
    <div className={styles.identityViewDetailsContainer}>
      <div className={styles.information}>
        <span className={cx(styles.labelSmall, styles.labelGray)}>
          STAKE COLLATOR
        </span>
        <span className={cx(styles.label, styles.labelGray)}>
          {shortCollatorAddress}
          <span className={cx(styles.labelSmall, styles.labelGray)}>
            since AUG 2021
          </span>
        </span>

        <span className={cx(styles.labelSmall, styles.labelGray)}>
          RANK | TOTAL STAKE
        </span>
        <span className={cx(styles.label, styles.labelGray)}>
          888 88,888,888.88 KILT
        </span>

        <span className={cx(styles.labelSmall, styles.labelGray)}>
          LOWEST STAKE | DELEGATORS
        </span>
        <span className={cx(styles.label, styles.labelGray)}>
          8,888.88 KILT 88/25
        </span>

        <span className={cx(styles.labelSmall, styles.labelGray)}>
          REWARD (%) / YEAR
        </span>
        <span className={cx(styles.label, styles.labelGray)}>8.88 %</span>

        <span className={cx(styles.labelSmall, styles.labelGray)}>
          PREDICTED REWARD
        </span>
        <span className={cx(styles.label, styles.labelGray)}>
          888,888,888.88 KILT
        </span>
      </div>
      <div className={styles.informationOther}>
        <span
          className={cx(styles.yellowBar, styles.labelSmall, styles.labelGray)}
        >
          unused
        </span>
        <span className={cx(styles.label, styles.labelGray)}>
          888,888.88 KILT
        </span>
        <span
          className={cx(styles.orangeBar, styles.labelSmall, styles.labelGray)}
        >
          ready to widthdraw
        </span>
        <Button label={'withdraw'} />
        <span className={cx(styles.label, styles.labelGray)}>
          888,888.88 KILT
        </span>
        <span
          className={cx(styles.redBar, styles.labelSmall, styles.labelGray)}
        >
          locked for 7 days (but stakeable)
        </span>
        <div className={styles.lockedContainer}>
          {options.map((val) => (
            <>
              <span className={cx(styles.labelSmall, styles.labelGray)}>
                {val.date.toUTCString()}
              </span>

              <span className={cx(styles.labelSmall, styles.labelGray)}>
                {val.amount.toLocaleString()} KILT
              </span>
            </>
          ))}
        </div>
      </div>
    </div>
  )
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
        <IdentityViewData />
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
