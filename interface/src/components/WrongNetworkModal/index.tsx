import { useContext, useState } from 'react'
import { AlertTriangle } from 'react-feather'
import { Button, Text, Heading } from 'uikit'
import Modal from '../Modal'
import useWeb3Auth from '../../hooks/useWeb3Auth'
import { getCurrentChainId } from '../../config/chains'
import Web3AuthContext from '../../pages/Web3AuthContext'

interface WrongNetworkModalProps {
  isOpen: boolean
  onDismiss: () => void
}

export default function WrongNetworkModal({ isOpen, onDismiss }: WrongNetworkModalProps) {
  const { chainId, expectedChainId } = useContext(Web3AuthContext)
  const { logout, switchToExpectedChain } = useWeb3Auth()
  const [isSwitching, setIsSwitching] = useState(false)
  const targetChainId = expectedChainId ?? getCurrentChainId()

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={70}>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <AlertTriangle size={22} />
          <Heading as="h2">
            Wrong network
          </Heading>
        </div>

        <Text color="textSubtle" mb="20px">
          Connected to chain {chainId}. Switch to chain {targetChainId} to continue using Xertra Swap.
        </Text>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button
            isLoading={isSwitching}
            onClick={() => {
              setIsSwitching(true)
              switchToExpectedChain(targetChainId).finally(() => setIsSwitching(false))
            }}
          >
            Switch network
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              logout().finally(onDismiss)
            }}
          >
            Disconnect
          </Button>
        </div>
      </div>
    </Modal>
  )
}
