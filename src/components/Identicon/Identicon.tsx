import React, { useState } from 'react'
import { polkadotIcon } from '@polkadot/ui-shared'

import styles from './Identicon.module.css'

interface AddressIconProps {
  address: string
  size: number
}

const AddressIcon: React.FC<AddressIconProps> = ({ address, size }) => {
  const circles = polkadotIcon(address, { isAlternative: false })

  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {circles.map((circle) => (
        <circle cx={circle.cx} cy={circle.cy} fill={circle.fill} r={circle.r} />
      ))}
    </svg>
  )
}

interface CheckmarkIconProps {
  fill: string
  size: number
}

const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({ fill, size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 500 500">
      <g>
        <path
          fill={fill}
          d="M418.275,418.275c95.7-95.7,95.7-250.8,0-346.5s-250.8-95.7-346.5,0s-95.7,250.8,0,346.5S322.675,513.975,418.275,418.275
			z M157.175,207.575l55.1,55.1l120.7-120.6l42.7,42.7l-120.6,120.6l-42.8,42.7l-42.7-42.7l-55.1-55.1L157.175,207.575z"
        />
      </g>
    </svg>
  )
}

export interface Props {
  address: string
  size?: number
}

export const Identicon: React.FC<Props> = ({ address, size = 46 }) => {
  const [didCopy, setDidCopy] = useState(false)

  function copyAddress(e: React.MouseEvent<Element>) {
    e.stopPropagation()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(address).then(() => {
        setDidCopy(true)
        setTimeout(() => {
          setDidCopy(false)
        }, 1500)
      })
    }
  }

  return (
    <div
      className={styles.Identicon}
      style={{ width: size, height: size }}
      onClick={copyAddress}
    >
      {didCopy ? (
        <CheckmarkIcon size={size} fill='#FFFFFF' />
      ) : (
        <AddressIcon size={size} address={address} />
      )}
    </div>
  )
}

export const IdenticonMemo = React.memo(Identicon)
