import React, { cloneElement, ElementType, isValidElement, ReactNode } from 'react'
import getExternalLinkProps from '../../util/getExternalLinkProps'
import StyledButton from './StyledButton'
import { PolymorphicComponentProps, Scale, scales, Variant, variants } from './types'
import { JSX } from 'react/jsx-runtime'
import { Link } from 'react-router-dom'
import { LayoutProps, SpaceProps } from 'styled-system'

interface ButtonPropsInterface extends LayoutProps {
  as?: 'a' | 'button' | typeof Link
  variant?: Variant
  scale?: Scale
  isLoading?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  external?: boolean
}

export type ButtonProps<P extends ElementType = 'button'> = PolymorphicComponentProps<P, ButtonPropsInterface>

const Button = (props: ButtonProps): JSX.Element => {
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
      $variant={variant} 
      className={classNames.join(' ')}
      disabled={isDisabled}
      scale={scale}
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
