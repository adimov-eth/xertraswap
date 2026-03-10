import { PropsWithChildren } from 'react'
import { Colors } from '../../theme/types'
import { Login } from '../WalletModal/types'

export interface LangType {
  code: string
  language: string
}

export interface PushedProps {
  isPushed: boolean
  pushNav: (isPushed: boolean) => void
}

export interface NavTheme {
  background: string
  hover: string
}

export interface LinkStatus {
  text: string
  color: keyof Colors
}

export interface MenuSubEntry {
  label: string
  href: string
  calloutClass?: string
  status?: LinkStatus
}

export interface MenuEntryProps {
  label: string
  icon: string
  items?: MenuSubEntry[]
  href?: string
  calloutClass?: string
  initialOpenState?: boolean
  status?: LinkStatus
}

export interface PanelProps extends PropsWithChildren {
  isDark: boolean
  toggleTheme: (isDark: boolean) => void
  cakePriceUsd?: number
  currentLang: string
  langs: LangType[]
  setLang: (lang: LangType) => void
  links: Array<MenuEntryProps>
}

export interface NavProps extends PanelProps {
  account: string | undefined
  login: Login
  logout: () => void
}
