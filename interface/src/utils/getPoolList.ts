import { Version, Tags } from '@uniswap/token-lists'

import defaultPoolJson from '../constants/pool/pancakeswap.json'

export interface PoolInfo {
  readonly pid: number
  readonly chainId: number
  readonly lpSymbol: string
  readonly lpAddress: string
  readonly token: string
  readonly quoteToken: string
}

export interface PoolList {
  readonly name: string;
  readonly timestamp: string;
  readonly version: Version;
  readonly pools: PoolInfo[];
  readonly keywords?: string[];
  readonly tags?: Tags;
  readonly logoURI?: string;
}

export function getPoolList(): PoolList {
  return defaultPoolJson
}