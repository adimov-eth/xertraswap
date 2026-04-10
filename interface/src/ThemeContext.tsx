import React from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { xertraDark } from './theme/xertraTheme'

export interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

/**
 * No-op theme toggle used because the interface currently runs in a dark-only mode.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

/**
 * Theme context for the interface shell.
 *
 * The current implementation is intentionally dark-only and always exposes
 * `isDark: true`. `toggleTheme` is kept as a stable no-op to preserve the
 * existing UI kit contract without introducing a fake light-mode state.
 */
const ThemeContext = React.createContext<ThemeContextType>({ isDark: true, toggleTheme: noop })

/**
 * Provides the application theme and the dark-only theme context contract.
 *
 * @param props.children React subtree rendered under the Xertra dark theme.
 * @returns The themed application subtree.
 */
function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ isDark: true, toggleTheme: noop }}>
      <SCThemeProvider theme={xertraDark}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
