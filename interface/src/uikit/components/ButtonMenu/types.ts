import { ElementType } from 'react'
import { Scale, StyledButtonProps, variants } from '../Button/types'

export interface ButtonMenuItemProps extends StyledButtonProps {
  as?: ElementType
  isActive?: boolean
  children?: React.ReactNode
}

export interface ButtonMenuProps {
  variant?: typeof variants.PRIMARY | typeof variants.SUBTLE
  activeIndex?: number
  onItemClick?: (index: number) => void
  scale?: Scale
  children: React.ReactElement[]
}
