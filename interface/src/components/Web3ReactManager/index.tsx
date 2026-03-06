import { useEffect, useContext } from 'react'
import { web3authConnector } from '../../connectors'
import Web3AuthContext from '../../pages/Web3AuthContext'

export default function Web3AuthManager({ children }: { children: JSX.Element }) {

  const web3AuthContext = useContext(Web3AuthContext)

  useEffect(() => {
    (async () => {  
      web3authConnector.connect().then((connectorState)=>{
        if(connectorState && connectorState.account){
          web3AuthContext.setAccount(connectorState.account);
          web3AuthContext.setChainId(connectorState.chainId);
          web3AuthContext.setProvider(connectorState.web3Provider);
          console.log(`web3auth reconnected to ${connectorState.account} on chain ${connectorState.chainId}`);
        }
        else
          console.log("web3auth not connected...");
      })
    })();

    return () => {
      const { ethereum } = window
      if (ethereum && ethereum.removeListener) {
        ethereum.removeListener('chainChanged', ()=> {console.log("unload")})
        ethereum.removeListener('accountsChanged', ()=> {window.location.reload()})
      }
    };
  }, []);

  return children
}
