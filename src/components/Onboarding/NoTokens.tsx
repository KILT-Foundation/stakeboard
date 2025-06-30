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
        KILT has ended an Era of Staking and is now time to unlock your stake!
        The KILT token is migrating to a new contract on Base, please refer to
        the
        <a href="https://medium.com/kilt-protocol/kilt-token-migration-guide-4ae8a5b686d6">
          migration guide
        </a>
        .
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
