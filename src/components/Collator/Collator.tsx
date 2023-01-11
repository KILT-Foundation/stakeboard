import React, { useEffect, useState } from 'react'
import { Identicon } from '../Identicon/Identicon'
import styles from './Collator.module.css'
import { shortenAddress } from '../../utils/shortenAddress'
import { getConnection } from '../../utils/useConnect'
import { Web3Name } from '../Web3Name/Web3Name'

export interface Props {
  address: string
  activeSince?: number
}

export const Collator: React.FC<Props> = ({ address }) => {
  const [web3name, setWeb3name] = useState<string | null>(null)

  useEffect(() => {
    const getWeb3name = async () => {
      const api = await getConnection()
      const connectedDid = await api.query.didLookup.connectedDids(address)
      if (connectedDid.isSome) {
        const unwrapped = connectedDid.unwrap()
        const didAccount = unwrapped.did.toString()
        const web3name = await api.query.web3Names.names(didAccount)
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
          {web3name ? <Web3Name name={web3name} /> : shortAddress}
        </span>
      </div>
    </>
  )
}
