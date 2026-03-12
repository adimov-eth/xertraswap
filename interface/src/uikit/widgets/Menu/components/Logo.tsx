import React from 'react'
import styled, { useTheme, css } from 'styled-components'
import { Link } from 'react-router-dom'
import { LogoIcon } from '../../../components/Svg'
import Flex from '../../../components/Box/Flex'
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from '../icons'
import { Button } from '../../../components/Button'

interface LogoProps {
  isPushed: boolean
  isDark: boolean
  togglePush: () => void
  href: string
}

const logoLinkStyles = css`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 156px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
`

const RouterLink = styled(Link)`
  ${logoLinkStyles}
`

const ExternalLink = styled.a`
  ${logoLinkStyles}
`

function Logo({ href, isDark, isPushed, togglePush }: LogoProps) {
  const isAbsoluteUrl = href.startsWith('http')
  const theme = useTheme()
  const innerLogo = (
    <>
      <LogoIcon className="mobile-icon" />
      <LogoWithText className="desktop-icon" isDark={isDark} />
    </>
  )

  return (
    <Flex>
      <Button aria-label="Toggle menu" onClick={togglePush} mr="24px" variant="text" style={{ padding: '0 8px', color: theme.colors.text }}>
        {isPushed ? (
          <HamburgerCloseIcon width="24px" color="textSubtle" />
        ) : (
          <HamburgerIcon width="24px" color="textSubtle" />
        )}
      </Button>
      {isAbsoluteUrl ? (
        <ExternalLink href={href} aria-label="Xertra home page">
          {innerLogo}
        </ExternalLink>
      ) : (
        <RouterLink to={href} aria-label="Xertra home page">
          {innerLogo}
        </RouterLink>
      )}
    </Flex>
  )
}

export default React.memo(Logo, (prev, next) => prev.isPushed === next.isPushed && prev.isDark === next.isDark)
