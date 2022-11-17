import { Button } from '../Button/Button'
import { shortenAddress } from '../../utils/shortenAddress'
import { Modal } from '../Modal/Modal'
import { format } from '../../utils'

export interface Props {
  accountAddress: string
  rewards: number
  onConfirm: () => void
  closeModal: () => void
}

export const RewardModal: React.FC<Props> = ({
  accountAddress,
  rewards,
  onConfirm,
  closeModal,
}) => {
  const shortAddress = shortenAddress(accountAddress)

  return (
    <Modal
      title="CLAIM REWARDS STAKE"
      buttons={
        <>
          <Button onClick={closeModal} label="CANCEL" />
          <Button onClick={onConfirm} label="CLAIM" greenButton />
        </>
      }
    >
      Do you want to claim rewards for <br />
      Delegator {shortAddress}? <br />
      <br />
      <b>
        REWARDS: {format(rewards)}
        <br />
      </b>
      <br />
      KILT staking rewards can be<br></br>
      claimed manually at the convenience<br></br>
      of the account owner.
      <br />
      <br />
      Please note that you need to pay the
      <br />
      transaction fee.
      <br />
      <br />
      ESTIMATED TX FEE: 0.03
      <br />
    </Modal>
  )
}
