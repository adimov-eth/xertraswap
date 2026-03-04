import React from 'react'
import { scales, TagProps } from './types'
import { StyledTag } from './StyledTag'

const Tag: React.FC<TagProps> = ({
  variant = 'primary',
  scale = scales.MD,
  outline = false,
  startIcon,
  endIcon,
  children,
  ...props
}) => (
  <StyledTag variant={variant} scale={scale} outline={outline} {...props}>
    {React.isValidElement(startIcon) &&
      React.cloneElement(startIcon as React.ReactElement<any>, {
        mr: '0.5em',
      })}
    {children}
    {React.isValidElement(endIcon) &&
      React.cloneElement(endIcon as React.ReactElement<any>, {
        ml: '0.5em',
      })}
  </StyledTag>
)

export default Tag
