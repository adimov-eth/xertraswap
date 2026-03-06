import React, { useState, useEffect, useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { network, web3authConnector } from '../../connectors'
import { useEagerConnect, useInactiveListener } from '../../hooks'
import { NetworkContextName } from '../../constants'
import Loader from '../Loader'
import { ConnectorNames } from '../../uikit'
import Web3AuthContext from '../../pages/Web3AuthContext'

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
`

const Message = styled.h2`
  color: ${({ theme }) => theme.colors.primaryDark};
`

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
      // called when the component unmounts
    };
  }, []);

  // // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  // useEffect(() => {
  //   if (triedEager && !networkActive && !networkError && !active) {
  //     activateNetwork(network)
  //   }
  // }, [triedEager, networkActive, networkError, activateNetwork, active])

  // // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  // useInactiveListener(!triedEager)

  // // handle delayed loader state
  // const [showLoader, setShowLoader] = useState(false)
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowLoader(true)
  //   }, 600)

  //   return () => {
  //     clearTimeout(timeout)
  //   }
  // }, [])

  // // on page load, do nothing until we've tried to connect to the injected connector
  // if (!triedEager) {
  //   return null
  // }

  // // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  // if (!active && networkError) {
  //   return (
  //     <MessageWrapper>
  //       <Message>{t('unknownError')}</Message>
  //     </MessageWrapper>
  //   )
  // }

  // // if neither context is active, spin
  // if (!active && !networkActive) {
  //   return showLoader ? (
  //     <MessageWrapper>
  //       <Loader />
  //     </MessageWrapper>
  //   ) : null
  // }

  return children
}
