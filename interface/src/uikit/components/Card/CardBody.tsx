import styled from 'styled-components'
import { spaceStyles, SpaceProps, blockProps, SPACE_PROP_NAMES } from '../../util/styledProps'

export type CardBodyProps = SpaceProps

const CardBody = styled.div.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES),
})<CardBodyProps>`
  ${spaceStyles}
  padding: 24px;
`

export default CardBody
