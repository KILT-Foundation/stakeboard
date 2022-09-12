import { Button } from '../Button/Button'
import { shortenAddress } from '../../utils/shortenAddress'
import { Modal } from '../Modal/Modal'

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
      Collator {shortAddress}? <br />
      <br />
      <b>
        REWARDS: {rewards.toLocaleString()}
        <br />
      </b>
      <br />
      Unlike in Polkadot, rewards need to be
      <br />
      actively claimed for every single address!
      <br />
      E.g., when your collator claims their rewards
      <br />
      you still need to claim for yourself.
      <br />
      However, KILT rewards never expire,
      <br />
      so you don't need to rush.
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
