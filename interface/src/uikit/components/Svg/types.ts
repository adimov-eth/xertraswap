import { SVGAttributes } from 'react'
import { DefaultTheme } from 'styled-components'
import { SpaceProps } from '../../util/styledProps'

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement>, SpaceProps {
  theme?: DefaultTheme
  spin?: boolean
}
