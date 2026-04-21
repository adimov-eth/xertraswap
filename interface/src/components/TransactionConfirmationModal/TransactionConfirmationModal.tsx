import React, { useContext } from 'react'
import Modal from '../Modal'
import ConfirmationPendingContent from './ConfirmationPendingContent'
import TransactionSubmittedContent from './TransactionSubmittedContent'
import Web3AuthContext from '../../pages/Web3AuthContext'

interface ConfirmationModalProps {
  isOpen: boolean
  onDismiss: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  marginTop?: string
  alignSelf?: string
}

const TransactionConfirmationModal = ({
  isOpen,
  onDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  marginTop,
  alignSelf
}: ConfirmationModalProps) => {
  const { chainId } = useContext(Web3AuthContext)

  if (!chainId) return null

  // confirmation screen
  return (
    <Modal 
      isOpen={isOpen} 
      onDismiss={onDismiss} 
      maxHeight={90}
      marginTop={marginTop}
      alignSelf={alignSelf}>
      {attemptingTxn ? (
        <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} txHash={hash}/>
      ) : hash ? (
        <TransactionSubmittedContent chainId={chainId} hash={hash} onDismiss={onDismiss} />
      ) : (
        content()
      )}
    </Modal>
  )
}

export default TransactionConfirmationModal
