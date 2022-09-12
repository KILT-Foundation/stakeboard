import { useContext } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { DefinitionsCall, RegistryTypes } from '@polkadot/types/types'

import { StateContext } from './StateContext'

let cachedApi: Promise<ApiPromise> | null = null
let wsProvider: WsProvider | null = null

const ENDPOINT =
  process.env.REACT_APP_FULL_NODE_ENDPOINT ||
  'wss://peregrine.kilt.io/parachain-public-ws'

// TODO: Import from KILT type registry
const types: RegistryTypes = {
  StakingRates: {
    collatorStakingRate: 'Perquintill',
    collatorRewardRate: 'Perquintill',
    delegatorStakingRate: 'Perquintill',
    delegatorRewardRate: 'Perquintill',
  },
}
const runtime: DefinitionsCall = {
  ParachainStakingApi: [
    {
      methods: {
        get_staking_rates: {
          description:
            'Calculates the current staking and reward rates for collators and delegators',
          params: [],
          type: 'StakingRates',
        },
        get_unclaimed_staking_rewards: {
          description:
            'Calculates the staking rewards for a given account address',
          params: [
            {
              name: 'account',
              type: 'AccountId32',
            },
          ],
          type: 'Balance',
        },
      },
      version: 1,
    },
  ],
}

export const useConnect = () => {
  const { dispatch } = useContext(StateContext)

  if (!cachedApi) {
    wsProvider = new WsProvider(ENDPOINT)
    cachedApi = ApiPromise.create({
      provider: wsProvider,
      types,
      runtime,
    })

    wsProvider.on('disconnected', () => dispatch({ type: 'disconnected' }))
    wsProvider.on('connected', () => dispatch({ type: 'connected' }))
    wsProvider.on('error', (error) => dispatch({ type: 'error', err: error }))
  }

  return cachedApi
}

export const getConnection = async () => {
  if (!cachedApi)
    throw new Error('Connection to Blockchain was not initialized')

  let resolved = await cachedApi
  while (!resolved.isConnected) {
    // Wait until the connection is back
    await new Promise((done) => setTimeout(() => done(null), 2000))
  }
  return resolved
}

export async function disconnect() {
  return (await cachedApi)?.disconnect()
}
