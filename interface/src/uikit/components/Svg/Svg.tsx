import styled, { css, keyframes } from 'styled-components'
import { spaceStyles, blockProps, SPACE_PROP_NAMES } from '../../util/styledProps'
import getThemeValue from '../../util/getThemeValue'
import { SvgProps } from './types'

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const spinStyle = css`
  animation: ${rotate} 2s linear infinite;
`;

const Svg = styled.svg
.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES, ['spin'] as const),
})
.attrs<SvgProps>((props) => ({
  color: props.color ?? 'text',
  width: props.width ?? '20px',
  xmlns: props.xmlns ?? 'http://www.w3.org/2000/svg',
  spin: props.spin ?? false,
}))<SvgProps>`
  fill: ${({ theme, color }) => getThemeValue(`colors.${color}`, color)(theme)};
  flex-shrink: 0;

  ${({ spin }) => spin && spinStyle}
  ${spaceStyles}
`

export default Svg;
