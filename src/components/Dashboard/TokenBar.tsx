import React, { useContext } from 'react'
import styles from './TokenBar.module.css'
import cx from 'classnames'
import { StoredStateContext } from '../../utils/StoredStateContext'
import { getPercent } from '../../utils/stakePercentage'

interface BarItemProps {
  style: string
  amount: number
  percentage: string
}
const BarItem: React.FC<BarItemProps> = ({ style, amount, percentage }) => {
  const {
    storedState: { denomination },
  } = useContext(StoredStateContext)
  const barWidth = amount / denomination
  return (
    <div
      className={cx(styles.item, style)}
      style={{ width: percentage ? percentage + '%' : barWidth }}
    ></div>
  )
}

export interface TokenBarProps {
  staked: number
  stakeable: number
  down?: boolean
  percentage?: boolean
}
export const TokenBar: React.FC<TokenBarProps> = ({
  staked,
  stakeable,
  down = false,
  percentage = false,
}) => {
  const {
    storedState: { denomination },
  } = useContext(StoredStateContext)

  const total = staked + stakeable

  const has_staked = staked > 0
  const has_stakeable = stakeable > 0

  let container_width = total / denomination
  container_width =
    has_staked && has_stakeable ? container_width + 1 : container_width

  const stakedPercentage = getPercent(staked, stakeable)
  const stakeablePercentage = getPercent(stakeable, staked)

  return (
    <div
      className={cx(styles.container, {
        [styles.containerDown]: down,
        [styles.percentage]: percentage,
      })}
      style={{ width: percentage ? '100%' : container_width }}
    >
      {has_staked && (
        <BarItem
          style={styles.staked}
          amount={staked}
          percentage={stakedPercentage}
        />
      )}
      {has_staked && has_stakeable && (
        <div className={cx(styles.item, styles.separator)} />
      )}
      {has_stakeable && (
        <BarItem
          style={styles.stakeable}
          amount={stakeable}
          percentage={stakeablePercentage}
        />
      )}
    </div>
  )
}
