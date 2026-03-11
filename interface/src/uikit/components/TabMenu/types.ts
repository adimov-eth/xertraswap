import { PropsWithChildren } from "react"

export interface TabMenuProps  {
  activeIndex?: number
  onItemClick?: (index: number) => void
  children: React.ReactElement[]
}

export interface TabProps extends PropsWithChildren {
  isActive?: boolean
  onClick?: () => void
}
