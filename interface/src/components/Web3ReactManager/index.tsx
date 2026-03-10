import { useEffect, useContext, JSX } from 'react'
import { web3authConnector } from '../../connectors'
import Web3AuthContext from '../../pages/Web3AuthContext'
import { safeHandler } from 'utils'

export default function Web3AuthManager({ children }: { children: JSX.Element }) {

  const web3AuthContext = useContext(Web3AuthContext)
  const { ethereum } = window

  useEffect(() => {
    (async () => {  
      const connectorState = await web3authConnector.connect()
      if(connectorState?.account){
        web3AuthContext.setAccount(connectorState.account)
        web3AuthContext.setChainId(connectorState.chainId)
        web3AuthContext.setProvider(connectorState.web3Provider)
        console.log(`web3auth reconnected to ${connectorState.account} on chain ${connectorState.chainId}`)

        if(ethereum?.on) {
          ethereum.on("accountsChanged", safeHandler(web3authConnector.handleAccountsChanged))
          ethereum.on("chainChanged", safeHandler(web3authConnector.handleChainChanged))
        }
      }
      else
        console.log("web3auth not connected...")      
    })();

    return () => {
      if (ethereum?.removeListener) {
        ethereum.removeListener('accountsChanged', web3authConnector.handleAccountsChanged)
        ethereum.removeListener('chainChanged', web3authConnector.handleChainChanged)
      }
    };
  }, []);

  return children
}
