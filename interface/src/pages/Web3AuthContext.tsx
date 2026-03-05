import React, { createContext } from 'react'
import { Web3Provider } from '@ethersproject/providers'

interface Web3AuthContextState {
  account: string | undefined
  setAccount: React.Dispatch<React.SetStateAction<string | undefined>>

  chainId: number | undefined
  setChainId: React.Dispatch<React.SetStateAction<number | undefined>>  

  library: Web3Provider | undefined
  setProvider: React.Dispatch<React.SetStateAction<Web3Provider | undefined>>  
}

const defaultWeb3AuthContextState : Web3AuthContextState ={
  account  : undefined,
  setAccount: (): void => undefined,
  chainId  : undefined,
  setChainId: (): void => undefined,
  library  : undefined,
  setProvider: (): void => undefined,
}

export const Web3AuthContext = createContext(defaultWeb3AuthContextState);
export default Web3AuthContext