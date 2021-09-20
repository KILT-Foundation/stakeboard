import styles from './Onboarding.module.css'
import { Button } from '../Button/Button'
import { useContext } from 'react'
import { StoredStateContext } from '../../utils/StoredStateContext'

export const NotAcceptedTerms: React.FC = () => {
  const { dispatch } = useContext(StoredStateContext)
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
        In order to enter the halfpipe, please make sure to agree to the Terms
        &amp; Conditions.
      </p>
      <p className={styles.text}>Read Terms: LINK COMING SOON</p>
      <span className={styles.highlighted}>
        <Button
          label="Accept"
          onClick={() => {
            dispatch({ type: 'acceptTerms' })
          }}
        ></Button>
      </span>
    </>
  )
}
