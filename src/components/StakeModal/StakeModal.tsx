import { ModalStake } from '../../types'
import { Button } from '../Button/Button'
import { shortenAddress } from '../../utils/shortenAddress'
import { Modal } from '../Modal/Modal'

export interface Props {
  modalStake: ModalStake
  onConfirm: () => void
  closeModal: () => void
  status: 'increaseStake' | 'decreaseStake' | 'unstake' | 'unchanged'
}

export const StakeModal: React.FC<Props> = ({
  modalStake,
  onConfirm,
  closeModal,
  status,
}) => {
  const shortAddress = shortenAddress(modalStake.address)

  const NOTES_MESSAGE = (
    <p>
      Note: <br />
      You can withdraw <br />
      the unstaked amount after 7 days <br />
      (see progress in your dashboard) <br />
      or use the unstaked balance immedietaly to back a Collator
    </p>
  )

  switch (status) {
    case 'increaseStake':
      return (
        <Modal
          title="INCREASE STAKE"
          buttons={
            <>
              <Button onClick={closeModal} label="CANCEL" />
              <Button onClick={onConfirm} label="STAKE" orangeButton />
            </>
          }
        >
          Do you want to increase the stake of <br />
          Collator {shortAddress} <br />
          (new staked amount {modalStake.newStake} <br />
          from {modalStake.name})?
        </Modal>
      )
    case 'decreaseStake':
      return (
        <Modal
          title="DECREASE STAKE"
          buttons={
            <>
              <Button onClick={closeModal} label="CANCEL" />
              <Button onClick={onConfirm} label="STAKE" orangeButton />
            </>
          }
        >
          <div>
            Do you want to decrease the stake of <br />
            Collator {shortAddress} <br />
            (new staked amount {modalStake.newStake} <br />
            from {modalStake.name})?
          </div>
          {NOTES_MESSAGE}
        </Modal>
      )
    case 'unstake':
      return (
        <Modal
          title="UNSTAKE"
          buttons={
            <>
              <Button onClick={closeModal} label="CANCEL" />
              <Button onClick={onConfirm} label="UNSTAKE" orangeButton />
            </>
          }
        >
          <div>
            Do you want to stop staking <br />
            Collator {shortAddress} <br />
            (unstake {modalStake?.staked} <br />
            from {modalStake.name})?
          </div>
          {NOTES_MESSAGE}
        </Modal>
      )
    case 'unchanged':
    default:
      return null
  }
}
