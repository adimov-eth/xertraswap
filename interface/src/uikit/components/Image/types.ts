import { HTMLAttributes } from 'react'
import { SpaceProps } from '../../util/styledProps'

export interface WrapperProps extends SpaceProps, HTMLAttributes<HTMLDivElement> {
  width: number
  height: number
}

export interface ImageProps extends WrapperProps {
  src: string
  alt?: string
}

export interface BackgroundImageProps extends ImageProps {
  loadingPlaceholder?: React.ReactNode
}

export interface ContainerProps extends SpaceProps {
  width: number
  height: number
  responsive?: boolean
}
