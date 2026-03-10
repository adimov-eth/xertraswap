import styled from 'styled-components'
import { CogIcon } from '../../../components/Svg'
import IconButton from '../../../components/Button/IconButton'
import { PushedProps } from '../types'
import StraxPrice from './StraxPrice'
import SocialLinks from './SocialLinks'

interface PanelFooterProps extends PushedProps 
{
  cakePriceUsd?: number
}

const Container = styled.div`
  flex: none;
  padding: 8px 4px;
  background-color: ${({ theme }) => theme.nav.background};
  border-top: solid 2px rgba(133, 133, 133, 0.1);
`

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  padding: 0 16px;
`

function PanelFooter ({ isPushed, pushNav, cakePriceUsd } : PanelFooterProps) {
  if (!isPushed) {
    return (
      <Container>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    )
  }

  return (
    <Container>
      <SocialEntry>
        <StraxPrice cakePriceUsd={cakePriceUsd} />
        <SocialLinks />
      </SocialEntry>
    </Container>
  )
}

export default PanelFooter
