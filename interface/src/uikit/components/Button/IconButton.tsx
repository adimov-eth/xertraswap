import styled from 'styled-components'
import Button, { ButtonProps } from './Button'

const IconButton = styled(Button)<ButtonProps>`
  padding: 0;
  width: ${({ scale }) => (scale === 'sm' ? '32px' : '48px')};
`

export default IconButton
