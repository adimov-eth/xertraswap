import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Credentials, StringTranslations } from '@crowdin/crowdin-api-client'
import { LangType } from 'uikit'
import Popups from '../components/Popups'
import Web3AuthManager from '../components/Web3ReactManager'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './AddLiquidity/redirects'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import AddLiquidity from './AddLiquidity'
import Pool from './Pool'
import Pools from './Pools'
import PoolDetails from './PoolDetails'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import Swap from './Swap'
import { RedirectPathToSwapOnly } from './Swap/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
import Menu from '../components/Menu'
import useGetDocumentTitlePrice from '../hooks/useGetDocumentTitlePrice'
import Web3AuthContext from './Web3AuthContext'
import { Web3Provider } from '@ethersproject/providers'
import ToastListener from '../components/ToastListener'

import ApplicationUpdater from '../state/application/updater'
import ListsUpdater from '../state/lists/updater'
import MulticallUpdater from '../state/multicall/updater'
import TransactionUpdater from '../state/transactions/updater'
import { ToastContainer } from 'react-toastify'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: bottom 24px center;
  background-size: 90%;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
   
    background-repeat: no-repeat;
    background-position: center 420px, 10% 230px, 90% 230px;
    background-size: contain, 266px, 266px;
    min-height: 90vh;
  }
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const CACHE_KEY = 'xertraLanguage'

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])
  const apiKey = `${process.env.REACT_APP_CROWDIN_APIKEY}`
  const projectId = parseInt(`${process.env.REACT_APP_CROWDIN_PROJECTID}`)
  const fileId = 6

  const credentials: Credentials = {
    token: apiKey,
  }

  const stringTranslationsApi = new StringTranslations(credentials)

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

  useEffect(() => {
    const storedLangCode = localStorage.getItem(CACHE_KEY)
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  const fetchTranslationsForSelectedLanguage = async () => {
    // Skip Crowdin API if credentials not configured
    if (!apiKey || apiKey === 'undefined' || !projectId || Number.isNaN(projectId)) {
      setTranslations([])
      setTranslatedLanguage(selectedLanguage)
      return
    }

    stringTranslationsApi
      .listLanguageTranslations(projectId, selectedLanguage.code, undefined, fileId, 200)
      .then((translationApiResponse) => {
        if (translationApiResponse.data.length < 1) {
          setTranslations(['error'])
        } else {
          setTranslations(translationApiResponse.data)
        }
      })
      .then(() => setTranslatedLanguage(selectedLanguage))
      .catch(() => {
        setTranslations(['error'])
        // Silently handle missing Crowdin credentials
        if (process.env.NODE_ENV === 'development') {
          console.info('Crowdin translations not configured - using defaults')
        }
      })
  }

  useEffect(() => {
    if (selectedLanguage) {
      fetchTranslationsForSelectedLanguage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage])

  const handleLanguageSelect = (langObject: LangType) => {
    setSelectedLanguage(langObject)
    localStorage.setItem(CACHE_KEY, langObject.code)
  }

  useGetDocumentTitlePrice()

  const [account, setAccount] = useState<string | undefined>()
  const [chainId, setChainId] = useState<number | undefined>(parseInt(process.env.REACT_APP_CHAIN_ID ?? '105105', 10))
  const [library, setProvider] = useState<Web3Provider | undefined>()

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <ToastContainer />
          <LanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage: handleLanguageSelect, translatedLanguage, setTranslatedLanguage }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>              

              <Web3AuthContext.Provider value={{account, setAccount, chainId, setChainId, library, setProvider}}>

                <ListsUpdater />
                <ApplicationUpdater />
                <TransactionUpdater />
                <MulticallUpdater />
                <ToastListener />

                <Web3AuthManager>
                  <Menu>
                    <BodyWrapper>
                      <Popups />
                        <Switch>
                          <Route exact strict path="/" component={Swap} />
                          <Route exact strict path="/swap" component={Swap} />
                          <Route exact strict path="/find" component={PoolFinder} />
                          <Route exact strict path="/pool" component={Pool} />
                          <Route exact strict path="/pools" component={Pools} />
                          <Route exact strict path="/pool/:currencyIdA/:currencyIdB" component={PoolDetails} />
                          <Route exact path="/add" component={AddLiquidity} />
                          <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

                          {/* Redirection: These old routes are still used in the code base */}
                          <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                          <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                          <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />

                          <Route component={RedirectPathToSwapOnly} />
                        </Switch>
                      <Marginer />
                    </BodyWrapper>
                  </Menu>
                </Web3AuthManager>
              </Web3AuthContext.Provider>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
