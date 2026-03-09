import React, { cloneElement, ElementType, isValidElement, JSX } from 'react'
import getExternalLinkProps from '../../util/getExternalLinkProps'
import StyledButton from './StyledButton'
import { ButtonProps, scales, variants } from './types'

function Button<E extends ElementType = 'button'>({...rest}: ButtonProps<E>) : JSX.Element {

  rest.scale = rest.scale ?? scales.MD
  rest.variant = rest.variant ?? variants.PRIMARY

  const internalProps = external ? getExternalLinkProps() : {}
  const isDisabled = rest.isLoading || rest.disabled
  const classNames = rest.className ? [rest.className] : []

  if (rest.isLoading) {
    classNames.push('pancake-button--loading')
  }

  if (isDisabled && !rest.isLoading) {
    classNames.push('pancake-button--disabled')
  }
  
  return (
    <StyledButton
      isLoading={rest.isLoading}
      external={external}
      variant={rest.variant}
      scale={rest.scale}
      disabled={isDisabled}
      className={classNames.join(' ')}
      {...internalProps}
      {...rest}
    >
      <>
        {isValidElement(rest.startIcon) &&
          cloneElement(rest.startIcon as React.ReactElement<any>, {
            mr: '0.5rem',
          })}
        {rest.children}
        {isValidElement(rest.endIcon) &&
          cloneElement(rest.endIcon as React.ReactElement<any>, {
            ml: '0.5rem',
          })}
      </>
    </StyledButton>
  )
}

export default Button
