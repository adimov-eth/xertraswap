import { Currency, currencyEquals, ETHER, WETH } from '@xertra/sdk'
import { useContext, useMemo, useState } from 'react'
import { isSupportedChainId } from '../config/chains'
import { tryParseAmount } from '../state/swap/hooks'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCurrencyBalance } from '../state/wallet/hooks'
import { useWETHContract } from './useContract'
import Web3AuthContext from '../pages/Web3AuthContext'

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP
}

/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  typedValue: string | undefined
): {isBusy: boolean; wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string; } {

  const { account, chainId } = useContext(Web3AuthContext)
  
  const wethContract = useWETHContract()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  const [isBusy, setIsBusy] = useState(false)

  return useMemo(() => {
    if (!wethContract || !chainId || !isSupportedChainId(chainId) || !inputCurrency || !outputCurrency) {
      return { isBusy, wrapType: WrapType.NOT_APPLICABLE }
    }

    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount)

    if (inputCurrency === ETHER && currencyEquals(WETH[chainId], outputCurrency)) {
      return { 
        isBusy,
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  setIsBusy(true)
                  const txReceipt = await wethContract.deposit({ value: `0x${inputAmount.raw.toString(16)}` })
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} STRAX to WSTRAX` })
                  await txReceipt.wait()
                } catch (error) {
                  console.error('Could not deposit', error)
                } finally {
                  setIsBusy(false)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient STRAX balance',   
      }
    }
    
    if (currencyEquals(WETH[chainId], inputCurrency) && outputCurrency === ETHER) {
      return {
        isBusy,
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  setIsBusy(true)
                  const txReceipt = await wethContract.withdraw(`0x${inputAmount.raw.toString(16)}`)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} WSTRAX to STRAX` })
                  await txReceipt.wait()
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
                finally{
                  setIsBusy(false)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient WSTRAX balance'
      }
    }
    
    return {isBusy, wrapType: WrapType.NOT_APPLICABLE}
    
  }, [wethContract, chainId, inputCurrency, outputCurrency, inputAmount, balance, addTransaction])
}
