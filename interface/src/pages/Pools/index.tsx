import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TokenAmount } from '@xertra/sdk'
import { Card, Button, Text } from '@xertra/uikit'

import { useAllPools, useUserPairPosition, PairState } from 'hooks/usePools'
import useI18n from 'hooks/useI18n'

import { Wrapper } from 'components/swap/styleds'
import { AutoColumn } from 'components/Column'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { useCurrency } from 'hooks/Tokens'

// Bridge info lookup by token address
const BRIDGE_INFO: Record<string, string> = {
  // Wormhole tokens
  '0xc398Cc4828E7ce677B357c8f94B6792Cb5538c03': 'Wormhole', // WETH
  '0xE6d9419BFE31992a3aA4763B1e86Faf384c91697': 'Wormhole', // WBNB
  '0x959A50Db9B9c78990698cA621d7a0bA7F1d6f2D6': 'Wormhole (Ethereum)', // USDC from ETH
  '0xaa0e34A393dadAAF661132deA1EDD834c5628e16': 'Wormhole (BSC)', // USDC from BSC
  // ChainPort tokens
  '0xe46f25Af64467c21a01c20Ae0edf94E2Ed934c5C': 'ChainPort', // USDT
  '0xDD0C4bb4b46A1C10D36593E4FA5F76abdB583f7A': 'ChainPort', // USDC
  '0xeF11f04217d7a78641f6a300a0dE83791961b3b6': 'ChainPort', // WETH
}

// Get bridge info by address with fallback to name detection
function getBridgeInfo(address: string, tokenName?: string): string | null {
  // First check explicit mapping
  if (BRIDGE_INFO[address]) {
    return BRIDGE_INFO[address]
  }
  // Fallback to name detection
  if (tokenName?.toLowerCase().includes('wormhole')) {
    if (tokenName.toLowerCase().includes('ethereum')) return 'Wormhole (Ethereum)'
    if (tokenName.toLowerCase().includes('bsc')) return 'Wormhole (BSC)'
    return 'Wormhole'
  }
  return null
}

const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 1100px;
  width: 100%;
  z-index: 5;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px
`

const Th = styled.th`
  padding: 12px 8px;
  text-align: left;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:first-child {
    padding-left: 16px;
  }

  &:last-child {
    padding-right: 16px;
  }
`

const Td = styled.td`
  padding: 16px 8px;
  vertical-align: middle;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  &:first-child {
    padding-left: 16px;
  }

  &:last-child {
    padding-right: 16px;
  }

  tr:last-child & {
    border-bottom: none;
  }
`

const ThHideLg = styled(Th)`
  @media (max-width: 992px) {
    display: none;
  }
`

const ThHideMd = styled(Th)`
  @media (max-width: 768px) {
    display: none;
  }
`

const TdHideLg = styled(Td)`
  @media (max-width: 992px) {
    display: none;
  }
`

const TdHideMd = styled(Td)`
  @media (max-width: 768px) {
    display: none;
  }
`

const SectionTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  margin-top: 32px;
  margin-bottom: 8px;
  padding-left: 16px;
  color: ${({ theme }) => theme.colors.text};
`

const SuggestedPoolCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  transition: background-color 150ms ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
  }
`

const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const TokenSymbols = styled.div`
  display: flex;
  flex-direction: column;
