import { useContext } from 'react'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'
import styles from './Onboarding.module.css'

export const NoTokens: React.FC = () => {
  const { minDelegatorStake } = useContext(BlockchainDataContext)
  if (!minDelegatorStake) throw new Error('Data from the chain not found')

  return (
    <>
      <span className={styles.highlighted}>Hey Staker,</span>
      <p className={styles.text}>Welcome to Stakeboard!</p>
      <p className={styles.text}>
        As a delegator you can choose one collator to back per each KILT
        Identity and get rewarded when they successfully produce blocks.
        <br />
        <br />
        Sleep less, stake more!
      </p>
      <p className={styles.text}>
        In order to enter the halfpipe, please make sure that you have created a
        KILT Identity and loaded it with at least
        {` ${minDelegatorStake + 1} `}
        KILT Coins.
      </p>
      <p className={styles.text}>
        Please reload the page after setting up the extension.
      </p>
      <span className={styles.highlighted}>Shreddin' it up!</span>
    </>
  )
}
