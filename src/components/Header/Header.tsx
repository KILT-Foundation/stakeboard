import React from 'react'
import { Icon } from '../Icon/Icon'
import styles from './Header.module.css'

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div>
        <span className={styles.name}>Stakeboard</span>
        <Icon type="skateboarder" width={60} />
      </div>
      <Icon type="BUILT_ON_KILT" width={70} />
    </div>
  )
}
