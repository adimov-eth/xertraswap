import { ChainId } from '@xertra/sdk'
import MULTICALL_ABI from './abi.json'
import { NETWORK_CONTRACTS, CHAIN_IDS } from '../../config/chains'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: NETWORK_CONTRACTS[CHAIN_IDS.MAINNET].MULTICALL,
  [ChainId.TESTNET]: NETWORK_CONTRACTS[CHAIN_IDS.TESTNET].MULTICALL,
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
