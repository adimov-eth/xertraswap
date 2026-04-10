import styled, { DefaultTheme } from 'styled-components'
import { spaceStyles, blockProps, SPACE_PROP_NAMES } from '../../util/styledProps'
import getThemeValue from '../../util/getThemeValue'
import { TextProps } from './types'

interface ThemedProps extends TextProps {
  theme: DefaultTheme
}

const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`colors.${color}`, color)(theme)
}

const getFontSize = ({ fontSize, $small }: TextProps) => {
  return $small ? '14px' : fontSize || '16px'
}

const Text = styled.div.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES, [
    'color', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
    'textAlign', 'textTransform', '$bold', '$small',
  ] as const),
})<TextProps>`
  color: ${getColor};
  font-size: ${getFontSize};
  font-weight: ${({ $bold }) => ($bold ? 600 : 400)};
  line-height: 1.5;
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight};`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight};`}
  ${({ letterSpacing }) => letterSpacing && `letter-spacing: ${letterSpacing};`}
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
  ${spaceStyles}
`

Text.defaultProps = {
  color: 'text',
  $small: false,
}

export default Text
