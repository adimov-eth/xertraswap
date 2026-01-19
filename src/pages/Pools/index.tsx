import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TokenAmount } from '@xertra/sdk'
import { Card, Button, Text } from '@xertra/uikit'

import { useAllPools, useUserPairPosition, PairState } from 'hooks/usePools'
import useI18n from 'hooks/useI18n'
import { useActiveWeb3React } from 'hooks'

import { Wrapper } from 'components/swap/styleds'
import { AutoColumn } from 'components/Column'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import CurrencyLogo from 'components/CurrencyLogo'
import { useCurrency } from 'hooks/Tokens'

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
  padding: 10px 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  &:first-child {
    padding-left: 10px;
  }

  &:last-child {
    padding-right: 10px;
  }
`

const Td = styled.td`
  padding: 5px;
  vertical-align: middle;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};

  &:first-child {
    padding-left: 10px;
  }

  &:last-child {
    padding-right: 10px;
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
  font-size: 18px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 12px;
  padding-left: 10px;
`

const SuggestedPoolCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 12px;
  margin: 0 10px 8px 10px;
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

// Wormhole tokens that need pools
const SUGGESTED_POOLS = [
  {
    symbol: 'WETH.wh',
    address: '0xc398Cc4828E7ce677B357c8f94B6792Cb5538c03',
  },
  {
    symbol: 'WBNB.wh',
    address: '0xE6d9419BFE31992a3aA4763B1e86Faf384c91697',
  },
  {
    symbol: 'USDC.e',
    address: '0x959A50Db9B9c78990698cA621d7a0bA7F1d6f2D6',
  },
  {
    symbol: 'USDC.bsc',
    address: '0xaa0e34A393dadAAF661132deA1EDD834c5628e16',
  },
]

function SuggestedPoolRow({ tokenAddress, symbol }: { tokenAddress: string; symbol: string }) {
  const currency = useCurrency(tokenAddress)
  const straxCurrency = useCurrency('STRAX')
  const TranslateString = useI18n()

  return (
    <SuggestedPoolCard>
      <TokenInfo>
        <DoubleCurrencyLogo currency0={straxCurrency ?? undefined} currency1={currency ?? undefined} size={25} margin />
        <TokenSymbols>
          <Text bold>STRAX-{symbol}</Text>
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
                        <Link to={`/pool/${pool.pair.token0.address}/${pool.pair.token1.address}`} style={{ textDecoration: 'none', color: '#1FC7D4', fontWeight: 500 }}>
                          {pool.info.lpSymbol}
                        </Link>
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
          These Wormhole bridged tokens need liquidity pools. Click to create a pool with STRAX.
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
