import { HTMLAttributes } from 'react'
import {
  SpaceProps,
  LayoutProps,
  BackgroundProps,
  BorderProps,
  PositionProps,
  FlexboxProps,
} from '../../util/styledProps'

export interface BoxProps
  extends SpaceProps,
    LayoutProps,
    BackgroundProps,
    BorderProps,
    PositionProps,
    HTMLAttributes<HTMLDivElement> {}

export interface FlexProps extends BoxProps, FlexboxProps {}
