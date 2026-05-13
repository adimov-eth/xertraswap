import { Contract } from '@ethersproject/contracts'

// Helper in case spend revoking needs to  be tested.

interface RevokeTokenApprovalParams {
  tokenContract: Contract
  spender: string
  sendContractTransaction: (params: {
    contract: Contract
    methodName: string
    args?: any[]
    value?: any
    gasEstimate: any
  }) => Promise<string>
}

/**
 * Revoke ERC20 allowance
 * Calls:
 * approve(spender, 0)
 */
export async function revokeTokenApproval({
  tokenContract,
  spender,
  sendContractTransaction,
}: RevokeTokenApprovalParams): Promise<string> {

  const gasEstimate =
    await tokenContract.estimateGas.approve(
      spender,
      0
    )

  const txHash =
    await sendContractTransaction({
      contract: tokenContract,
      methodName: 'approve',
      args: [spender, 0],
      gasEstimate,
    })

  return txHash
}