import React from 'react'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import styles from './ImprintModal.module.css'

export interface Props {
  closeModal: () => void
}

export const ImprintModal: React.FC<Props> = ({ closeModal }) => {
  return (
    <Modal
      title="IMPRINT"
      buttons={<Button onClick={closeModal} label="CANCEL" />}
    >
      <p className={styles.text}>
        B.T.E. BOTLabs Trusted Entity GmbH <br />
        Keithstraße 2-4
        <br />
        10787 Berlin, Germany
        <br />
      </p>
      <p className={styles.text}>
        German Commercial Court: Amtsgericht Charlottenburg in Berlin
        <br />
        Registration Number: HRB 231219B
        <br />
        Tax No: 29/244/31363
        <br />
        Managing Director: Ingo Rübe
        <br />
      </p>
      <p className={styles.text}>
        Contact: techsupport@kilt.io
        <br />
        Or go to https://support.kilt.io/support and click on “Contact Us”
        <br />
      </p>
      <p className={styles.text}>
        Requirements according to § 5 TMG (Germany)
        <br />
      </p>
    </Modal>
  )
}
