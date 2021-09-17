import React, { useContext } from 'react'
import styles from './TokenBar.module.css'
import cx from 'classnames'
import { StoredStateContext } from '../../utils/StoredStateContext'

interface BarItemProps {
  style: string
  amount: number
}
const BarItem: React.FC<BarItemProps> = ({ style, amount }) => {
  const {
    state: { denomination },
  } = useContext(StoredStateContext)
  return (
    <div
      className={cx(styles.item, style)}
      style={{ width: amount / denomination }}
    ></div>
  )
}

export interface TokenBarProps {
  staked: number
  stakeable: number
  down?: boolean
}
export const TokenBar: React.FC<TokenBarProps> = ({
  staked,
  stakeable,
  down = false,
}) => {
  const {
    state: { denomination },
  } = useContext(StoredStateContext)

  const total = staked + stakeable

  const has_staked = staked > 0
  const has_stakeable = stakeable > 0

  let container_width = total / denomination
  container_width =
    has_staked && has_stakeable ? container_width + 1 : container_width

  return (
    <div
      className={cx(styles.container, { [styles.containerDown]: down })}
      style={{ width: container_width }}
    >
      {has_staked && <BarItem style={styles.staked} amount={staked} />}
      {has_staked && has_stakeable && (
        <div className={cx(styles.item, styles.separator)} />
      )}
      {has_stakeable && <BarItem style={styles.stakeable} amount={stakeable} />}
    </div>
  )
}
