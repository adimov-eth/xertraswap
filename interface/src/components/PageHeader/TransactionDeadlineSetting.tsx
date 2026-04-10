import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input, Text, Flex, Box } from 'uikit'
import { useUserDeadline } from 'state/user/hooks'
import QuestionHelper from '../QuestionHelper'

const Field = styled.div`
  align-items: center;
  display: inline-flex;

  & > ${Input} {
    max-width: 100px;
  }
`

type TransactionDeadlineSettingModalProps = {
  translateString: (translationId: number, fallback: string) => string
}

const TransactionDeadlineSetting = ({ translateString }: TransactionDeadlineSettingModalProps) => {
  const [deadline, setDeadline] = useUserDeadline()
  const [valueMins, setValueMins] = useState(deadline / 60) // deadline in minutes
  const [error, setError] = useState<string | null>(null)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValueMins(parseInt(inputValue, 10))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      
      if(Number.isNaN(valueMins))
      {
        setError(translateString(1150, 'Enter a valid deadline'))
        return;
      }

      if (valueMins > 0 && valueMins <= 20) {
        setDeadline(valueMins * 60) // Set value in seconds
        setError(null)
        return;
      }

      if(valueMins < 1)
      {
        setError(translateString(1150, 'A minimum value of 1 is required.'))
        return;
      }

      if(valueMins > 20)
      {
        setValueMins(20)  
        setDeadline(20 * 60) // Set value in seconds        
        return;
      }

    } catch {
      setError(translateString(1150, 'Enter a valid deadline'))
    }
  }, [valueMins, setError, setDeadline, translateString])

  return (
    <Box mb="16px">
      <Flex alignItems="center" mb="8px">
        <Text $bold>{translateString(90, 'Transaction deadline')}</Text>
        <QuestionHelper
          text={translateString(188, 'Your transaction will revert if it is pending for more than the during specified. A maximum of 20 minutes is allowed.')}
        />
      </Flex>
      <Field>
        <Input type="number" step="1" min={"1"} max={"20"} value={valueMins} onChange={handleChange} />
        <Text fontSize="14px" ml="8px">
          Minutes
        </Text>
      </Field>
      {error && (
        <Text mt="8px" color="failure">
          {error}
        </Text>
      )}
    </Box>
  )
}

export default TransactionDeadlineSetting
