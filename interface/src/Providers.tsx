import React from 'react'
import { Provider } from 'react-redux'
import { ModalProvider } from 'uikit'
import store from './state'
import { ThemeContextProvider } from './ThemeContext'

const Providers = ({ children } : { children : React.ReactNode}) => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <ModalProvider>{children}</ModalProvider>
      </ThemeContextProvider>
    </Provider>
  )
}

export default Providers
