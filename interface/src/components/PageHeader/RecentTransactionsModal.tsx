import React, { useContext, useMemo } from 'react'
import { CheckmarkCircleIcon, ErrorIcon, Flex, LinkExternal, Text, Modal, Button } from 'uikit'
import { getBscScanLink } from 'utils'
import { isTransactionOfType, isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import Loader from 'components/Loader'
import Web3AuthContext from '../../pages/Web3AuthContext'
import { TransactionActionPerformed } from '../../state/transactions/actions'
import { TableCell, TableHead, TableHeader, TableRow } from '../../uikit/components/Table/Table'

type RecentTransactionsModalProps = {
  onDismiss?: () => void
  translateString: (translationId: number, fallback: string) => string
  actionPerformed: TransactionActionPerformed
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => b.addedTime - a.addedTime

const getRowStatus = (sortedRecentTransaction: TransactionDetails) => {
  const { hash, receipt } = sortedRecentTransaction

  if (!hash) {
    return { icon: <Loader />, color: 'text' }
  }

  if (hash && receipt?.status === 1) {
    return { icon: <CheckmarkCircleIcon color="success" />, color: 'success' }
  }

  return { icon: <ErrorIcon color="failure" />, color: 'failure' }
}

const RecentTransactionsModal = ({ onDismiss = defaultOnDismiss, translateString, actionPerformed }: RecentTransactionsModalProps) => {
  const { account, chainId } = useContext(Web3AuthContext)
  const allTransactions = useAllTransactions()

  // Logic taken from Web3Status/index.tsx line 175
  const sortedTransactionsByType = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs
      .filter(isTransactionRecent)
      .filter(tx => isTransactionOfType(tx, actionPerformed))
      .sort(newTransactionsFirst)
  }, [allTransactions])

  return (
<Modal title={translateString(1202, 'Recent transactions')} onDismiss={onDismiss}>
    {!account && (
      <Flex justifyContent="center" flexDirection="column" alignItems="center">
        <Text mb="8px" $bold>
          Please connect your wallet to view your recent transactions
        </Text>
        <Button variant="tertiary" scale="sm" onClick={onDismiss}>
          Close
        </Button>
      </Flex>
    )}

    {account && chainId && sortedTransactionsByType.length === 0 && (
      <Flex justifyContent="center" flexDirection="column" alignItems="center">
        <Text mb="8px" $bold>
          No recent transactions
        </Text>
        <Button variant="tertiary" scale="sm" onClick={onDismiss}>
          Close
        </Button>
      </Flex>
    )}

    {account && chainId && sortedTransactionsByType.length > 0 && (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableHeader>#</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Summary</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Tx</TableHeader>
            </TableRow>
          </TableHead>

          <tbody>
            {sortedTransactionsByType.map((tx, index) => {
              const { hash, summary, from, actionPerformed } = tx
              const { icon, color } = getRowStatus(tx)

              return (
                <TableRow color="textSubtle" fontSize="14px" key={hash}>
                  <TableCell><Text>{index + 1}</Text></TableCell>
                  <TableCell><Text>{TransactionActionPerformed[actionPerformed]}</Text></TableCell>
                  <TableCell>{summary}</TableCell>
                  <TableCell style={{ color }} textAlign='center'>{icon}</TableCell>
                  <TableCell>
                    <LinkExternal
                      href={getBscScanLink(chainId, hash, 'transaction')}                    
                      $bold={false}
                    >
                      {hash.slice(0, 10) + '...'}
                    </LinkExternal>
                  </TableCell>
                </TableRow>
              )
            })}
          </tbody>
        </table>
      </div>
    )}
  </Modal>
  )
}

export default RecentTransactionsModal
