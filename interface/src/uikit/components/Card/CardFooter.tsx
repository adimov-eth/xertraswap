import styled from 'styled-components'
import { spaceStyles, SpaceProps, blockProps, SPACE_PROP_NAMES } from '../../util/styledProps'

export type CardFooterProps = SpaceProps

const CardFooter = styled.div.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES),
})<CardFooterProps>`
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  ${spaceStyles}
`

CardFooter.defaultProps = {
  p: '24px',
}

export default CardFooter
