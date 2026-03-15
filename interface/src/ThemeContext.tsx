import React from 'react'
import { ThemeProvider as SCThemeProvider, StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

/**
 * Prevent styled-components v6 from forwarding unknown props to the DOM.
 * Allow props that @emotion/is-prop-valid recognises as valid HTML attributes.
 * Always forward all props to custom (non-HTML) components.
 */
function shouldForwardProp(prop: string, element: any) {
  if (typeof element !== 'string') return true
  if (prop.startsWith('$')) return true
  return isPropValid(prop)
}
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
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <SCThemeProvider theme={xertraDark}>{children}</SCThemeProvider>
      </StyleSheetManager>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
