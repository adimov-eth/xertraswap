import styled from 'styled-components'

const Card = styled.div<any>`
  width: 100%;
  border-radius: 8px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border ?? `1px solid ${({ theme }: any) => theme.colors.borderColor}`};
  border-radius: ${({ borderRadius }) => borderRadius ?? '8px'};
  background-color: ${({ theme }) => theme.colors.card};
`
export default Card

export const LightCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background-color: ${({ theme }) => theme.colors.card};
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`
