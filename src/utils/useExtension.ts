import { useEffect, useState } from 'react'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'

import { getGenesis } from './chain'
import { Account, Extension } from '../types'

/* 
async function getAllAccounts() {
  const allInjected = await web3Enable('Stakeboard')
  console.log('allInjected', allInjected)
  const allAccounts = await web3Accounts()
  console.log('allAccounts', allAccounts)
  const source = allAccounts[0].meta.source
  console.log('source', source)
  const injector = await web3FromSource(source)
  console.log('injector', injector)
  const rpcProviders = await web3ListRpcProviders(source)
  console.log('rpcProviders', rpcProviders)
}

getAllAccounts()
*/

export const useExtension = (ready: boolean) => {
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
    if (ready) {
      enable()
    }
  }, [ready])

  // Get accounts from extensions
  useEffect(() => {
    async function doEffect() {
      if (extensions.length) {
        const allAccounts = await web3Accounts()
        // TODO: We want to filter the account for the ones usable with the connected chain
        const genesisHash = await getGenesis()
        setAllAccounts(
          allAccounts
            .filter(
              (account) =>
                !account.meta.genesisHash?.length ||
                account.meta.genesisHash === genesisHash
            )
            .map((account) => ({
              name: account.meta.name,
              address: account.address,
            }))
        )
      }
    }
    doEffect()
  }, [extensions])

  return { allAccounts, extensions }
}
