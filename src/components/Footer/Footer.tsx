import React, { useContext, useEffect, useState } from 'react'
import styles from './Footer.module.css'
import packageInfo from '../../../package.json'
import PDF from '../../uploads/220106_Stakeboard_Terms&License.pdf'
import { ImprintModal } from '../ImprintModal/ImprintModal'
import { useModal } from '../../utils/useModal'
import {
  getPercentage,
  delegatorsRewardRate,
} from '../../utils/stakePercentage'
import { femtoToKilt } from '../../utils/conversion'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'
import cx from 'classnames'

export const Footer: React.FC = () => {
  const { isVisible, showModal, hideModal } = useModal()
  const [delegatorsPercentage, setDelegatorsPercentage] = useState<string>('0')
  const [delegatorsReward, setDelegatorsReward] = useState<string>('0')

  const { overallTotalStake, totalIssuance, bestBlock } = useContext(
    BlockchainDataContext
  )

  useEffect(() => {
    if (!overallTotalStake || !totalIssuance) return
    // Takes it to a whole KILT
    const convertedDelegatorsStake = femtoToKilt(overallTotalStake.delegators)
    // Takes it to a whole KILT
    const convertedTotalIssuance = femtoToKilt(totalIssuance)
    setDelegatorsPercentage(
      getPercentage(convertedDelegatorsStake, convertedTotalIssuance)
    )
  }, [overallTotalStake, totalIssuance])

  useEffect(() => {
    if (!bestBlock) return

    const rewardRate = delegatorsRewardRate(
      Number(delegatorsPercentage),
      bestBlock
    )
    setDelegatorsReward(rewardRate)
  }, [bestBlock, delegatorsPercentage])

  return (
    <div className={styles.footerContainer}>
      <div className={cx(styles.footer, styles.name)}>
        <div className={styles.reward}>
          <span className={cx(styles.gray, styles.paddingRight)}>STAKED</span>
          <span
            className={
              delegatorsPercentage <= '40' ? styles.yellow : styles.red
            }
          >{`${delegatorsPercentage}%`}</span>
          <span className={styles.spacer} />
          <span className={cx(styles.gray, styles.paddingRight)}>
            {' '}
            REWARD RATE
          </span>
          <span
            className={
              delegatorsPercentage <= '40' ? styles.yellow : styles.red
            }
          >
            {delegatorsReward}%
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
