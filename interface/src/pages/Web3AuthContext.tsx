import { createContext } from 'react'
import { Web3Provider, JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { getCurrentRpcUrl, getCurrentChainId, SupportedChainId } from 'config/chains'

// Read-only provider — always available, created once
const READ_ONLY_PROVIDER = new JsonRpcProvider(getCurrentRpcUrl(), getCurrentChainId())

// --- Connection state: discriminated union ---

export type ConnectionState =
  | {
      kind: 'disconnected'
      provider: JsonRpcProvider
      chainId: SupportedChainId
    }
  | {
      kind: 'connected'
      provider: Web3Provider
      signer: JsonRpcSigner
      account: string
      chainId: SupportedChainId
    }

const INITIAL_STATE: ConnectionState = {
  kind: 'disconnected',
  provider: READ_ONLY_PROVIDER,
  chainId: getCurrentChainId(),
}

// --- Context ---

export interface Web3AuthContextState {
  connection: ConnectionState
  connect: (provider: Web3Provider, account: string, chainId: SupportedChainId) => void
  disconnect: () => void
  switchChain: (chainId: SupportedChainId) => void

  // Convenience accessors — derived from connection, no independent state
  account: string | undefined
  chainId: SupportedChainId
  library: Web3Provider | JsonRpcProvider
}

const defaultState: Web3AuthContextState = {
  connection: INITIAL_STATE,
  connect: () => undefined,
  disconnect: () => undefined,
  switchChain: () => undefined,
  account: undefined,
  chainId: getCurrentChainId(),
  library: READ_ONLY_PROVIDER,
}

export const Web3AuthContext = createContext<Web3AuthContextState>(defaultState)
export default Web3AuthContext

export { READ_ONLY_PROVIDER, INITIAL_STATE }
