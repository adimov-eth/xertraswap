import styled, { DefaultTheme } from 'styled-components'
import { spaceStyles, blockProps, SPACE_PROP_NAMES } from '../../util/styledProps'
import getThemeValue from '../../util/getThemeValue'
import { TableHeaderProps } from './types'

interface ThemedProps extends TableHeaderProps {
  theme: DefaultTheme
}

const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`colors.${color}`, color)(theme)
}

const getFontSize = ({ fontSize, $small }: TableHeaderProps) => {
  return $small ? '14px' : fontSize || '16px'
}

export const TableHead = styled.thead.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES, [
    'color', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
    'textAlign', 'textTransform', '$bold', '$small',
  ] as const),
})<TableHeaderProps>`
  ${spaceStyles}
`

export const TableHeader = styled.th.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES, [
    'color', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
    'textAlign', 'textTransform', '$bold', '$small',
  ] as const),
})<TableHeaderProps>`
  color: ${getColor};
  padding: ${({ padding }) => padding ?? '5px'};  
  text-align: ${({ textAlign }) => textAlign ?? 'left'};
  ${spaceStyles}
`

export const TableRow = styled.tr.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES, [
    'color', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
    'textAlign', 'textTransform', '$bold', '$small',
  ] as const),
})<TableHeaderProps>`
  color: ${getColor};
  font-size: ${getFontSize};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};  
  ${spaceStyles}
`

export const TableCell = styled.td.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES, [
    'color', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
    'textAlign', 'textTransform', '$bold', '$small',
  ] as const),
})<TableHeaderProps>`
  color: ${getColor};
  padding: ${({ padding }) => padding ?? '5px'};
  text-align: ${({ textAlign }) => textAlign ?? 'left'};
  ${spaceStyles}
`
