import React, { useContext, useState, useEffect } from 'react'
import { sessionCounter, sessionTimer } from '../../utils/sessionCountdown'
import { StateContext } from '../../utils/StateContext'
import styles from './ChainInfo.module.css'
import cx from 'classnames'
import { Icon } from '../Icon/Icon'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'
import { getPercentage } from '../../utils/stakePercentage'
import { femtoToKilt } from '../../utils/conversion'

export const ChainInfo: React.FC = () => {
  const [sessionCount, setSessionCount] = useState<number>()
  const [sessionCountdown, setSessionCountdown] = useState('')
  const [collatorsPercentage, setCollatorsPercentage] = useState<string>('')
  const [delegatorsPercentage, setDelegatorsPercentage] = useState<string>('')

  const {
    state: { refreshPaused },
  } = useContext(StateContext)

  const {
    sessionInfo,
    bestBlock,
    bestFinalisedBlock,
    overallTotalStake,
    totalIssuance,
  } = useContext(BlockchainDataContext)

  useEffect(() => {
    const sessionCount = sessionCounter(sessionInfo, bestBlock)
    const sessionTime = sessionTimer(sessionInfo, bestBlock)
    setSessionCount(sessionCount)
    setSessionCountdown(sessionTime)
  }, [sessionInfo, bestBlock])

  useEffect(() => {
    if (totalIssuance && overallTotalStake) {
      // Takes it to a whole KILT
      const convertedCollatorsStake = femtoToKilt(
        overallTotalStake.collators.toBigInt()
      )
      // Takes it to a whole KILT
      const convertedDelegatorsStake = femtoToKilt(
        overallTotalStake.delegators.toBigInt()
      )
      // Takes it to a whole KILT
      const convertedTotalIssuance = femtoToKilt(totalIssuance.toBigInt())
      setCollatorsPercentage(
        getPercentage(convertedCollatorsStake, convertedTotalIssuance)
      )
      setDelegatorsPercentage(
        getPercentage(convertedDelegatorsStake, convertedTotalIssuance)
      )
    }
  }, [overallTotalStake, totalIssuance])

  console.log(
    'collators',
    `${collatorsPercentage + '%'} / 10%`,
    'delegators',
    `${delegatorsPercentage + '%'} / 40%`
  )
  return (
    <div className={refreshPaused ? styles.chaininfoPaused : styles.chaininfo}>
      <div className={styles.container}>
        <span className={styles.label}>Session Block countdown</span>
        <span
          className={refreshPaused ? styles.countdownPaused : styles.countdown}
        >
          {sessionCount}/600
        </span>
        {refreshPaused ? (
          <span className={styles.lineSpacer}>|</span>
        ) : (
          <span className={cx(styles.label, styles.lineSpacer)}>
            {sessionCountdown}
          </span>
        )}
        <span className={styles.refreshPaused}>
          {refreshPaused ? 'REFRESH PAUSED' : null}
        </span>
      </div>
      <div className={styles.container}>
        <Icon type="block_new" />
        <span className={styles.label}>Best Block</span>
        <span className={refreshPaused ? styles.valuePaused : styles.value}>
          # {bestBlock ? bestBlock.toNumber().toLocaleString() : '000,000'}
        </span>
        <span className={styles.leftMargin}>
          <Icon type="block_new" />
        </span>
        <span className={styles.label}>Finalized Block</span>
        <span className={refreshPaused ? styles.valuePaused : styles.value}>
          #{' '}
          {bestFinalisedBlock
            ? bestFinalisedBlock.toNumber().toLocaleString()
            : '000,000'}
        </span>
      </div>
    </div>
  )
}
