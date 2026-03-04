import { TextEncoder, TextDecoder } from 'util'

const needsTextEncoderPolyfill = (() => {
  if (typeof global.TextEncoder === 'undefined') {
    return true
  }

  try {
    return !(new global.TextEncoder().encode('test') instanceof Uint8Array)
  } catch {
    return true
  }
})()

if (needsTextEncoderPolyfill) {
  global.TextEncoder = TextEncoder
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder
}

if (typeof window !== 'undefined') {
  window.TextEncoder = global.TextEncoder
  window.TextDecoder = global.TextDecoder
}

jest.mock('@web3auth/default-evm-adapter', () => ({
  getDefaultExternalAdapters: () => [],
}))

jest.mock('@web3auth/base', () => ({
  CHAIN_NAMESPACES: { EIP155: 'eip155' },
  WEB3AUTH_NETWORK: {
    SAPPHIRE_MAINNET: 'sapphire_mainnet',
    SAPPHIRE_DEVNET: 'sapphire_devnet',
  },
}))

jest.mock('@web3auth/ethereum-provider', () => ({
  EthereumPrivateKeyProvider: class MockEthereumPrivateKeyProvider {},
}))

jest.mock('@web3auth/modal', () => ({
  Web3Auth: class MockWeb3Auth {
    constructor() {
      this.options = {}
      this.connected = false
      this.provider = null
      this.configureAdapter = jest.fn()
      this.initModal = jest.fn().mockResolvedValue(undefined)
      this.connect = jest.fn().mockResolvedValue(null)
      this.logout = jest.fn().mockResolvedValue(undefined)
    }
  },
}))
