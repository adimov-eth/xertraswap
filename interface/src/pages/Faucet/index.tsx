import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { Button, Text, Heading } from 'uikit'
import Web3AuthContext from '../Web3AuthContext'
import AppBody from '../AppBody'

const FAUCET_ADDRESS = '0x474E5228faF0130CfA3c9657a46de3dFA46316C9'
const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID ?? '205205', 10)

const FAUCET_ABI = [
  'function claim() external',
  'function canClaim(address user) view returns (bool)',
  'function timeUntilNextClaim(address user) view returns (uint256)',
  'function tokenCount() view returns (uint256)',
  'function tokens(uint256 index) view returns (address token, uint256 amount)',
  'function nativeDripAmount() view returns (uint256)',
  'function cooldown() view returns (uint256)',
]

const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint256)',
]

const Wrapper = styled.div`
  width: 100%;
  max-width: 436px;
  padding: 24px;
`

const TokenRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`

const StatusBadge = styled.span<{ ready: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  background: ${({ ready }) => (ready ? '#2ecc71' : '#e74c3c')};
  color: white;
`

const InfoBox = styled.div`
  background: ${({ theme }) => theme.colors.input};
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
`

interface TokenDrip {
  address: string
  symbol: string
  amount: string
}

const Faucet: React.FC = () => {
  const { connection, account, library } = useContext(Web3AuthContext)
  const [canClaim, setCanClaim] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [tokenDrips, setTokenDrips] = useState<TokenDrip[]>([])
  const [nativeDrip, setNativeDrip] = useState('0')
  const [claiming, setClaiming] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [error, setError] = useState('')

  const isTestnet = CHAIN_ID === 205205

  const loadFaucetInfo = useCallback(async () => {
    try {
      const faucet = new ethers.Contract(FAUCET_ADDRESS, FAUCET_ABI, library)

      const nativeAmount = await faucet.nativeDripAmount()
      setNativeDrip(ethers.utils.formatEther(nativeAmount))

      const count = (await faucet.tokenCount()).toNumber()
      const drips: TokenDrip[] = []
      for (let i = 0; i < count; i++) {
        const [tokenAddr, amount] = await faucet.tokens(i)
        const token = new ethers.Contract(tokenAddr, TOKEN_ABI, library)
        const symbol = await token.symbol()
        drips.push({
          address: tokenAddr,
          symbol,
          amount: ethers.utils.formatEther(amount),
        })
      }
      setTokenDrips(drips)

      if (account) {
        const can = await faucet.canClaim(account)
        setCanClaim(can)
        if (!can) {
          const time = (await faucet.timeUntilNextClaim(account)).toNumber()
          setTimeLeft(time)
        }
      }
    } catch (e) {
      console.error('Failed to load faucet info:', e)
    }
  }, [library, account])

  useEffect(() => {
    loadFaucetInfo()
  }, [loadFaucetInfo])

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return undefined
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanClaim(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  const handleClaim = useCallback(async () => {
    if (connection.kind !== 'connected') return
    setClaiming(true)
    setError('')
    setTxHash('')
    try {
      const faucet = new ethers.Contract(FAUCET_ADDRESS, FAUCET_ABI, connection.signer)
      const tx = await faucet.claim()
      setTxHash(tx.hash)
      await tx.wait()
      setCanClaim(false)
      setTimeLeft(3600)
      loadFaucetInfo()
    } catch (e: any) {
      console.error('Claim failed:', e)
      setError(e?.reason || e?.message || 'Claim failed')
    } finally {
      setClaiming(false)
    }
  }, [connection, loadFaucetInfo])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}m ${s}s`
  }

  if (!isTestnet) {
    return (
      <AppBody>
        <Wrapper>
          <Heading mb="16px">Faucet</Heading>
          <Text>The faucet is only available on testnet.</Text>
        </Wrapper>
      </AppBody>
    )
  }

  return (
    <AppBody>
      <Wrapper>
        <Heading mb="8px">Testnet Faucet</Heading>
        <Text color="textSubtle" fontSize="14px" mb="16px">
          Get free test tokens to try Xertra Swap on Auroria testnet.
          One claim per hour.
        </Text>

        <InfoBox>
          <Text bold mb="8px">You will receive:</Text>
          <TokenRow>
            <Text>STRAX (native)</Text>
            <Text bold>{nativeDrip} STRAX</Text>
          </TokenRow>
          {tokenDrips.map((drip) => (
            <TokenRow key={drip.address}>
              <Text>{drip.symbol}</Text>
              <Text bold>{drip.amount} {drip.symbol}</Text>
            </TokenRow>
          ))}
        </InfoBox>

        {!account ? (
          <Text color="textSubtle" textAlign="center">
            Connect your wallet to use the faucet
          </Text>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <StatusBadge ready={canClaim}>
                {canClaim ? 'Ready to claim' : `Next claim in ${formatTime(timeLeft)}`}
              </StatusBadge>
            </div>

            <Button
              width="100%"
              onClick={handleClaim}
              disabled={!canClaim || claiming}
              isLoading={claiming}
            >
              {claiming ? 'Claiming...' : 'Claim Tokens'}
            </Button>

            {txHash && (
              <Text fontSize="14px" mt="12px" textAlign="center" color="primary">
                <a
                  href={`https://auroria.explorer.xertra.com/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit' }}
                >
                  View transaction ↗
                </a>
              </Text>
            )}

            {error && (
              <Text fontSize="14px" mt="12px" textAlign="center" color="failure">
                {error}
              </Text>
            )}
          </>
        )}
      </Wrapper>
    </AppBody>
  )
}

export default Faucet
