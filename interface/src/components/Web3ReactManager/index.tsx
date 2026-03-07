import React, { useEffect, useContext } from 'react'
import { web3authConnector } from '../../connectors'
import Web3AuthContext from '../../pages/Web3AuthContext'
import { getCurrentChainId } from '../../config/chains'

export default function Web3AuthManager({ children }: { children: JSX.Element }) {
  const web3AuthContext = useContext(Web3AuthContext)

  // Reconnect on mount (restores session if user was previously logged in)
  useEffect(() => {
    web3authConnector
      .connect()
      .then((connectorState) => {
        if (connectorState?.account) {
          web3AuthContext.setAccount(connectorState.account)
          web3AuthContext.setChainId(connectorState.chainId)
          web3AuthContext.setProvider(connectorState.web3Provider)
          console.info(`Web3Auth reconnected: ${connectorState.account} on chain ${connectorState.chainId}`)
        } else {
          console.info('Web3Auth: no active session')
        }
      })
      .catch((error) => {
        // Don't crash the app if reconnect fails — user can still connect manually
        console.error('Web3Auth reconnect failed:', error?.message || error)
      })
  }, [])

  // Listen for provider events (chain changed, accounts changed, disconnect)
  useEffect(() => {
    const provider = web3AuthContext.walletProvider

    if (!provider?.provider) return undefined

    const handleChainChanged = (chainIdHex: string) => {
      const newChainId = parseInt(chainIdHex, 16)
      console.info('Chain changed:', newChainId)
      web3AuthContext.setChainId(newChainId)
    }

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        console.info('Account changed:', accounts[0])
        web3AuthContext.setAccount(accounts[0])
      } else {
        // User disconnected from the provider
        console.info('Account disconnected')
        web3AuthContext.setAccount(undefined)
        web3AuthContext.setChainId(getCurrentChainId())
        web3AuthContext.setProvider(undefined)
      }
    }

    const handleDisconnect = () => {
      console.info('Provider disconnected')
      web3AuthContext.setAccount(undefined)
      web3AuthContext.setChainId(getCurrentChainId())
      web3AuthContext.setProvider(undefined)
    }

    const underlying = provider.provider as any

    if (underlying?.on) {
      underlying.on('chainChanged', handleChainChanged)
      underlying.on('accountsChanged', handleAccountsChanged)
      underlying.on('disconnect', handleDisconnect)
    }

    return () => {
      if (underlying?.removeListener) {
        underlying.removeListener('chainChanged', handleChainChanged)
        underlying.removeListener('accountsChanged', handleAccountsChanged)
        underlying.removeListener('disconnect', handleDisconnect)
      }
    }
  }, [web3AuthContext.walletProvider])

  return children
}
