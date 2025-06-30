import styles from './Onboarding.module.css'

export const NoData: React.FC = () => {
  return (
    <>
      <span className={styles.highlighted}>Hey Staker,</span>
      <p className={styles.text}>Welcome to Stakeboard!</p>
      <p className={styles.text}>
        KILT has ended an Era of Staking and is now time to unlock your stake!
        The KILT token is migrating to a new contract on Base, please refer to
        the
        <a
          href="https://medium.com/kilt-protocol/kilt-token-migration-guide-4ae8a5b686d6"
          className={styles.termsLink}
          rel="noreferrer"
          target="_blank"
        >
          migration guide
        </a>
        .
      </p>
      <p className={styles.text}>
        Data from the chain is being collected at the moment.
      </p>
      <p className={styles.text}>
        Please reload the page after setting up the extension.
      </p>
      <span className={styles.highlighted}>Shreddin' it up!</span>
    </>
  )
}
