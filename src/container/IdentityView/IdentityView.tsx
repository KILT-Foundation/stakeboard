import React, { useContext, useState, useEffect } from 'react'
import { Button } from '../../components/Button/Button'
import { StateContext } from '../../utils/StateContext'
import { TokenBar } from '../../components/Dashboard/TokenBar'
import { Identicon } from '../../components/Identicon/Identicon'
import styles from './IdentityView.module.css'
import cx from 'classnames'
import { withdrawStake } from '../../utils/chain'
import { femtoToKilt } from '../../utils/conversion'
import { padTime, blockToTime } from '../../utils/timeConvert'
import { format } from '../../utils/index'
import { useTxSubmitter } from '../../utils/useTxSubmitter'
import { getPercent } from '../../utils/stakePercentage'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'
import { Account } from '../../types'

export const IdentityView: React.FC = () => {
  const { bestBlock, accounts } = useContext(BlockchainDataContext)
  const [readyToWithdraw, setReadyToWithdraw] = useState(0)
  const [accountData, setAccountData] = useState<Account | undefined>()
  const {
    state: { account },
    dispatch,
  } = useContext(StateContext)

  const signAndSubmitTx = useTxSubmitter()

  const withdraw = async () => {
    if (readyToWithdraw > 0 && account) {
      const tx = await withdrawStake(account.address)
      await signAndSubmitTx(account.address, tx)
    }
  }

  useEffect(() => {
    const acconutData = accounts.filter(
      (val) => val.address === account?.address
    )
    setAccountData(acconutData[0])
  }, [account, accounts])

  useEffect(() => {
    if (!accountData || !bestBlock) return

    const unstakeable = accountData.unstaking
      .filter((val) => val.block < BigInt(bestBlock.toString()))
      .map((val) => {
        return femtoToKilt(val.amount)
      })

    const sumAllStakeable = unstakeable.reduce((a, b) => a + b, 0)

    setReadyToWithdraw(sumAllStakeable)
  }, [accountData, bestBlock])

  // TODO: placeholder for the error notifications
  if (!accountData || !bestBlock) return <></>

  return (
    <div className={styles.identityView}>
      <div className={styles.container}>
        <div className={styles.identityViewHeader}>
          <div className={styles.identiconContainer}>
            <Identicon address={accountData.address} />
          </div>
          <div className={cx(styles.label, styles.labelGray, styles.name)}>
            {accountData?.name}
          </div>
          <div className={styles.tokenbarContainer}>
            <TokenBar
              staked={accountData.staked}
              stakeable={accountData.stakeable}
              percentage
            />
          </div>
        </div>
        <div className={styles.identityStakeContainer}>
          <span className={cx(styles.labelSmall, styles.labelGray)}>
            my stake <br />
            <span className={cx(styles.label, styles.labelYellow)}>
              {format(accountData.staked)} | <span />
              {getPercent(accountData.staked, accountData.stakeable)} %
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
              {getPercent(accountData.stakeable, accountData.staked)} % |{' '}
              <span />
              {format(accountData.stakeable)}
            </span>
          </span>
        </div>
        <div className={styles.lockedContainer}>
          <span
            className={cx(
              styles.labelSmall,
              styles.labelGray,
              styles.orangeBar
            )}
          >
            Ready to withdraw
          </span>
          {readyToWithdraw > 0 && (
            <div className={styles.buttonCont}>
              <Button onClick={withdraw} label={'withdraw'} />
              <span className={cx(styles.label, styles.labelGray)}>
                {readyToWithdraw && format(readyToWithdraw)}
              </span>
            </div>
          )}
          <span
            className={cx(styles.labelSmall, styles.labelGray, styles.redBar)}
          >
            Locked for 7 days (stakeable)
          </span>
          {accountData.unstaking.map((val, index) => {
            const blockCount = val.block - BigInt(bestBlock.toString())
            if (blockCount < 0) return null
            const { days, hours, minutes, seconds } = blockToTime(
              Number(blockCount)
            )

            const daysPad = padTime(days)
            const hoursPad = padTime(hours)
            const minutesPad = padTime(minutes)
            const secondsPad = padTime(seconds)

            const timeable = `${daysPad}d : ${hoursPad}h : ${minutesPad}m : ${secondsPad}s`
            return (
              <div key={index}>
                <span className={cx(styles.labelSmall, styles.labelGray)}>
                  {`${index + 1}/${accountData.unstaking.length} ${timeable}`}
                </span>{' '}
                {format(femtoToKilt(val.amount))}
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => {
            dispatch({ type: 'unselectAccount' })
          }}
          label={'close'}
        />
      </div>
    </div>
  )
}
