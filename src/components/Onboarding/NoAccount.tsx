import styles from './Onboarding.module.css'

export const NoAccount: React.FC = () => {
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
        In order to enter the halfpipe, please make sure that you have created a
        KILT Identity and loaded it with at least 1001 KILT Coins. You can set
        this up using Polkadot.js or the Sporran extension for Google Chrome or
        Mozilla Firefox, which you can download below.
      </p>
      <p className={styles.text}>
        Please reload the page after setting up the extension.
      </p>
      <span className={styles.highlighted}>Shreddin' it up!</span>
    </>
  )
}
