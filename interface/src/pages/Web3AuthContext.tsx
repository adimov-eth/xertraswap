import React, { createContext } from 'react'
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers'
import { getCurrentRpcUrl, getCurrentChainId } from 'config/chains'

// Read-only provider — always available, created once
const DEFAULT_CHAIN_ID = getCurrentChainId()
const READ_ONLY_PROVIDER = new JsonRpcProvider(getCurrentRpcUrl(), DEFAULT_CHAIN_ID)

interface Web3AuthContextState {
  account: string | undefined
  setAccount: React.Dispatch<React.SetStateAction<string | undefined>>

  chainId: number
  setChainId: React.Dispatch<React.SetStateAction<number>>

  // Always available — read-only JsonRpcProvider when no wallet, Web3Provider when connected
  library: Web3Provider | JsonRpcProvider
  setProvider: React.Dispatch<React.SetStateAction<Web3Provider | undefined>>

  // Only available when wallet is connected
  walletProvider: Web3Provider | undefined
}

const defaultWeb3AuthContextState: Web3AuthContextState = {
  account: undefined,
  setAccount: (): void => undefined,
  chainId: DEFAULT_CHAIN_ID,
  setChainId: (): void => undefined,
  library: READ_ONLY_PROVIDER,
  setProvider: (): void => undefined,
  walletProvider: undefined,
}

export const Web3AuthContext = createContext(defaultWeb3AuthContextState)
export default Web3AuthContext
