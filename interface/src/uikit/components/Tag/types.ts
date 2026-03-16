import { PropsWithChildren, ReactNode } from 'react'
import { SpaceProps } from '../../util/styledProps'

export const variants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  TEXTDISABLED: 'textDisabled',
  TEXTSUBTLE: 'textSubtle',
  BINANCE: 'binance',
  FAILURE: 'failure',
} as const

export const scales = {
  MD: 'md',
  SM: 'sm',
} as const

export type Scale = (typeof scales)[keyof typeof scales]
export type Variant = (typeof variants)[keyof typeof variants]

export interface TagProps extends PropsWithChildren<SpaceProps> {
  variant?: Variant
  scale?: Scale
  startIcon?: ReactNode
  endIcon?: ReactNode
  outline?: boolean
}
