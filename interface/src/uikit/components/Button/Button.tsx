import React, { cloneElement, ElementType, isValidElement } from 'react'
import getExternalLinkProps from '../../util/getExternalLinkProps'
import StyledButton from './StyledButton'
import { ButtonProps, scales, variants } from './types'
import { JSX } from 'react/jsx-runtime'

const Button = <E extends ElementType = 'button'>( props: ButtonProps<E>): JSX.Element => {
  const {
    startIcon,
    endIcon,
    external = false,
    className,
    isLoading = false,
    disabled = false,
    scale = scales.MD,
    variant = variants.PRIMARY,
    children,
    ...rest
  } = props

  const internalProps = external ? getExternalLinkProps() : {}
  const isDisabled = isLoading || disabled
  const classNames = className ? [className] : []

  if (isLoading) {
    classNames.push('pancake-button--loading')
  }

  if (isDisabled && !isLoading) {
    classNames.push('pancake-button--disabled')
  }

  return (
    <StyledButton
      $isLoading={isLoading}
      className={classNames.join(' ')}
      disabled={isDisabled}
      scale={scale}
      variant={variant} 
      {...internalProps}
      {...rest}
    >
      <>
        {isValidElement(startIcon) &&
          cloneElement(startIcon as React.ReactElement<any>, {
            mr: '0.5rem',
          })}
        {children}
        {isValidElement(endIcon) &&
          cloneElement(endIcon as React.ReactElement<any>, {
            ml: '0.5rem',
          })}
      </>
    </StyledButton>
  )
}

export default Button
