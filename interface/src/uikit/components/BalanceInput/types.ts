import { InputHTMLAttributes, ReactNode } from 'react'
import { BoxProps } from '../Box'

export interface BalanceInputProps extends BoxProps {
  value: string | number
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
  currencyValue?: ReactNode
  placeholder?: string
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'placeholder' | 'onChange'>
  isWarning?: boolean
}
