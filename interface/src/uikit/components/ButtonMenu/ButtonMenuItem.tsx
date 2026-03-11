import styled from 'styled-components'
import Button from '../Button/Button'
import { StyledButtonProps, PolymorphicComponent, variants } from '../Button/types'
import { ButtonMenuItemProps } from './types'

interface InactiveButtonProps extends StyledButtonProps {
  as?: StyledButtonProps['as']
}

const InactiveButton: PolymorphicComponent<InactiveButtonProps, 'button'> = styled(Button)<InactiveButtonProps>`
  background-color: transparent;
  color: ${({ theme, $variant }) => ($variant === variants.PRIMARY ? theme.colors.primary : theme.colors.textSubtle)};
  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }
`

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, 'button'> = ({
  isActive = false,
  $variant = variants.PRIMARY,
  as,
  ...props
}: ButtonMenuItemProps) => {
  const propsWithLink = props as ButtonMenuItemProps

  if (!isActive) {
    return <InactiveButton as={as} $variant={variants.TERTIARY} {...propsWithLink} />
  }

  return <Button as={as} variant={$variant} {...propsWithLink} />
}

export default ButtonMenuItem
