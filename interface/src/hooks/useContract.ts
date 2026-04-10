import { Contract } from '@ethersproject/contracts'
import { ChainId, WETH } from '@xertra/sdk'
import v2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useContext, useMemo } from 'react'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import WETH_ABI from '../constants/abis/weth.json'
import { MULTICALL_ABI } from '../constants/multicall'
import { getMulticallAddress, isSupportedChainId } from '../config/chains'
import { getContract } from '../utils'
import Web3AuthContext from '../pages/Web3AuthContext'

const IUniswapV2PairABI = v2Pair.abi

function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { connection } = useContext(Web3AuthContext)

  return useMemo(() => {
    if (!address || !ABI) return null
    try {
      if (withSignerIfPossible && connection.kind === 'connected') {
        return getContract(address, ABI, connection.provider, connection.account)
      }
      return getContract(address, ABI, connection.provider)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, connection, withSignerIfPossible])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useContext(Web3AuthContext)
  const wethAddress = chainId && isSupportedChainId(chainId) ? WETH[chainId].address : undefined
  return useContract(wethAddress, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useContext(Web3AuthContext)
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.TESTNET:
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useContext(Web3AuthContext)
  return useContract(getMulticallAddress(chainId), MULTICALL_ABI, false)
}
