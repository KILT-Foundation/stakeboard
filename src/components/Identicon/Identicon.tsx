import React from 'react'
import { polkadotIcon } from '@polkadot/ui-shared'

import styles from './Identicon.module.css'

interface CircleProps {
  cx: number
  cy: number
  fill: string
  r: number
}

const Circle: React.FC<CircleProps> = ({ cx, cy, fill, r }) => {
  return <circle cx={cx} cy={cy} fill={fill} r={r} />
}

export interface Props {
  address: string
  size?: number
}

export const Identicon: React.FC<Props> = ({ address, size = 46 }) => {
  const circles = polkadotIcon(address, { isAlternative: false })
  // circles[0].fill = '#575756'
  return (
    <div className={styles.Identicon} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 64 64">
        {circles.map((circle, index) => (
          <Circle
            cx={circle.cx}
            cy={circle.cy}
            fill={circle.fill}
            r={circle.r}
            key={index}
          />
        ))}
      </svg>
    </div>
  )
}

export const IdenticonMemo = React.memo(Identicon)
