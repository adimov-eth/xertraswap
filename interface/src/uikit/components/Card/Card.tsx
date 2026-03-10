import StyledCard from './StyledCard'
import { CardProps } from './types'

function Card ({ ribbon, children, ...props }: CardProps) {
  return (
    <StyledCard {...props}>
      {ribbon}
      {children}
    </StyledCard>
  )
}
export default Card
