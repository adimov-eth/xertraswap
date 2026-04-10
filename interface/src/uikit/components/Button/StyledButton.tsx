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

const shouldForward = blockProps(SPACE_PROP_NAMES)
const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => {
    if (prop.startsWith('$')) return true
    // scale, external, width, height needed by interpolation and/or valid HTML
    if (['scale', 'external', 'width', 'height'].includes(prop)) return true
    return shouldForward(prop)
  },
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

  &:hover:not(:disabled):not(.pancake-button--disabled):not(:active) {
    transform: translateY(-1px);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset;
    filter: brightness(1.15) saturate(1.1);
  }

  &:active:not(:disabled):not(.pancake-button--disabled) {
    transform: translateY(1px);
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
  }

  ${getDisabledStyles}
  ${getScaleStyles}
  ${getVariantStyles}
  ${spaceStyles}
  ${layoutStyles}

  &:link, &:visited, &:hover, &:active {
    color: inherit;
  }

  &:focus-visible {
    outline: none;
  }
`

export default StyledButton
