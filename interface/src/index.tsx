import React from 'react'
import {createRoot} from 'react-dom/client';
import { ResetCSS } from 'uikit'
import GlobalStyle from './style/Global'
import CSSVariables from './style/CSSVariables'
import ButtonOverrides from './style/ButtonOverrides'
import App from './pages/App'
import Providers from './Providers'
import './i18n'

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false
}

window.addEventListener('error', () => {
   localStorage?.removeItem('redux_localstorage_simple_lists')
})

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
     <Providers>
       <ResetCSS />
       <GlobalStyle />
       <CSSVariables />
       <ButtonOverrides />
       <App />
     </Providers>
  </React.StrictMode>
);

// ReactDOM.render(
//   <StrictMode>
//     <Providers>
//       <ResetCSS />
//       <GlobalStyle />
//       <CSSVariables />
//       <ButtonOverrides />
//       <App />
//     </Providers>
//   </StrictMode>,
//   document.getElementById('root')
// )
