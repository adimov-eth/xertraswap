import styled, { DefaultTheme } from 'styled-components'
import { spaceStyles, blockProps, SPACE_PROP_NAMES } from '../../util/styledProps'
import { CardProps } from './types'

interface StyledCardProps extends CardProps {
  theme: DefaultTheme
}

const getBoxShadow = ({ isActive, isSuccess, isWarning, theme }: StyledCardProps) => {
  if (isWarning) return theme.card.boxShadowWarning
  if (isSuccess) return theme.card.boxShadowSuccess
  if (isActive) return theme.card.boxShadowActive
  return theme.card.boxShadow
}

const StyledCard = styled.div.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES, ['isDisabled', 'isWarning', 'isSuccess', 'isActive'] as const),
})<StyledCardProps>`
  background-color: ${({ theme }) => theme.card.background};
  border: ${({ theme }) => theme.card.boxShadow};
  border-radius: 32px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme, isDisabled }) => theme.colors[isDisabled ? 'textDisabled' : 'text']};
  overflow: hidden;
  position: relative;
  ${spaceStyles}
`

StyledCard.defaultProps = {
  isActive: false,
  isSuccess: false,
  isWarning: false,
  isDisabled: false,
}

export default StyledCard
