import { useCallback, useContext } from 'react'
import useToast from 'hooks/useToast'
import { web3authConnector } from 'connectors'
import { SupportedChainId } from 'config/chains'
import Web3AuthContext from '../pages/Web3AuthContext'

const useWeb3Auth = () => {
  const { toastError } = useToast()
  const { connect, disconnect } = useContext(Web3AuthContext)

  const login = useCallback(async () => {
    try {
      const connectorState = await web3authConnector.connect()
      if (connectorState?.account) {
        connect(connectorState.web3Provider, connectorState.account, connectorState.chainId as SupportedChainId)
      }
    } catch (error: any) {
      if (error?.code === 4001 || error?.message?.includes('User closed')) {
        console.info('Login cancelled by user')
      } else {
        console.error('Login failed:', error?.message || error)
        toastError('Connection Failed', error?.message || 'Failed to connect wallet')
      }
    }
  }, [toastError, connect])

  const logout = useCallback(async () => {
    try {
      await web3authConnector.logout()
    } catch (error: any) {
      console.error('Logout failed:', error?.message || error)
    } finally {
      disconnect()
    }
  }, [disconnect])

  return { login, logout }
}

export default useWeb3Auth
