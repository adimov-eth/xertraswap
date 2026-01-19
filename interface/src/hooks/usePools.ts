import { useMemo } from 'react'
import { TokenAmount, Pair, Percent, JSBI } from '@xertra/sdk'
import { Interface } from '@ethersproject/abi'
import v2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'

import { useMultipleContractSingleData } from 'state/multicall/hooks'
import { useTokenBalances } from 'state/wallet/hooks'
import { getPoolList, PoolInfo } from 'utils/getPoolList'
import { useTotalSupplies } from 'data/TotalSupply'
import { useActiveWeb3React } from './index'
import { useAllTokens } from './Tokens'

const IUniswapV2PairABI  = new Interface(v2Pair.abi)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

interface PoolData {
  state: PairState
  info: PoolInfo
  pair: Pair | null
}

export function useAllPools(): PoolData[] {
  const { chainId } = useActiveWeb3React()

  const tokens = useAllTokens()
  const poolList = getPoolList()
  const chainPools = useMemo(() => {
    return poolList.pools.filter(({ chainId: cid }) => cid === chainId)
  }, [poolList, chainId])
  const pairAddresses = chainPools.map(p => p.lpAddress)

  const results = useMultipleContractSingleData(
    pairAddresses,
    IUniswapV2PairABI,
    'getReserves',
  )

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[chainPools[i].token]
      const tokenB = tokens[chainPools[i].quoteToken]
      const info = chainPools[i]

      if (loading) {
        return {
          state: PairState.LOADING,
          info,
          pair: null,
        }
      }
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return {
        state: PairState.INVALID,
        info,
        pair: null,
      }
      if (!reserves) return {
        state: PairState.NOT_EXISTS,
        info,
        pair: null,
      }
      const [reserve0, reserve1] = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      return {
        state: PairState.EXISTS,
        info,
        pair: new Pair(
          new TokenAmount(token0, reserve0.toString()),
          new TokenAmount(token1, reserve1.toString()),
        ),
      }
    })
  }, [results, chainPools, tokens])
}

interface UserPoolPosition {
  token0Deposited: TokenAmount | undefined
  token1Deposited: TokenAmount | undefined
  poolBalance: TokenAmount | undefined
  poolPercentage: Percent | undefined
}

export function useUserPairPosition(pairs: (Pair | null)[]): UserPoolPosition[] {
  const { account } = useActiveWeb3React()
  const lpTokens = pairs.map(p => p?.liquidityToken)
  const tokens = pairs.map(p => ([p?.liquidityToken, p?.token0, p?.token1])).flat()

  const balances = useTokenBalances(account ?? undefined, tokens)
  const totalSupplies = useTotalSupplies(lpTokens)

  return useMemo(() => {
    return pairs.map((pair, i) => {
      const totalPoolTokens = totalSupplies[i]
      const userPoolBalance = pair ? balances[pair?.liquidityToken.address] : undefined
      const poolTokenPercentage =
        !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
          ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
          : undefined

      const [token0Deposited, token1Deposited] =
        !!pair &&
        !!totalPoolTokens &&
        !!userPoolBalance &&
        // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
        JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
          ? [
              pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
              pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
            ]
          : [undefined, undefined]

      return {
        token0Deposited,
        token1Deposited,
        poolBalance: userPoolBalance,
        poolPercentage: poolTokenPercentage,
      }
    })
  }, [balances, totalSupplies, pairs])
}
