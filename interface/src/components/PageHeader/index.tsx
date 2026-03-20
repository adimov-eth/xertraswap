import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Heading, IconButton, Text, Flex, useModal, TuneIcon, HistoryIcon } from 'uikit'
import useI18n from 'hooks/useI18n'
import SettingsModal from './SettingsModal'
import RecentTransactionsModal from './RecentTransactionsModal'
import { TransactionActionPerformed } from '../../state/transactions/actions'
import { Handler } from '../../uikit/widgets/Modal/types'

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  modal? : Handler
}

const StyledPageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`

const Details = styled.div`
  flex: 1;
`

export const PoolPageHeader = ({ title, description, children }: PageHeaderProps) => {
  const TranslateString = useI18n()
  const [onPresentRecentTransactions] = useModal(<RecentTransactionsModal actionPerformed={TransactionActionPerformed.Liquidity} translateString={TranslateString} />)
  return (<PageHeader title={title} description={description} children={children} modal={onPresentRecentTransactions}/>)
}

export const SwapPageHeader = ({ title, description, children }: PageHeaderProps) => {
  const TranslateString = useI18n()
  const [onPresentRecentTransactions] = useModal(<RecentTransactionsModal actionPerformed={TransactionActionPerformed.Swap} translateString={TranslateString} />)
  return (<PageHeader title={title} description={description} children={children} modal={onPresentRecentTransactions}/>)
}

const PageHeader = ({ title, description, children, modal }: PageHeaderProps) => {
  const TranslateString = useI18n()
  const [onPresentSettings] = useModal(<SettingsModal translateString={TranslateString} />)

  return (
    <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <Heading mb="8px">{title}</Heading>
          {description && (
            <Text color="textSubtle" fontSize="14px">
              {description}
            </Text>
          )}
        </Details>
        <IconButton variant="text" onClick={onPresentSettings} title={TranslateString(1200, 'Settings')}>
          <TuneIcon width="24px" color="currentColor" />
        </IconButton>
        <IconButton
          variant="text"
          onClick={modal}
          title={TranslateString(1202, 'Recent transactions')}
        >
          <HistoryIcon width="24px" color="currentColor" />
        </IconButton>
      </Flex>
      {children && <Text mt="16px">{children}</Text>}
    </StyledPageHeader>
  )
}

export default PageHeader
