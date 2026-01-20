import styled from 'styled-components'

const Pane = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 8px;
  padding: 16px;
`

export default Pane
