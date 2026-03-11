import styled from 'styled-components'
import Button from '../../../components/Button/Button'

const MenuButton = styled(Button).attrs({
  variant: 'text',
  scale: 'sm',
})`
  color: ${({ theme }) => theme.colors.text};
  padding: 0 8px;
  border-radius: 8px;
`

export default MenuButton