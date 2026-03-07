import { useCallback, useContext } from 'react'
import useToast from 'hooks/useToast'
import { web3authConnector } from 'connectors'
import { getCurrentChainId } from 'config/chains'
import Web3AuthContext from '../pages/Web3AuthContext'

const useWeb3Auth = () => {
  const { toastError } = useToast()
  const web3AuthContext = useContext(Web3AuthContext)

  const login = useCallback(async () => {
    try {
      const connectorState = await web3authConnector.connect()
      if (connectorState?.account) {
        web3AuthContext.setAccount(connectorState.account)
        web3AuthContext.setChainId(connectorState.chainId)
        web3AuthContext.setProvider(connectorState.web3Provider)
      }
    } catch (error: any) {
      // User rejected or wallet not available — don't crash
      if (error?.code === 4001 || error?.message?.includes('User closed')) {
        console.info('Login cancelled by user')
      } else {
        console.error('Login failed:', error?.message || error)
        toastError('Connection Failed', error?.message || 'Failed to connect wallet')
      }
    }
  }, [toastError])

  const logout = useCallback(async () => {
    try {
      await web3authConnector.logout()
    } catch (error: any) {
      console.error('Logout failed:', error?.message || error)
    } finally {
      // Always clear state, even if logout throws
      web3AuthContext.setAccount(undefined)
      web3AuthContext.setChainId(getCurrentChainId())
      web3AuthContext.setProvider(undefined)
      localStorage.clear()
    }
  }, [])

  return { login, logout }
}

export default useWeb3Auth
