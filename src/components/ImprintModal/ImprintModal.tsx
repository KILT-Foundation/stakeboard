import React from 'react'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'

export interface Props {
  closeModal: () => void
}

export const ImprintModal: React.FC<Props> = ({ closeModal }) => {
  return (
    <Modal
      title="IMPRINT"
      buttons={<Button onClick={closeModal} label="CANCEL" />}
    ></Modal>
  )
}
