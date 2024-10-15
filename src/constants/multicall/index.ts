import { ChainId } from '@pancakeswap-libs/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x23D1682b48124F9cBDF8A3a4e937759F9BB86c61',
  [ChainId.TESTNET]: '0xf297eB680328a2ca0995b8447B2cEb1b87553b7c'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
