import { useContext, useState } from 'react'
import styled from 'styled-components'
import { AlertTriangle } from 'react-feather'
import { Text } from 'uikit'
import { ALLOWED_PRICE_IMPACT_HIGH, PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN } from '../../constants'
import { Percent } from '@xertra/sdk'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.failure};
  background: rgba(237, 75, 158, 0.08);
  width:100%;
`

const Content = styled.div`
  flex: 1;
`

interface PriceImpactBannerProps
{
  priceImpactWithoutFee: Percent
}

export default function PriceImpactBanner({ priceImpactWithoutFee } : PriceImpactBannerProps) {

  let bannerText = 'This swap has a price impact of at least'
  if (priceImpactWithoutFee.equalTo(PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN) || priceImpactWithoutFee.greaterThan(PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN)) {
    bannerText = `${bannerText} ${PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN.toFixed(0)}%`
  }

  if ((priceImpactWithoutFee.equalTo(ALLOWED_PRICE_IMPACT_HIGH) || priceImpactWithoutFee.greaterThan(ALLOWED_PRICE_IMPACT_HIGH)) && priceImpactWithoutFee.lessThan(PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN)) {
    bannerText = `${bannerText} ${ALLOWED_PRICE_IMPACT_HIGH.toFixed(0)}%`
  }
  
  return (
    <Container>
      <AlertTriangle size={18} />
      <Content>
        <Text $bold color="failure" mb="4px">
          Price Impact Warning
        </Text>
        <Text fontSize="14px" color="textSubtle">{bannerText}</Text>
      </Content>
    </Container>
  )
}