import React from 'react'
import { Provider } from 'react-redux'
import store from './state'
import { ThemeContextProvider } from './ThemeContext'

const Providers = ({ children } : { children : React.ReactNode}) => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </Provider>
  )
}

export default Providers
