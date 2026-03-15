import styled from 'styled-components'
import {
  spaceStyles,
  layoutStyles,
  backgroundStyles,
  borderStyles,
  positionStyles,
  blockProps,
  SPACE_PROP_NAMES,
  LAYOUT_PROP_NAMES,
  BACKGROUND_PROP_NAMES,
  BORDER_PROP_NAMES,
  POSITION_PROP_NAMES,
} from '../../util/styledProps'
import { BoxProps } from './types'

const Box = styled.div.withConfig({
  shouldForwardProp: blockProps(
    SPACE_PROP_NAMES,
    LAYOUT_PROP_NAMES,
    BACKGROUND_PROP_NAMES,
    BORDER_PROP_NAMES,
    POSITION_PROP_NAMES,
  ),
})<BoxProps>`
  ${spaceStyles}
  ${layoutStyles}
  ${backgroundStyles}
  ${borderStyles}
  ${positionStyles}
`

export default Box
