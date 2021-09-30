import React from 'react'
import styles from './Footer.module.css'
import packageInfo from '../../../package.json'
import PDF from '../../uploads/210930_Stakeboard_Terms&License.pdf'

export const Footer: React.FC = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <a
          href={PDF}
          rel="noopener noreferrer"
          target="_blank"
          className={styles.name}
        >
          IMPRINT
        </a>
        <span className={styles.spacer} />
        <a
          href={PDF}
          rel="noopener noreferrer"
          target="_blank"
          className={styles.name}
        >
          TERMS & CONDITIONS
        </a>
        <div className={styles.versionInfo}>v {packageInfo.version}</div>
      </div>
    </div>
  )
}
