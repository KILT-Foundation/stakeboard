import React, { useContext, useEffect, useState } from 'react'
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3FromSource,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from '@polkadot/extension-dapp'

import './App.css'
import { getGenesis } from './utils'
import { Data, Candidate, Account } from './types'
import {
  StoredStateContext,
  StoredStateProvider,
} from './utils/StoredStateContext'
import { StateProvider } from './utils/StateContext'

import { initialize } from './utils/polling'
import { Page } from './container/Page/Page'

async function getAllAccounts() {
  const allInjected = await web3Enable('KILT Staking App')
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

const femtoToKilt = (big: bigint) => {
  const inKilt = big / 10n ** 15n
  return Number(inKilt)
}

interface ConsumerProps {
  partialAccounts: Pick<Account, 'address' | 'name'>[]
}

const Consumer: React.FC<ConsumerProps> = ({ partialAccounts }) => {
  const [candidates, setCandidates] = useState<Record<string, Candidate>>({})
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [currentCandidates, setCurrentCandidates] = useState<string[]>([])
  const [dataSet, setDataSet] = useState<Data[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])

  const { state } = useContext(StoredStateContext)

  useEffect(() => {
    let stop = () => {}

    const doEffect = async () => {
      stop = await initialize(
        5,
        (newCandidates, newSelectedCandidates, newCurrentCandidates) => {
          setCandidates(newCandidates)
          setSelectedCandidates(newSelectedCandidates)
          setCurrentCandidates(newCurrentCandidates)
        }
      )
    }
    doEffect()

    return () => {
      stop()
    }
  }, [])

  useEffect(() => {
    const newDataSet: Data[] = Object.values(candidates).map((candidate) => {
      const totalStake =
        candidate.stake +
        candidate.delegators.reduce(
          (prev, current) => prev + current.amount,
          0n
        )

      const sortedLowestStake = candidate.delegators.sort((a, b) =>
        a.amount >= b.amount ? 1 : -1
      )
      const lowestStake = sortedLowestStake.length
        ? femtoToKilt(sortedLowestStake[0].amount)
        : null

      return {
        active: currentCandidates.includes(candidate.id),
        activeNext: selectedCandidates.includes(candidate.id),
        collator: candidate.id,
        delegators: candidate.delegators.length,
        lowestStake: lowestStake,
        totalStake: femtoToKilt(totalStake),
        // TODO: fill with account data!
        stakes: [],
        favorite: state.favorites.includes(candidate.id),
        isLeaving: !!candidate.isLeaving,
      }
    })

    setDataSet(newDataSet)
  }, [candidates, state, selectedCandidates, currentCandidates])

  useEffect(() => {
    // TODO: get data on actual stake / stakeable / other amounts
    const completeAccounts: Account[] = partialAccounts.map((account) => ({
      name: account.name,
      address: account.address,
      staked: 5000,
      stakeable: 2000,
      used: true,
    }))
    setAccounts(completeAccounts)
  }, [partialAccounts])

  return <Page dataSet={dataSet} accounts={accounts} />
}

function App() {
  const [web3Enabled, setWeb3Enabled] = useState(false)
  const [allAccounts, setAllAccounts] = useState<
    Pick<Account, 'address' | 'name'>[]
  >([])

  useEffect(() => {
    async function doEffect() {
      const allInjected = await web3Enable('KILT Staking App')
      setWeb3Enabled(true)
    }
    doEffect()
  }, [])

  useEffect(() => {
    async function doEffect() {
      if (web3Enabled) {
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
  }, [web3Enabled])

  return (
    <div className="App">
      <StoredStateProvider>
        <StateProvider>
          <Consumer partialAccounts={allAccounts} />
        </StateProvider>
      </StoredStateProvider>
    </div>
  )
}

export default App
