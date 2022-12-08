import { useContext } from 'react'
import { ApiPromise } from '@polkadot/api'
import { typesBundle } from '@kiltprotocol/type-definitions'

import { StateContext } from './StateContext'

import { ScProvider } from '@polkadot/rpc-provider'
import * as Sc from '@substrate/connect'

import jsonParachainSpec from './spiritnet.json'

let cachedApi: Promise<ApiPromise> | null = null
let provider: ScProvider | null = null

export const useConnect = () => {
  const { dispatch } = useContext(StateContext)

  if (!cachedApi) {
    const parachainSpec = JSON.stringify(jsonParachainSpec)

    const polkadotProvider = new ScProvider(Sc, Sc.WellKnownChain.polkadot)
    provider = new ScProvider(Sc, parachainSpec, polkadotProvider)

    provider.connect()
    cachedApi = ApiPromise.create({
      provider,
      typesBundle,
      noInitWarn: process.env.NODE_ENV === 'production',
    })

    provider.on('disconnected', () => dispatch({ type: 'disconnected' }))
    provider.on('connected', () => dispatch({ type: 'connected' }))
    provider.on('error', (error) => dispatch({ type: 'error', err: error }))
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
