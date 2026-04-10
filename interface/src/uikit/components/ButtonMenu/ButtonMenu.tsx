import React, { cloneElement, Children, ReactElement } from 'react'
import StyledButtonMenu from './StyledButtonMenu'
import { scales, variants } from '../Button/types'
import { ButtonMenuProps } from './types'

type ButtonMenuChildProps = {
  isActive?: boolean
  onClick?: () => void
  scale?: typeof scales.SM | typeof scales.MD | typeof scales.XS
  variant?: string
}

const ButtonMenu: React.FC<ButtonMenuProps> = ({
  activeIndex = 0,
  scale = scales.MD,
  variant = variants.PRIMARY,
  onItemClick,
  children,
}) => {
  return (
    <StyledButtonMenu variant={variant}>
      {Children.map(children, (child: ReactElement, index) => {
        return cloneElement(child as ReactElement<ButtonMenuChildProps>, {
          isActive: activeIndex === index,
          onClick: onItemClick ? () => onItemClick(index) : undefined,
          scale,
          variant,
        })
      })}
    </StyledButtonMenu>
  )
}

export default ButtonMenu
