import styled from 'styled-components'
import { spaceStyles, blockProps, SPACE_PROP_NAMES, SpaceProps } from '../../util/styledProps'
import { styleVariants } from './themes'
import { ProgressProps, variants, Variant } from './types'

interface BarProps {
  primary?: boolean
}

export const Bar = styled.div<BarProps>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => (props.primary ? props.theme.colors.secondary : `${props.theme.colors.secondary}80`)};
  height: 16px;
  transition: width 200ms ease;
`

Bar.defaultProps = {
  primary: false,
}

interface StyledProgressProps extends SpaceProps {
  variant: ProgressProps['variant']
}

const getVariantStyles = ({ variant = variants.ROUND }: { variant?: Variant }) => {
  const s = styleVariants[variant] || styleVariants[variants.ROUND]
  return s.borderRadius ? `border-radius: ${s.borderRadius};` : ''
}

const StyledProgress = styled.div.withConfig({
  shouldForwardProp: blockProps(SPACE_PROP_NAMES, ['variant'] as const),
})<StyledProgressProps>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
  height: 16px;
  overflow: hidden;

  ${Bar} {
    border-top-left-radius: ${({ variant }) => (variant === variants.FLAT ? '0' : '32px')};
    border-bottom-left-radius: ${({ variant }) => (variant === variants.FLAT ? '0' : '32px')};
  }

  ${getVariantStyles}
  ${spaceStyles}
`

export default StyledProgress
