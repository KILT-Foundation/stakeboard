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
      // figure out which did runtime api version we are dealing with
      const { sectionHash } = api.call.did.queryByAccount.meta
      const apiVersion = api.runtimeVersion.apis
        .find(([hash]) => hash.eq(sectionHash))![1]
        .toNumber()
      // api v2 expects a different parameter format than api v1
      const connectedDid = await api.call.did.queryByAccount(
        apiVersion >= 2 ? { AccountId32: address } : address
      )
      if (connectedDid.isSome) {
        const web3name = connectedDid.unwrap().w3n
        if (web3name.isSome) {
          const unwrapped = web3name.toHuman()
          if (typeof unwrapped !== 'string') {
            return setWeb3name(null)
          }
          setWeb3name(unwrapped)
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
