import { useContext, useState } from 'react'
import styled from 'styled-components'
import { AlertTriangle } from 'react-feather'
import { Button, Text } from 'uikit'
import { getCurrentChainId } from 'config/chains'
import useWeb3Auth from '../../hooks/useWeb3Auth'
import Web3AuthContext from '../../pages/Web3AuthContext'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.failure};
  background: rgba(237, 75, 158, 0.08);
`

const Content = styled.div`
  flex: 1;
`

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
`

export default function WrongNetworkBanner() {
  const { chainId, isWrongNetwork, expectedChainId } = useContext(Web3AuthContext)
  const { logout, switchToExpectedChain } = useWeb3Auth()
  const [isSwitching, setIsSwitching] = useState(false)
  const targetChainId = expectedChainId ?? getCurrentChainId()

  if (!isWrongNetwork) {
    return null
  }

  return (
    <Container>
      <AlertTriangle size={18} />
      <Content>
        <Text $bold color="failure" mb="4px">
          Wrong network
        </Text>
        <Text fontSize="14px" color="textSubtle">
          Connected to chain {chainId}. Switch to chain {targetChainId} to continue.
        </Text>
        <Actions>
          <Button
            scale="sm"
            variant="danger"
            isLoading={isSwitching}
            onClick={() => {
              setIsSwitching(true)
              switchToExpectedChain(targetChainId).finally(() => setIsSwitching(false))
            }}
          >
            Switch network
          </Button>
          <Button scale="sm" variant="secondary" onClick={logout}>
            Disconnect
          </Button>
        </Actions>
      </Content>
    </Container>
  )
}
