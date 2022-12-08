import { useContext } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { typesBundle } from '@kiltprotocol/type-definitions'

import { StateContext } from './StateContext'

let cachedApi: Promise<ApiPromise> | null = null
let wsProvider: WsProvider | null = null

const ENDPOINT =
  // allows comma separated list of endpoints
  process.env.REACT_APP_FULL_NODE_ENDPOINT?.split(',').map((i) => i.trim()) ||
  'wss://peregrine.kilt.io/parachain-public-ws'

if (ENDPOINT instanceof Array && process.env.REACT_APP_SHUFFLE_ENDPOINTS === 'true') {
  // shuffle endpoint priority
  for (let i = ENDPOINT.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ENDPOINT[i], ENDPOINT[j]] = [ENDPOINT[j], ENDPOINT[i]]
  }
}

export const useConnect = () => {
  const { dispatch } = useContext(StateContext)

  if (!cachedApi) {
    wsProvider = new WsProvider(ENDPOINT)
    cachedApi = ApiPromise.create({
      provider: wsProvider,
      typesBundle,
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
