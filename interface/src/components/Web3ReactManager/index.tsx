import { useEffect, useContext } from 'react'
import { web3authConnector } from '../../connectors'
import Web3AuthContext from '../../pages/Web3AuthContext'
import { SupportedChainId } from '../../config/chains'

export default function Web3AuthManager({ children }: { children: JSX.Element }) {
  const { connection, connect, disconnect, switchChain } = useContext(Web3AuthContext)

  // Reconnect on mount (restores session if user was previously logged in)
  useEffect(() => {
    web3authConnector
      .connect()
      .then((connectorState) => {
        if (connectorState?.account) {
          connect(connectorState.web3Provider, connectorState.account, connectorState.chainId as SupportedChainId)
          console.info(`Web3Auth reconnected: ${connectorState.account} on chain ${connectorState.chainId}`)
        } else {
          console.info('Web3Auth: no active session')
        }
      })
      .catch((error) => {
        console.error('Web3Auth reconnect failed:', error?.message || error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Listen for provider events (chain changed, accounts changed, disconnect)
  useEffect(() => {
    if (connection.kind !== 'connected') return undefined

    const underlying = connection.provider.provider as any
    if (!underlying?.on) return undefined

    const handleChainChanged = (chainIdHex: string) => {
      const newChainId = parseInt(chainIdHex, 16) as SupportedChainId
      console.info('Chain changed:', newChainId)
      switchChain(newChainId)
    }

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        console.info('Account changed:', accounts[0])
        connect(connection.provider, accounts[0], connection.chainId)
      } else {
        console.info('Account disconnected')
        disconnect()
      }
    }

    const handleDisconnect = () => {
      console.info('Provider disconnected')
      disconnect()
    }

    underlying.on('chainChanged', handleChainChanged)
    underlying.on('accountsChanged', handleAccountsChanged)
    underlying.on('disconnect', handleDisconnect)

    return () => {
      if (underlying.removeListener) {
        underlying.removeListener('chainChanged', handleChainChanged)
        underlying.removeListener('accountsChanged', handleAccountsChanged)
        underlying.removeListener('disconnect', handleDisconnect)
      }
    }
  }, [connection, connect, disconnect, switchChain])

  return children
}
