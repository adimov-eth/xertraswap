import { Web3AuthConnector } from './Web3AuthConnector'
import { getCurrentChainId } from '../config/chains'

export const NETWORK_CHAIN_ID: number = getCurrentChainId()

export const web3authConnector = new Web3AuthConnector(NETWORK_CHAIN_ID)
