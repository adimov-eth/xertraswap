import React from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { xertraDark } from './theme/xertraTheme'

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// No-op function for theme toggle (dark mode only)
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

// Dark mode only - matching xertra.com brand
const ThemeContext = React.createContext<ThemeContextType>({ isDark: true, toggleTheme: noop })

const ThemeContextProvider: React.FC = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ isDark: true, toggleTheme: noop }}>
      <SCThemeProvider theme={xertraDark}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
