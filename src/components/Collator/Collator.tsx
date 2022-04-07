import React, { useEffect, useState } from 'react'
import { Option, Bytes, Struct } from '@polkadot/types'
import { AccountId } from '@polkadot/types/interfaces'
import { Identicon } from '../Identicon/Identicon'
import styles from './Collator.module.css'
import { shortenAddress } from '../../utils/shortenAddress'
import { getConnection } from '../../utils/useConnect'

export interface Props {
  address: string
  activeSince?: number
}

interface PalletDidLookupConnectionRecord extends Struct {
  did: AccountId
}

export const Collator: React.FC<Props> = ({ address, activeSince }) => {
  const [web3name, setWeb3name] = useState<string | null>(null)

  useEffect(() => {
    const getWeb3name = async () => {
      const api = await getConnection()
      const connectedDid = await api.query.didLookup.connectedDids<
        Option<PalletDidLookupConnectionRecord>
      >(address)
      if (connectedDid.isSome) {
        const unwrapped = connectedDid.unwrap()
        const didAccount = unwrapped.did.toString()
        const web3name = await api.query.web3Names.names<Option<Bytes>>(
          didAccount
        )
        if (web3name.isSome) {
          const unwrapped = web3name.unwrap()
          setWeb3name(unwrapped.toUtf8())
        }
      }
    }
    getWeb3name()
  }, [address])

  const shortAddress = shortenAddress(address)

  return (
    <>
      <span className={styles.identicon}>
        <Identicon address={address} />
      </span>
      <div className={styles.wrapper}>
        <span title={address} className={styles.address}>
          {web3name || shortAddress}
        </span>
      </div>
    </>
  )
}
