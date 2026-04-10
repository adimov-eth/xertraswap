import { PropsWithChildren } from "react"

export type Position = 'top' | 'top-right' | 'bottom'

export interface PositionProps {
  position?: Position
}

export interface DropdownProps extends PositionProps, PropsWithChildren {
  target: React.ReactElement
}
