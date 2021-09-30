import styles from './Onboarding.module.css'
import { Button } from '../Button/Button'
import { useContext, useState } from 'react'
import { StoredStateContext } from '../../utils/StoredStateContext'
import PDF from '../../uploads/210930_Stakeboard_Terms&License.pdf'

export const NotAcceptedTerms: React.FC = () => {
  const { dispatch } = useContext(StoredStateContext)
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(true)
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
        <input
          type={'checkbox'}
          onClick={() => setAcceptedTerms(!acceptedTerms)}
        />
        I have read and agree to the
        <a
          href={PDF}
          rel="noopener noreferrer"
          target="_blank"
          className={styles.termsLink}
        >
          Terms of Use for the KILT Stakeboard Web Application
        </a>
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
