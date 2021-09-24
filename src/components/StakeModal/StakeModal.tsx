import { Button } from '../Button/Button'
import { shortenAddress } from '../../utils/shortenAddress'
import { Modal } from '../Modal/Modal'

export interface Props {
  collatorAddress: string
  newStake: number
  onConfirm: () => void
  closeModal: () => void
  status: 'increaseStake' | 'decreaseStake' | 'unstake' | 'unchanged' | 'stake'
}

export const StakeModal: React.FC<Props> = ({
  collatorAddress,
  newStake,
  onConfirm,
  closeModal,
  status,
}) => {
  const shortAddress = shortenAddress(collatorAddress)

  const NOTES_MESSAGE = (
    <p>
      Note: <br />
      You can withdraw <br />
      the unstaked amount after 7 days <br />
      (see progress in your dashboard) <br />
      or use the unstaked balance immediately <br />
      to back a Collator
    </p>
  )

  switch (status) {
    case 'stake':
      return (
        <Modal
          title="CONFIRM STAKE"
          buttons={
            <>
              <Button onClick={closeModal} label="CANCEL" />
              <Button onClick={onConfirm} label="STAKE" orangeButton />
            </>
          }
        >
          Do you want to stake on <br />
          Collator {shortAddress}? <br />
          <br />
          STAKE: {newStake.toLocaleString()} <br />
        </Modal>
      )
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
          Do you want to increase stake on <br />
          Collator {shortAddress}? <br />
          <br />
          STAKE: {newStake.toLocaleString()} <br />
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
            <br />
            STAKE: {newStake.toLocaleString()} <br />
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
            Do you want to stop staking on <br />
            Collator {shortAddress}? <br />
          </div>
          {NOTES_MESSAGE}
        </Modal>
      )
    case 'unchanged':
    default:
      return null
  }
}
