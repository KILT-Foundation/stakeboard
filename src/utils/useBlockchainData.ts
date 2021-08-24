import { useContext, useEffect, useState } from 'react'
import { Account, BlockNumber, Candidate, Data, RoundInfo } from '../types'
import { initialize } from './polling'
import { StoredStateContext } from './StoredStateContext'

const femtoToKilt = (big: bigint) => {
  const inKilt = big / 10n ** 15n
  return Number(inKilt)
}

export type useBlockchainDataParams = {
  partialAccounts: Pick<Account, 'address' | 'name'>[]
}

export const useBlockchainData = (
  partialAccounts: Pick<Account, 'address' | 'name'>[]
) => {
  const [candidates, setCandidates] = useState<Record<string, Candidate>>({})
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [currentCandidates, setCurrentCandidates] = useState<string[]>([])
  const [dataSet, setDataSet] = useState<Data[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [sessionInfo, setSessionInfo] = useState<RoundInfo>()
  const [bestBlock, setBestBlock] = useState<BlockNumber>()
  const [bestFinalisedBlock, setBestFinalisedBlock] = useState<BlockNumber>()

  const { state } = useContext(StoredStateContext)

  // Query timer
  useEffect(() => {
    let stop = () => {}

    const doEffect = async () => {
      stop = await initialize(
        5,
        (
          newCandidates,
          newSelectedCandidates,
          newCurrentCandidates,
          chainInfo
        ) => {
          setCandidates(newCandidates)
          setSelectedCandidates(newSelectedCandidates)
          setCurrentCandidates(newCurrentCandidates)
          setSessionInfo(chainInfo.sessionInfo)
          setBestBlock(chainInfo.bestBlock)
          setBestFinalisedBlock(chainInfo.bestFinalisedBlock)
        }
      )
    }
    doEffect()

    return () => {
      stop()
    }
  }, [])

  // Full dataset from queried collators
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

  // Accounts and their queried info
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

  return { dataSet, accounts, sessionInfo, bestBlock, bestFinalisedBlock }
}
