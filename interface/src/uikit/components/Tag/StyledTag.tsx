import styled, { DefaultTheme } from 'styled-components'
import { spaceStyles, blockProps, SPACE_PROP_NAMES } from '../../util/styledProps'
import { Colors } from '../../theme/types'
import { scaleVariants, styleVariants } from './theme'
import { TagProps, variants, scales, Scale, Variant } from './types'

interface ThemedProps extends TagProps {
  theme: DefaultTheme
}

const getOutlineStyles = ({ outline, theme, variant: variantKey = variants.PRIMARY }: ThemedProps) => {
  if (outline) {
    const themeColorKey = styleVariants[variantKey].backgroundColor as keyof Colors
    const color = theme.colors[themeColorKey]
    return `
      color: ${color};
      background: transparent;
      border: 2px solid ${color};
    `
  }
  return ''
}

const getScaleStyles = ({ scale = scales.MD }: { scale?: Scale }) => {
  const s = scaleVariants[scale] || scaleVariants[scales.MD]
  let css = ''
  if (s.height) css += `height: ${s.height};`
  if (s.padding) css += `padding: ${s.padding};`
  if (s.fontSize) css += `font-size: ${s.fontSize};`
  return css
}

const getVariantStyles = ({ variant: v = variants.PRIMARY, theme }: { variant?: Variant; theme: DefaultTheme }) => {
  const s = styleVariants[v] || styleVariants[variants.PRIMARY]
  const color = theme.colors[s.backgroundColor as keyof typeof theme.colors] || s.backgroundColor
  return `background-color: ${color};`
}

export const StyledTag = styled.div.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES, ['variant', 'scale', 'outline'] as const),
})<ThemedProps>`
  align-items: center;
  border-radius: 16px;
  color: #ffffff;
  display: inline-flex;
  font-weight: 400;
  white-space: nowrap;

  & > svg {
    fill: currentColor;
  }

  ${getScaleStyles}
  ${getVariantStyles}
  ${spaceStyles}
  ${getOutlineStyles}
`

export default null
