import { TokenAmount, Pair, Currency, Token } from '@xertra/sdk'
import { useContext, useMemo } from 'react'
import v2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { Interface } from '@ethersproject/abi'
import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { wrappedCurrency } from '../utils/wrappedCurrency'
import Web3AuthContext from '../pages/Web3AuthContext'
import { keccak256, pack } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
import { getCurrentContracts } from '../config/chains'

const IUniswapV2PairABI = v2Pair.abi
const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

function computePairAddress(tokenA: Token, tokenB : Token, factory : string, initHash: string) {
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA]

  return getCreate2Address(
    factory,
    keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]),
    initHash
  )
}

export function usePairs(currencies: [Currency | undefined, Currency | undefined][], version: 1 | 2 = 2 ): [PairState, Pair | null][] {
  const { chainId } = useContext(Web3AuthContext)

  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId),
      ]),
    [chainId, currencies]
  )

  const pairAddresses = useMemo(() => {
    const { FACTORY, INIT_HASH } = getCurrentContracts(version)
    console.log(FACTORY, INIT_HASH)

    return tokens.map(([tokenA, tokenB]) => {
      return tokenA && tokenB && !tokenA.equals(tokenB)
        ? computePairAddress(tokenA, tokenB, FACTORY, INIT_HASH)
        : undefined
    })
  }, [tokens])

  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]
      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      return [
        PairState.EXISTS,
        new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString())),
      ]
    })
  }, [results, tokens])
}

export function usePair(tokenA?: Currency, tokenB?: Currency, version: 1 | 2 = 2) {
  return usePairs([[tokenA, tokenB]], version)[0]
}