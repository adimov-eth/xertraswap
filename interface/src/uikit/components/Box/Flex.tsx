import styled from 'styled-components'
import {
  flexboxStyles,
  blockProps,
  FLEXBOX_PROP_NAMES,
  SPACE_PROP_NAMES,
  LAYOUT_PROP_NAMES,
  BACKGROUND_PROP_NAMES,
  BORDER_PROP_NAMES,
  POSITION_PROP_NAMES,
} from '../../util/styledProps'
import Box from './Box'
import { FlexProps } from './types'

const Flex = styled(Box).withConfig({
  shouldForwardProp: blockProps(
    FLEXBOX_PROP_NAMES,
    SPACE_PROP_NAMES,
    LAYOUT_PROP_NAMES,
    BACKGROUND_PROP_NAMES,
    BORDER_PROP_NAMES,
    POSITION_PROP_NAMES,
  ),
})<FlexProps>`
  display: flex;
  ${flexboxStyles}
`

export default Flex
