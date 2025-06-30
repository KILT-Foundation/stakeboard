import styles from './Onboarding.module.css'
import { Button } from '../Button/Button'
import { useContext, useState } from 'react'
import { StateContext } from '../../utils/StateContext'

export const NotAcceptedTerms: React.FC = () => {
  const { dispatch } = useContext(StateContext)
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(true)
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
        <label>
          <input
            type={'checkbox'}
            onClick={() => setAcceptedTerms(!acceptedTerms)}
            className={styles.checkbox}
          />
          I have read and agree to the
          <a
            href={process.env.PUBLIC_URL + 'terms.html'}
            rel="noreferrer"
            target="_blank"
            className={styles.termsLink}
          >
            Terms of Use for the KILT Stakeboard Web Application
          </a>
        </label>
      </p>
      <p className={styles.text}>
        (for security reasons you will have to agree every time you open this
        website)
      </p>
      <span className={styles.highlighted}>
        <Button
          label="continue"
          disabled={acceptedTerms}
          onClick={() => {
            dispatch({ type: 'acceptTerms' })
          }}
        ></Button>
      </span>
    </>
  )
}
