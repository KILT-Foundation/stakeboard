import React, { useContext } from 'react'
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
  const {
    dispatch,
    state: { refreshPaused },
  } = useContext(StateContext)
  return (
    <div className={refreshPaused ? styles.chaininfoPaused : styles.chaininfo}>
      <div className={styles.container}>
        <span className={styles.label}>Session Countdown</span>
        <span
          className={refreshPaused ? styles.countdownPaused : styles.countdown}
        >
          2:00:00
        </span>
        <span className={styles.lineSpacer}>{refreshPaused ? '|' : null}</span>
        <span className={styles.refreshPaused}>
          {refreshPaused ? 'REFRESH PAUSED' : null}
        </span>
      </div>
      <div className={styles.container}>
        <Icon type="block_new" />
        <span className={styles.label}>Best Block</span>{' '}
        <span className={refreshPaused ? styles.valuePaused : styles.value}>
          # 8,888,888
        </span>
        <span className={styles.leftMargin}>
          <Icon type="block_new" />
        </span>
        <span className={styles.label}>Finalized Block</span>{' '}
        <span className={refreshPaused ? styles.valuePaused : styles.value}>
          # 8,888,888
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
