import { useCallback, useContext } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from 'uikit'
import useToast from 'hooks/useToast'
import { web3authConnector } from 'connectors'
import Web3AuthContext from '../pages/Web3AuthContext'

const useWeb3Auth = () => {
  const { toastError } = useToast()

  const web3AuthContext = useContext(Web3AuthContext)

  const login = useCallback(async () => {
    window.localStorage.setItem(connectorLocalStorageKey, ConnectorNames.Web3Auth)

    const connectorState = await web3authConnector.connect()
    if(connectorState){
      web3AuthContext.setAccount(connectorState.account ?? "")
      web3AuthContext.setChainId(connectorState.chainId)
      web3AuthContext.setProvider(connectorState.web3Provider)
    }    
  }, [toastError])

  const logout = useCallback(async () => {
    await web3authConnector.logout()
    window.localStorage.removeItem(connectorLocalStorageKey)
  }, [])

  return { login, logout }
}

export default useWeb3Auth