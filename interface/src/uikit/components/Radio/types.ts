import { SpaceProps } from '../../util/styledProps'

export const scales = {
  SM: 'sm',
  MD: 'md',
} as const

export type Scales = (typeof scales)[keyof typeof scales]

export interface RadioProps extends SpaceProps {
  scale?: Scales
}

export interface RadioTheme {
  handleBackground: string
}
