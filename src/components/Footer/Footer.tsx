import React from 'react'
import styles from './Footer.module.css'
import packageInfo from '../../../package.json'
import PDF from '../../uploads/210930_Stakeboard_Terms&License.pdf'
import { ImprintModal } from '../ImprintModal/ImprintModal'
import { useModal } from '../../utils/useModal'

export const Footer: React.FC = () => {
  const { isVisible, showModal, hideModal } = useModal()

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <span onClick={() => showModal()} className={styles.name}>
          IMPRINT
        </span>
        {isVisible && <ImprintModal closeModal={hideModal} />}
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
