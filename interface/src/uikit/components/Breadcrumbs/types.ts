import { PropsWithChildren, ReactNode } from 'react'
import { SpaceProps } from 'styled-system'

export interface BreadcrumbsProps extends PropsWithChildren<SpaceProps> {
  separator?: ReactNode
}
