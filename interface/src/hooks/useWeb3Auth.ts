import { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey, ConnectorNames } from 'uikit'
import useToast from 'hooks/useToast'
import { connectorsByName, web3authConnector } from 'connectors'

const useWeb3Auth = () => {
  const { activate, deactivate } = useWeb3React()
  const { toastError } = useToast()
  const [account, setAccount] = useState("")

  const login = useCallback(async () => {
    const connector = connectorsByName[ConnectorNames.Web3Auth]

    window.localStorage.setItem(connectorLocalStorageKey, ConnectorNames.Web3Auth)

    const account = await web3authConnector.connect()
    setAccount(account?? "")
    console.log(account)

    // activate(connector, async (error: Error) => {
    //   window.localStorage.removeItem(connectorLocalStorageKey)
    //   if (error) {
    //     toastError(error.message)
    //   }
    // })
  }, [toastError])

  const logout = useCallback(() => {
    // Web3Auth needs its own logout before web3-react deactivate
    web3authConnector.logout()
    //deactivate()
    window.localStorage.removeItem(connectorLocalStorageKey)
  }, [])

  return { login, logout, account }
}

export default useWeb3Auth
