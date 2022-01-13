import styles from './Onboarding.module.css'
import { Button } from '../Button/Button'
import { useContext, useState } from 'react'
import { StateContext } from '../../utils/StateContext'
import PDF from '../../uploads/220106_Stakeboard_Terms&License.pdf'

export const NotAcceptedTerms: React.FC = () => {
  const { dispatch } = useContext(StateContext)
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(true)
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
        <label>
          <input
            type={'checkbox'}
            onClick={() => setAcceptedTerms(!acceptedTerms)}
            className={styles.checkbox}
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
