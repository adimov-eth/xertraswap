import { ReactNode } from 'react'
import { SpaceProps } from '../../util/styledProps'

export interface BreadcrumbsProps extends SpaceProps {
  separator?: ReactNode
  children: ReactNode
}
