import React, { cloneElement, ReactElement } from 'react'
import styled from 'styled-components'
import Flex from '../Box/Flex'
import { TabMenuProps, TabProps } from './types'

const Wrapper = styled(Flex)`
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

const Inner = styled(Flex)`
  justify-content: space-between;
  flex-grow: 1;

  & > button + button {
    margin-left: 4px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-grow: 0;
  }
`

function ButtonMenu({ activeIndex = 0, onItemClick, children }: TabMenuProps) {
  return (
    <Wrapper p="0 16px">
      <Inner>
        {(children as ReactElement<TabProps>[]).map((child, index) => {
          return cloneElement(child, {
            isActive: activeIndex === index,
            onClick: onItemClick ? () => onItemClick(index) : undefined,
          })
        })}
      </Inner>
    </Wrapper>
  )
}

export default ButtonMenu
