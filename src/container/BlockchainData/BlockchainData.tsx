import React, { useContext, useEffect, useState } from 'react'
import { Account, Candidate, ChainTypes, Data } from '../../types'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'
import { femtoToKilt } from '../../utils/conversion'
import { AccountInfo, initialize } from '../../utils/polling'
import { StoredStateContext } from '../../utils/StoredStateContext'

export interface Props {
  partialAccounts: Pick<Account, 'address' | 'name'>[]
}

export const BlockchainData: React.FC<Props> = ({
  partialAccounts,
  children,
}) => {
  const [candidates, setCandidates] = useState<Record<string, Candidate>>({})
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [currentCandidates, setCurrentCandidates] = useState<string[]>([])
  const [dataSet, setDataSet] = useState<Data[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [sessionInfo, setSessionInfo] = useState<ChainTypes.RoundInfo>()
  const [bestBlock, setBestBlock] = useState<ChainTypes.BlockNumber>()
  const [
    bestFinalisedBlock,
    setBestFinalisedBlock,
  ] = useState<ChainTypes.BlockNumber>()
  const [accountInfos, setAccountInfos] = useState<Record<string, AccountInfo>>(
    {}
  )

  const { state } = useContext(StoredStateContext)

  // Query timer
  useEffect(() => {
    if (!partialAccounts.length) return

    let stop = () => {}

    const doEffect = async () => {
      stop = await initialize(
        5,
        partialAccounts.map((account) => account.address),
        (
          newCandidates,
          newSelectedCandidates,
          newCurrentCandidates,
          chainInfo,
          newAccountInfos
        ) => {
          setCandidates(newCandidates)
          setSelectedCandidates(newSelectedCandidates)
          setCurrentCandidates(newCurrentCandidates)
          setSessionInfo(chainInfo.sessionInfo)
          setBestBlock(chainInfo.bestBlock)
          setBestFinalisedBlock(chainInfo.bestFinalisedBlock)
          setAccountInfos(newAccountInfos)
        }
      )
    }
    doEffect()

    return () => {
      stop()
    }
  }, [partialAccounts])

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
        stakes: candidate.userStakes.map(({ account, stake }) => ({
          account,
          stake: femtoToKilt(stake),
        })),
        favorite: state.favorites.includes(candidate.id),
        isLeaving: !!candidate.isLeaving,
      }
    })

    setDataSet(newDataSet)
  }, [candidates, state, selectedCandidates, currentCandidates])

  // Accounts and their queried info
  useEffect(() => {
    // We need data from the chain for all the accounts before mapping the final account object together
    if (!partialAccounts.every((account) => accountInfos[account.address]))
      return
    // TODO: get data on actual stake / stakeable / other amounts
    const completeAccounts: Account[] = partialAccounts.map((account) => ({
      name: account.name,
      address: account.address,
      staked: femtoToKilt(accountInfos[account.address].totalStake),
      stakeable: femtoToKilt(accountInfos[account.address].stakeable),
      unstaking: accountInfos[account.address].unstaking,
      used:
        accountInfos[account.address].totalStake > 0 ||
        accountInfos[account.address].unstaking.length > 0,
    }))
    setAccounts(completeAccounts)
  }, [partialAccounts, accountInfos])

  return (
    <BlockchainDataContext.Provider
      value={{ dataSet, accounts, sessionInfo, bestBlock, bestFinalisedBlock }}
    >
      {children}
    </BlockchainDataContext.Provider>
  )
}
