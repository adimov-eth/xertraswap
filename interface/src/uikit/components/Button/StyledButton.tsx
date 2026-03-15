import styled, { DefaultTheme } from 'styled-components'
import {
  spaceStyles,
  layoutStyles,
  blockProps,
  SPACE_PROP_NAMES,
  LAYOUT_PROP_NAMES,
} from '../../util/styledProps'
import { scaleVariants, styleVariants } from './theme'
import { StyledButtonProps, Scale, Variant, scales, variants } from './types'

interface ThemedButtonProps extends StyledButtonProps {
  theme: DefaultTheme
}

interface TransientButtonProps extends ThemedButtonProps {
  $isLoading?: boolean
}

const getDisabledStyles = ({ $isLoading, theme }: TransientButtonProps) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.pancake-button--disabled {
        cursor: not-allowed;
      }
    `
  }

  return `
    &:disabled,
    &.pancake-button--disabled {
      background-color: ${theme.colors.backgroundDisabled};
      border-color: ${theme.colors.backgroundDisabled};
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
    }
  `
}

const getOpacity = ({ $isLoading = false }: TransientButtonProps) => {
  return $isLoading ? '.5' : '1'
}

const getScaleStyles = ({ scale = scales.MD }: { scale?: Scale }) => {
  const s = scaleVariants[scale] || scaleVariants[scales.MD]
  let css = ''
  if ('height' in s) css += `height: ${s.height};`
  if ('padding' in s) css += `padding: ${s.padding};`
  if ('fontSize' in s) css += `font-size: ${(s as any).fontSize};`
  return css
}

const getVariantStyles = ({ $variant = variants.PRIMARY, theme }: { $variant?: Variant; theme: DefaultTheme }) => {
  const v = styleVariants[$variant] || styleVariants[variants.PRIMARY]
  let css = ''
  for (const [prop, value] of Object.entries(v)) {
    if (prop === 'backgroundColor') {
      const resolved = theme.colors[value as keyof typeof theme.colors] || value
      css += `background-color: ${resolved};`
    } else if (prop === 'color') {
      const resolved = theme.colors[value as keyof typeof theme.colors] || value
      css += `color: ${resolved};`
    } else if (prop === 'borderColor') {
      const resolved = theme.colors[value as keyof typeof theme.colors] || value
      css += `border-color: ${resolved};`
    } else if (prop === 'boxShadow') {
      css += `box-shadow: ${value};`
    } else if (prop === 'border') {
      css += `border: ${value};`
    } else if (prop === ':disabled') {
      const nested = value as Record<string, string>
      css += `&:disabled {`
      for (const [np, nv] of Object.entries(nested)) {
        if (np === 'backgroundColor') {
          const r = theme.colors[nv as keyof typeof theme.colors] || nv
          css += `background-color: ${r};`
        }
      }
      css += `}`
    }
  }
  return css
}

const StyledButton = styled.button.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES, LAYOUT_PROP_NAMES, [
    '$isLoading', '$variant', 'scale', 'external',
  ] as const),
})<StyledButtonProps>`
  align-items: center;
  border: 0;
  border-radius: 16px;
  box-shadow: 0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: ${getOpacity};
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
    opacity: 0.9;
  }

  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    opacity: 0.85;
  }

  ${getDisabledStyles}
  ${getScaleStyles}
  ${getVariantStyles}
  ${spaceStyles}
  ${layoutStyles}
`

export default StyledButton
