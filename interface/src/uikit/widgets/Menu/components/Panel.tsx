import styled from 'styled-components'
import PanelBody from './PanelBody'
import PanelFooter from './PanelFooter'
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from '../config'
import { LangType, MenuEntry, PushedProps } from '../types'

interface Props extends PushedProps {
  showMenu: boolean
  isMobile: boolean
  links: Array<MenuEntry>
  cakePriceUsd?: number
  isDark: boolean
  toggleTheme: (isDark: boolean) => void
  langs: LangType[]
  setLang: (lang: LangType) => void
  currentLang: string
}

const StyledPanel = styled.div
.withConfig({ shouldForwardProp: (prop) => !['isPushed', 'showMenu'].includes(prop) })
<{ isPushed: boolean; showMenu: boolean }>`
  position: fixed;
  padding-top: ${({ showMenu }) => (showMenu ? '80px' : 0)};
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.nav.background};
  width: ${({ isPushed }) => (isPushed ? `${SIDEBAR_WIDTH_FULL}px` : 0)};
  height: 100vh;
  transition: padding-top 0.2s, width 0.2s;
  border-right: ${({ isPushed }) => (isPushed ? '2px solid rgba(133, 133, 133, 0.1)' : 0)};
  z-index: 11;
  overflow: ${({ isPushed }) => (isPushed ? 'initial' : 'hidden')};
  transform: translate3d(0, 0, 0);

  ${({ theme }) => theme.mediaQueries.nav} {
    z-index: initial;
    border-right: 2px solid rgba(133, 133, 133, 0.1);
    width: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
  }
`

function Panel({
  isPushed,
  showMenu,
  pushNav,
  links,
  isMobile,
  cakePriceUsd,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
}: Props) {
  return (
    <StyledPanel
      isPushed={isPushed}
      showMenu={showMenu}
      data-panel-dark={isDark ? '1' : '0'}
      data-panel-theme-toggle='1'
      data-panel-langs={langs.length}
      data-panel-current-lang={currentLang}
      data-panel-has-set-lang='1'
    >
      <PanelBody isPushed={isPushed} pushNav={pushNav} isMobile={isMobile} links={links} />
      <PanelFooter isPushed={isPushed} pushNav={pushNav} cakePriceUsd={cakePriceUsd} />
    </StyledPanel>
  )
}

export default Panel
