import styled from 'styled-components'
import { background, border, layout, position, space } from 'styled-system'
import { BoxProps } from './types'

const Box = styled.div
.withConfig({ shouldForwardProp: (prop) => !['alignItems', 'mb'].includes(prop) })
<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
`

export default Box
