import styled from 'styled-components'
import { Text } from 'uikit'
import { Spinner } from '../Shared'
import { AutoColumn } from '../Column'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'

type ConfirmationPendingContentProps = { 
  pendingText: string;
  transactionStateText: string
}

const CustomLightSpinner = styled(Spinner)<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

const ConfirmationPendingContent = ({ pendingText, transactionStateText }: ConfirmationPendingContentProps) => {
  return (
    <Wrapper>
      <Section>
        <AutoColumn gap="12px" justify="center">
          <AutoColumn gap="12px" justify="center">
            <Text fontSize="18px">
              <strong>{pendingText}</strong>
            </Text>
          </AutoColumn>
        </AutoColumn>
        <ConfirmedIcon>
          <CustomLightSpinner src="/images/blue-loader.svg" alt="loader" size="90px" />
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify="center">
          <Text fontSize="16px">{transactionStateText}</Text>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default ConfirmationPendingContent
