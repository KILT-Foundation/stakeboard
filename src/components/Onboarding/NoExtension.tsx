import { useContext } from 'react'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'
import styles from './Onboarding.module.css'

export const NoExtension: React.FC = () => {
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
        Sleep less, stake more!
      </p>
      <p className={styles.text}>
        In order to enter the halfpipe, download the Sporran extension, create a
        KILT Identity and load it with at least
        {` ${minDelegatorStake + 1}`}
        KILT Coins. If you have the extension already, make sure to give
        Stakeboard access to it.
      </p>
      <p className={styles.text}>
        Please reload the page after setting up the extension.
      </p>
      <span className={styles.highlighted}>Shreddin' it up!</span>
    </>
  )
}
