import React, { useContext } from 'react'
import styles from './Footer.module.css'
import packageInfo from '../../../package.json'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'
import cx from 'classnames'

export const Footer: React.FC = () => {
  const { stakingRates } = useContext(BlockchainDataContext)

  return (
    <footer className={styles.footerContainer}>
      <div className={cx(styles.footer, styles.name)}>
        <nav className={styles.legal}>
          <a
            className={styles.legalAnchor}
            href={process.env.PUBLIC_URL + 'imprint.html'}
            target="_blank"
            rel="noreferrer"
          >
            Imprint
          </a>
          <a
            className={styles.legalAnchor}
            href={process.env.PUBLIC_URL + 'terms.html'}
            target="_blank"
            rel="noreferrer"
          >
            Terms
          </a>
          <a
            className={styles.legalAnchor}
            href="https://github.com/BTE-Trusted-Entity/stakeboard"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className={styles.legalAnchor}
            href="https://support.kilt.io/"
            target="_blank"
            rel="noreferrer"
          >
            Support
          </a>
        </nav>
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

        <div className={styles.versionInfo}>
          v {packageInfo.version} © 2022 B.T.E. BOTLabs Trusted Entity GmbH
        </div>
      </div>
    </footer>
  )
}
