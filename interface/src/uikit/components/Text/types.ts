import { SpaceProps } from '../../util/styledProps'

export interface TextProps extends SpaceProps {
  color?: string
  fontSize?: string
  fontWeight?: string | number
  lineHeight?: string | number
  letterSpacing?: string
  textAlign?: string
  $bold?: boolean
  $small?: boolean
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize'
}
