import React, { useContext } from 'react'
import styles from './Footer.module.css'
import packageInfo from '../../../package.json'
import PDF from '../../uploads/220106_Stakeboard_Terms&License.pdf'
import { ImprintModal } from '../ImprintModal/ImprintModal'
import { useModal } from '../../utils/useModal'
import {} from '../../utils/stakePercentage'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'
import cx from 'classnames'

export const Footer: React.FC = () => {
  const { isVisible, showModal, hideModal } = useModal()

  const { stakingRates } = useContext(BlockchainDataContext)

  return (
    <div className={styles.footerContainer}>
      <div className={cx(styles.footer, styles.name)}>
        <div className={styles.reward}>
          <span className={cx(styles.gray, styles.paddingRight)}>STAKED</span>
          <span
            className={
              stakingRates?.delegatorStakingRate || 0 <= 40
                ? styles.yellow
                : styles.red
            }
          >{`${stakingRates?.delegatorStakingRate.toFixed(1)}%`}</span>
          <span className={styles.spacer} />
          <span className={cx(styles.gray, styles.paddingRight)}>
            {' '}
            REWARD RATE
          </span>
          <span
            className={
              stakingRates?.delegatorStakingRate || 0 <= 40
                ? styles.yellow
                : styles.red
            }
          >
            {stakingRates?.delegatorRewardRate.toFixed(1)}%
          </span>
        </div>
        <div className={styles.legal}>
          <span onClick={() => showModal()} className={styles.yellow}>
            IMPRINT
          </span>
          {isVisible && <ImprintModal closeModal={hideModal} />}
          <span className={styles.spacer} />
          <a
            href={PDF}
            rel="noopener noreferrer"
            target="_blank"
            className={styles.yellow}
          >
            TERMS & CONDITIONS
          </a>
        </div>
        <div className={styles.versionInfo}>v {packageInfo.version}</div>
      </div>
    </div>
  )
}
