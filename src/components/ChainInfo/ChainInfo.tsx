import React, { useContext, useState, useEffect } from 'react'
import { queryBestBlock, queryBestFinalisedBlock } from '../../utils/chain'
import { sessionCounter, sessionTimer } from '../../utils/sessionCountdown'
import { Option } from '../Select/Select'
import { StateContext } from '../../utils/StateContext'
import styles from './ChainInfo.module.css'
import cx from 'classnames'
import { Icon } from '../Icon/Icon'
import { RefreshSelector } from '../RefreshSelector/RefreshSelector'
import { Button } from '../Button/Button'
import { ReactComponent as OFF } from '../../icons/OFF_70x36.svg'
import { ReactComponent as ON } from '../../icons/ON_70x36.svg'

// TODO: add features to refresh currently a placeholder
const options: Option[] = [
  { label: '10 secs', value: '10' },
  { label: '20 secs', value: '20' },
  { label: '60 secs', value: '60' },
  { label: '5 mins', value: '300' },
]

export const ChainInfo: React.FC = () => {
  const [bestBlockNumber, setBestBlock] = useState('')
  const [bestFinalisedBlockNumber, setBestFinalisedBlockNumber] = useState('')
  const [sessionCount, setSessionCount] = useState<number>()
  const [sessionCountdown, setSessionCountdown] = useState('')

  const {
    dispatch,
    state: { refreshPaused },
  } = useContext(StateContext)

  useEffect((): void => {
    const getBestBlockNumber = async () => {
      const bestNumber = await queryBestBlock()
      setBestBlock(bestNumber.toNumber().toLocaleString())
    }

    getBestBlockNumber()
  })

  useEffect((): void => {
    const getBestFinalisedBlockNumber = async () => {
      const finalisedNumber = await queryBestFinalisedBlock()
      setBestFinalisedBlockNumber(finalisedNumber.toNumber().toLocaleString())
    }

    getBestFinalisedBlockNumber()
  })

  useEffect((): void => {
    const getSessionCounter = async () => {
      const sessionInfo = await sessionCounter()
      const sessionTime = await sessionTimer()
      setSessionCount(sessionInfo)
      setSessionCountdown(sessionTime)
    }

    getSessionCounter()
  })
  return (
    <div className={refreshPaused ? styles.chaininfoPaused : styles.chaininfo}>
      <div className={styles.container}>
        <span className={styles.label}>Session Block</span>
        <span
          className={refreshPaused ? styles.countdownPaused : styles.countdown}
        >
          {sessionCount ? sessionCount : '000'}/600
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
          # {bestBlockNumber ? bestBlockNumber : '000,000'}
        </span>
        <span className={styles.leftMargin}>
          <Icon type="block_new" />
        </span>
        <span className={styles.label}>Finalized Block</span>
        <span className={refreshPaused ? styles.valuePaused : styles.value}>
          # {bestFinalisedBlockNumber ? bestFinalisedBlockNumber : '000,000'}
        </span>
        <div className={cx(styles.label, styles.leftMargin)}>Refresh Every</div>
        <div className={cx(styles.label, styles.refreshDropdown)}>
          <RefreshSelector options={options} placeholder={'10 secs'} />
        </div>
        <div className={styles.onOff}>
          <Button
            onClick={() => dispatch({ type: 'refreshPaused', refreshPaused })}
          >
            {refreshPaused ? <OFF /> : <ON />}
          </Button>
        </div>
      </div>
    </div>
  )
}
