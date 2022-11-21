import { Button, ButtonColor } from '../Button/Button'
import { shortenAddress } from '../../utils/shortenAddress'
import { Modal } from '../Modal/Modal'
import { claimDelegatorRewards, format } from '../../utils'
import { useEffect, useState } from 'react'
import { femtoKiltToDigits } from '../../utils/conversion'

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
  const [fee, setFee] = useState<number>(0.0003)

  useEffect(() => {
    const getFee = async () => {
      const feeInFemto = (
        await claimDelegatorRewards().then((tx) =>
          tx.paymentInfo(accountAddress)
        )
      ).partialFee

      if (!feeInFemto.isZero()) {
        const feeInKiltWithSixDigits = femtoKiltToDigits(
          feeInFemto.toBigInt(),
          6
        )
        setFee(feeInKiltWithSixDigits)
      }
    }
    getFee()
  }, [accountAddress])

  return (
    <Modal
      title="CLAIM REWARDS STAKE"
      buttons={
        <>
          <Button onClick={closeModal} label="CANCEL" />
          <Button onClick={onConfirm} label="CLAIM" color={ButtonColor.green} />
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
      <i>ESTIMATED TX FEE: {fee} KILT</i>
      <br />
    </Modal>
  )
}
