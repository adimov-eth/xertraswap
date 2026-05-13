import { useCallback, useContext } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'

import Web3AuthContext from '../pages/Web3AuthContext'
import { calculateGasMargin } from '../utils'
import isZero from '../utils/isZero'

interface SendContractTransactionParams {
  contract: Contract
  methodName: string
  args?: any[]
  value?: any
  gasEstimate: BigNumber
}

export default function useRawTransactionSender() {
  const { connection } = useContext(Web3AuthContext)

  const sendContractTransaction = useCallback(
    async ({
      contract,
      methodName,
      args = [],
      value,
      gasEstimate,
    }: SendContractTransactionParams): Promise<string> => {

      const signer = contract.signer
      const signerAddress = await signer.getAddress()

      const populated =
        await contract.populateTransaction[methodName](
          ...args,
          value && !isZero(value)
            ? { value }
            : {}
        )

      const txToSend: any = {
        from: signerAddress,
        to: String(populated.to),
        data: String(populated.data),
        gas: calculateGasMargin(gasEstimate).toHexString(),
      }

      if (value && !isZero(value)) {
        const valueString = String(value)

        txToSend.value =
          valueString.startsWith('0x')
            ? valueString
            : `0x${BigInt(valueString).toString(16)}`
      }

      const rawProvider =
        (connection.provider as any).provider?.provider ||
        (connection.provider as any).provider

      const txHash = await rawProvider.request({
        method: 'eth_sendTransaction',
        params: [txToSend],
      })

      return txHash
    },
    [connection]
  )

  return {
    sendContractTransaction,
  }
}