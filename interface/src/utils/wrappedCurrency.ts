import { Currency, CurrencyAmount, ETHER, Token, TokenAmount, WETH } from '@xertra/sdk'
import { isSupportedChainId } from '../config/chains'

export function wrappedCurrency(currency: Currency | undefined, chainId: number | undefined): Token | undefined {
  if (currency === ETHER) {
    return chainId && isSupportedChainId(chainId) ? WETH[chainId] : undefined
  }

  return currency instanceof Token ? currency : undefined
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: number | undefined
): TokenAmount | undefined {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
}

export function unwrappedToken(token: Token): Currency {
  if (isSupportedChainId(token.chainId) && token.equals(WETH[token.chainId])) return ETHER
  return token
}