`

// Tokens that need pools - bridge info retrieved from BRIDGE_INFO lookup
const SUGGESTED_POOLS = [
  { symbol: 'WETH', address: '0xc398Cc4828E7ce677B357c8f94B6792Cb5538c03' },
  { symbol: 'WBNB', address: '0xE6d9419BFE31992a3aA4763B1e86Faf384c91697' },
  { symbol: 'USDC', address: '0x959A50Db9B9c78990698cA621d7a0bA7F1d6f2D6' },
  { symbol: 'USDC', address: '0xaa0e34A393dadAAF661132deA1EDD834c5628e16' },
  { symbol: 'tSPX', address: '0x1996C0E53dE02dE88401f40C4024f2e3f14D7cF4' },
]

function SuggestedPoolRow({ tokenAddress, symbol }: { tokenAddress: string; symbol: string }) {
  const currency = useCurrency(tokenAddress)
  const straxCurrency = useCurrency('STRAX')
  const TranslateString = useI18n()
  const bridgeInfo = getBridgeInfo(tokenAddress, currency?.name ?? undefined)

  return (
    <SuggestedPoolCard>
      <TokenInfo>
        <DoubleCurrencyLogo currency0={straxCurrency ?? undefined} currency1={currency ?? undefined} size={25} margin />
        <TokenSymbols>
          <Text bold>STRAX-{symbol}</Text>
          {bridgeInfo && <Text fontSize="12px" color="textSubtle">{bridgeInfo}</Text>}
        </TokenSymbols>
      </TokenInfo>
      <Button
        scale="sm"
        as={Link}
        to={`/add/STRAX/${tokenAddress}`}
      >
        {TranslateString(168, 'Create Pool')}
      </Button>
    </SuggestedPoolCard>
  )
}

export default function Pools() {
  const pools = useAllPools()
  const userPoolData = useUserPairPosition(pools.map(p => p.pair))
  const TranslateString = useI18n()

  return (
    <BodyWrapper>
      <Wrapper id="pools-page">
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <Th>Pair</Th>
              <Th>Reserves</Th>
              <ThHideMd>Price</ThHideMd>
              <ThHideLg>User position</ThHideLg>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {pools.map((pool, i) => (
              <tr key={pool.info.pid}>
                {pool.state !== PairState.EXISTS || !pool.pair ? (
                  <Td colSpan={5} style={{ textAlign: 'center' }}>
                    Loading
                  </Td>
                ) : (
                  <>
                    <Td>
                      <AutoColumn gap="sm">
                        <DoubleCurrencyLogo currency0={pool.pair.token0} currency1={pool.pair.token1} size={25} margin />
                        <Link to={`/pool/${pool.pair.token0.address}/${pool.pair.token1.address}`} style={{ textDecoration: 'none', fontWeight: 500 }}>
                          {pool.info.lpSymbol}
                        </Link>
                        {(getBridgeInfo(pool.pair.token0.address, pool.pair.token0.name ?? '') || getBridgeInfo(pool.pair.token1.address, pool.pair.token1.name ?? '')) && (
                          <Text fontSize="11px" color="textSubtle">
                            {getBridgeInfo(pool.pair.token0.address, pool.pair.token0.name ?? '') || getBridgeInfo(pool.pair.token1.address, pool.pair.token1.name ?? '')}
                          </Text>
                        )}
                      </AutoColumn>
                    </Td>
                    <Td>
                      <Grid style={{ justifyItems: 'flex-end'}}>
                        <div>
                          {pool.pair.reserve0.toSignificant(6)}
                        </div>
                        <div>
                          {pool.pair.token0.symbol}
                        </div>
                        <div>
                          {pool.pair.reserve1.toSignificant(6)}
                        </div>
                        <div>
                          {pool.pair.token1.symbol}
                        </div>
                      </Grid>
                    </Td>
                    <TdHideMd>
                      <Grid style={{ justifyItems: 'flex-end'}}>
                        <div>
                          {pool.pair.token0Price.toSignificant(6)}
                        </div>
                        <div>
                          {pool.pair.token1.symbol}/{pool.pair.token0.symbol}
                        </div>
                        <div>
                          {pool.pair.token1Price.toSignificant(6)}
                        </div>
                        <div>
                          {pool.pair.token0.symbol}/{pool.pair.token1.symbol}
                        </div>
                      </Grid>
                    </TdHideMd>
                    <TdHideLg>
                      <Grid style={{ justifyItems: 'flex-end'}}>
                        <div>
                          {pool.pair.token0.symbol}:
                        </div>
                        <div>
                          {userPoolData[i].token0Deposited?.toSignificant(6) ?? '---'}
                        </div>
                        <div>
                          {pool.pair.token1.symbol}:
                        </div>
                        <div>
                          {userPoolData[i].token1Deposited?.toSignificant(6) ?? '---'}
                        </div>
                        <div>
                          LP:
                        </div>
                        <div>
                          {userPoolData[i].poolBalance?.toSignificant(4) ?? '---'}
                        </div>
                        <div>
                          Share:
                        </div>
                        <div>
                          {userPoolData[i].poolPercentage ? `${userPoolData[i].poolPercentage?.toFixed(2)}%` : '---'}
                        </div>
                      </Grid>
                    </TdHideLg>
                    <Td>
                      <AutoColumn gap="sm">
                        <Button scale="sm" as={Link} to={`/add/${pool.pair.token0.address}/${pool.pair.token1.address}`}>
                          {TranslateString(168, 'Add Liquidity')}
                        </Button>
                        <Button
                          scale="sm"
                          variant="secondary"
                          as={Link}
                          disabled={!userPoolData[i].poolBalance || userPoolData[i].poolBalance?.equalTo(new TokenAmount(pool.pair.liquidityToken, '0'))}
                          to={`/remove/${pool.pair.token0.address}/${pool.pair.token1.address}`}
                        >
                          {TranslateString(168, 'Remove Liquidity')}
                        </Button>
                      </AutoColumn>
                    </Td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <SectionTitle>Create New Pools</SectionTitle>
        <Text color="textSubtle" style={{ paddingLeft: '10px', marginBottom: '16px' }}>
          These tokens need liquidity pools. Click to create a pool with STRAX.
        </Text>
        {SUGGESTED_POOLS.map((pool) => (
          <SuggestedPoolRow
            key={pool.address}
            tokenAddress={pool.address}
            symbol={pool.symbol}
          />
        ))}
      </Wrapper>
    </BodyWrapper>
  )
}
