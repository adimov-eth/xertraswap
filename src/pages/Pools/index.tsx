import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TokenAmount } from '@pancakeswap-libs/sdk'
import { Card, Button } from '@pancakeswap-libs/uikit'

import { useAllPools, useUserPairPosition, PairState } from 'hooks/usePools'
import useI18n from 'hooks/useI18n'

import { Wrapper } from 'components/swap/styleds'
import { AutoColumn } from 'components/Column'
import DoubleCurrencyLogo from 'components/DoubleLogo'

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
      </Wrapper>
    </BodyWrapper>
  )
}
