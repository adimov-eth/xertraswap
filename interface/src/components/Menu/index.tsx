import React, { useContext } from 'react'
import { Menu as UikitMenu} from 'uikit'
import { allLanguages } from '../../constants/localisation/languageCodes'
import { LanguageContext } from '../../hooks/LanguageContext'
import useGetPriceData from '../../hooks/useGetPriceData'
import links from './config'
import useWeb3Auth from '../../hooks/useWeb3Auth'
import Web3AuthContext from '../../pages/Web3AuthContext'

// No-op function for theme toggle (dark mode only)
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const Menu: React.FC = (props) => {
  const { login, logout } = useWeb3Auth();
  const { account } = useContext(Web3AuthContext)
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const priceData = useGetPriceData();
  const cakePriceUsd = priceData ? Number(priceData.stratis?.usd) : undefined

  return (
    <UikitMenu
      links={links}
      account={account}
      login={login}
      logout={logout}
      isDark
      toggleTheme={noop}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      {...props}
    />
  )
}

export default Menu
