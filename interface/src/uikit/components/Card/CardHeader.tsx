import styled from 'styled-components'
import { spaceStyles, SpaceProps, blockProps, SPACE_PROP_NAMES } from '../../util/styledProps'
import { CardTheme } from './types'

export interface CardHeaderProps extends SpaceProps {
  variant?: keyof CardTheme['cardHeaderBackground']
}

const CardHeader = styled.div.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES, ['variant'] as const),
})<CardHeaderProps>`
  background: ${({ theme, variant = 'default' }) => theme.card.cardHeaderBackground[variant]};
  ${spaceStyles}
`

CardHeader.defaultProps = {
  p: '24px',
}

export default CardHeader
