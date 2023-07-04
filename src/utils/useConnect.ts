import { useContext } from 'react'
import { ApiPromise } from '@polkadot/api'
import { typesBundle } from '@kiltprotocol/type-definitions'

import { StateContext } from './StateContext'

import { ScProvider } from '@polkadot/rpc-provider'
import * as Sc from '@substrate/connect'

let cachedApi: Promise<ApiPromise> | null = null
let provider: ScProvider | null = null

async function createLightClientApi(
  onProvider: (p: ScProvider) => void
): Promise<ApiPromise> {
  // read parachain chain spec
  const jsonParachainSpec = (
    await import(
      '../specs/' + (process.env.REACT_APP_CHAIN_SPEC ?? 'spiritnet.json')
    )
  ).default
  // Kilt networks use a u64 for the block number, which must communicated to smoldot using a custom addition to the chain spec
  if (!(jsonParachainSpec as any).blockNumberBytes) {
    ;(jsonParachainSpec as any).blockNumberBytes = 8
  }
  const parachainSpec = JSON.stringify(jsonParachainSpec)
  // Create the provider for the relay chain
  const polkadotProvider = new ScProvider(Sc, Sc.WellKnownChain.polkadot)
  // Create the provider for the parachain. Notice that
  // we must pass the provider of the relay chain as the
  // second argument
  provider = new ScProvider(Sc, parachainSpec, polkadotProvider)
  // call onProvider
  onProvider(provider)
  // establish the connection (and catch possible errors)
  await provider.connect()
  // Create the PolkadotJS api instance
  return ApiPromise.create({
    provider,
    typesBundle,
    noInitWarn: process.env.NODE_ENV === 'production',
  })
}

export const useConnect = () => {
  const { dispatch } = useContext(StateContext)

  if (!cachedApi) {
    cachedApi = createLightClientApi((provider) => {
      provider.on('disconnected', () => dispatch({ type: 'disconnected' }))
      provider.on('connected', () => dispatch({ type: 'connected' }))
      provider.on('error', (error) => dispatch({ type: 'error', err: error }))
    })
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
