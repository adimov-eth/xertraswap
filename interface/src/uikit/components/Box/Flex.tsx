import styled from 'styled-components'
import { flexbox } from 'styled-system'
import Box from './Box'
import { FlexProps } from './types'

const Flex = styled(Box).withConfig({
    shouldForwardProp: (prop) => !['justifyContent', 'flexDirection'].includes(prop),
})<FlexProps>`
  display: flex;
  ${flexbox}
`

export default Flex