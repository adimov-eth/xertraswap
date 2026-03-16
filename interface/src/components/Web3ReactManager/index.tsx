import { useEffect, useContext, type ReactElement } from 'react'
import { web3authConnector } from '../../connectors'
import Web3AuthContext from '../../pages/Web3AuthContext'

export default function Web3AuthManager({ children }: { children: ReactElement }) {
  const { connection, connect, disconnect, switchChain } = useContext(Web3AuthContext)

  // Silently restore existing session on mount — never opens the modal
  useEffect(() => {
    web3authConnector
      .reconnect()
      .then((connectorState) => {
        if (connectorState?.account) {
          connect(connectorState.web3Provider, connectorState.account, connectorState.chainId)
          console.info(`Web3Auth restored session: ${connectorState.account}`)
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

    const candidates = [
      connection.provider.provider,
      (connection.provider.provider as any)?.provider,
      (connection.provider.provider as any)?.eventProvider,
    ].filter(Boolean) as any[]

    const emitters = candidates.filter((candidate, index) => {
      return typeof candidate?.on === 'function' && candidates.indexOf(candidate) === index
    })

    if (emitters.length === 0) {
      console.warn('[wallet] no event-capable provider found for chain/account listeners')
      return undefined
    }

    console.info(
      '[wallet] attaching listeners to chain/account events:',
      emitters
        .map((emitter, index) => {
          if (emitter === connection.provider.provider) return 'connection.provider.provider'
          if (emitter === (connection.provider.provider as any)?.provider) return 'connection.provider.provider.provider'
          if (emitter === (connection.provider.provider as any)?.eventProvider) return 'connection.provider.provider.eventProvider'
          return `emitter-${index}`
        })
        .join(', ')
    )

    const parseChainId = (value: string | number) => {
      if (typeof value === 'string') {
        return value.startsWith('0x') ? parseInt(value, 16) : parseInt(value, 10)
      }
      return value
    }

    const handleChainChanged = (chainIdValue: string | number) => {
      const newChainId = parseChainId(chainIdValue)
      console.info('[wallet] chain changed:', chainIdValue, '=>', newChainId)
      if (Number.isFinite(newChainId)) {
        switchChain(newChainId)
      }
    }

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        console.info('[wallet] account changed:', accounts[0])
        connect(connection.provider, accounts[0], connection.chainId)
      } else {
        console.info('[wallet] account disconnected')
        disconnect()
      }
    }

    const handleDisconnect = () => {
      console.info('[wallet] provider disconnected')
      disconnect()
    }

    emitters.forEach((emitter) => {
      emitter.on('chainChanged', handleChainChanged)
      emitter.on('accountsChanged', handleAccountsChanged)
      emitter.on('disconnect', handleDisconnect)
    })

    return () => {
      emitters.forEach((emitter) => {
        if (typeof emitter.removeListener === 'function') {
          emitter.removeListener('chainChanged', handleChainChanged)
          emitter.removeListener('accountsChanged', handleAccountsChanged)
          emitter.removeListener('disconnect', handleDisconnect)
        }
      })
    }
  }, [connection, connect, disconnect, switchChain])

  return children
}
