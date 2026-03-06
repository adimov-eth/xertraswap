import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '@xertra/sdk'
// eslint-disable-next-line import/no-unresolved
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useContext } from 'react'
import Web3AuthContext from '../pages/Web3AuthContext'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: ChainId } {
  const { account, chainId, library } = useContext(Web3AuthContext)
  return {
    account: account ?? null,
    chainId: chainId as ChainId | undefined,
    library,
    active: !!account,
    activate: async () => { /* noop */ },
    deactivate: () => { /* noop */ },
    setError: () => { /* noop */ },
    error: undefined,
    connector: undefined,
  } as unknown as Web3ReactContextInterface<Web3Provider> & { chainId?: ChainId }
}