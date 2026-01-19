import { useMemo } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Token, TokenAmount } from '@xertra/sdk'
import ERC20_INTERFACE from 'constants/abis/erc20'
import { useTokenContract } from '../hooks/useContract'
import { useSingleCallResult, useMultipleContractSingleData } from '../state/multicall/hooks'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalSupply(token?: Token): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const totalSupply: BigNumber = useSingleCallResult(contract, 'totalSupply')?.result?.[0]

  return token && totalSupply ? new TokenAmount(token, totalSupply.toString()) : undefined
}

export default useTotalSupply

export function useTotalSupplies(tokens: (Token | undefined)[]): (TokenAmount | undefined)[] {
  const addresses = tokens.map(t => t?.address)

  const results = useMultipleContractSingleData(addresses, ERC20_INTERFACE, 'totalSupply')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: totalSupply, loading } = result
      const token = tokens[i]

      if (loading || !token || !totalSupply) return undefined

      return new TokenAmount(token, totalSupply.toString())
    })
  }, [results, tokens])
}
