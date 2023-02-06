import { useContext, useEffect, useState } from 'react'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'

import { getGenesis } from './chain'
import { Account, Extension } from '../types'
import { StateContext } from './StateContext'

export const useExtension = () => {
  const {
    state: { loadingData },
  } = useContext(StateContext)

  const [extensions, setExtensions] = useState<Extension[]>([])
  const [allAccounts, setAllAccounts] = useState<
    Pick<Account, 'address' | 'name'>[]
  >([])

  // Enable extensions
  useEffect(() => {
    async function enable() {
      const allInjected = await web3Enable('Stakeboard')
      if (allInjected.length) {
        setExtensions(allInjected)
      }
    }
    // wait for blockchain data to be loaded - this gives extensions time to inject.
    // Loading extensions immediately on page load results in sporran sometimes not being found by stakeboard.
    if (loadingData === 'available') {
      enable()
    }
  }, [loadingData])

  // Get accounts from extensions
  useEffect(() => {
    async function doEffect() {
      if (extensions.length) {
        const genesisHash = await getGenesis()
        // TODO: we can also subscribe using web3AccountsSubscribe, which would update the accounts list upon creation of a new account
        const allAccounts = await web3Accounts({ genesisHash, ss58Format: 38 })
        setAllAccounts(
          allAccounts.map(({ address, meta: { name } }) => ({
            name,
            address,
          }))
        )
      }
    }
    doEffect()
  }, [extensions])

  return { allAccounts, extensions }
}
