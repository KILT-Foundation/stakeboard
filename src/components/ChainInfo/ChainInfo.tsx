import React, { useState } from 'react'
import styles from './ChainInfo.module.css'
import cx from 'classnames'
import { Icon } from '../Icon/Icon'

export const ChainInfo: React.FC = () => {
  const [isOn, setIsOn] = useState(true)
  return (
    <div className={styles.chaininfo}>
      <div className={styles.container}>
        <span className={styles.label}>Session Countdown</span>
        <span className={styles.countdown}>2:00:00</span>
        <span className={styles.refreshPaused}>
          {isOn ? null : '| REFRESH PAUSED'}
        </span>
      </div>
      <div className={styles.container}>
        <Icon type='block_new' />
        <span className={styles.label}>Best Block</span>{' '}
        <span className={styles.value}># 8,888,888</span>
        <span className={styles.leftMargin}>
          <Icon type='block_new' />
        </span>
        <span className={cx(styles.label)}>Finalized Block</span>{' '}
        <span className={styles.value}># 8,888,888</span>
        <span className={cx(styles.label, styles.leftMargin)}>
          Refresh Every 10 secs
        </span>
        <span className={styles.onOff} onClick={() => setIsOn(!isOn)}>
          {isOn ? (
            <Icon type='ON_70x36' width={70} />
          ) : (
            <Icon type='OFF_70x36' width={70} />
          )}
        </span>
      </div>
    </div>
  )
}
