import React, { useContext } from 'react'
import { Menu as UikitMenu} from '@xertra/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from '../../constants/localisation/languageCodes'
import { LanguageContext } from '../../hooks/LanguageContext'
import useGetPriceData from '../../hooks/useGetPriceData'
import useGetLocalProfile from '../../hooks/useGetLocalProfile'
import useAuth from '../../hooks/useAuth'
import links from './config'

// No-op function for theme toggle (dark mode only)
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const Menu: React.FC = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const priceData = useGetPriceData()
  const cakePriceUsd = priceData ? Number(priceData.stratis?.usd) : undefined
  const profile = useGetLocalProfile()

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      isDark
      toggleTheme={noop}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      profile={profile}
      {...props}
    />
  )
}

export default Menu
