import React from 'react'
import { useModal } from '../Modal'
import AccountModal from './AccountModal'
import { Login } from './types'

interface ReturnType {
  onPresentAccountModal: () => void
}

const useWalletModal = (login: Login, logout: () => void, account?: string): ReturnType => {
  const [onPresentAccountModal] = useModal(<AccountModal account={account || ''} logout={logout} />)
  return { onPresentAccountModal }
}

export default useWalletModal
