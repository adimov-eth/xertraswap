import JSBI from 'jsbi'

export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 105105,
  TESTNET = 205205
}

export enum TradeType {
  EXACT_INPUT = 0,
  EXACT_OUTPUT = 1
}

export enum Rounding {
  ROUND_DOWN = 0,
  ROUND_HALF_UP = 1,
  ROUND_UP = 2
}

export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x2c85eF97339256cA0d17353Ad89C33Ec224C2DDb',
  [ChainId.TESTNET]: '0xfbC6220786AE5B4c86C3F49c3bD013939186C1f2'
}

export const INIT_CODE_HASH: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xd6ccaf200833bda77e2d626223654ea8c06cbf107639b883303f80a82331e017',
  [ChainId.TESTNET]: '0x6f59e2a4a56c0b6962ace9a1191d2cd9ff32be0669b90d36c663eadae954314b'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _998 = JSBI.BigInt(998)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA: { [key in SolidityType]: JSBI } = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt(
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
  )
}
