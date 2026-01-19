import { Currency, ETHER, Token } from '@xertra/sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'STRAX'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
