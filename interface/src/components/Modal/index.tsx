import React, { useCallback, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { isMobile } from 'react-device-detect'

const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transition: opacity 150ms ease, visibility 150ms ease;
`

const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $minHeight?: number | false; $maxHeight?: number; $mobile: boolean; $visible: boolean }>`
  margin: 0 0 2rem 0;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background-color: ${({ theme }) => theme.colors.card};
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 0;
  width: 80%;
  overflow: hidden;
  align-self: ${({ $mobile }) => ($mobile ? 'flex-end' : 'center')};
  max-width: 420px;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(8px)')};
  transition: opacity 150ms ease, transform 150ms ease;

  ${({ $maxHeight }) =>
    $maxHeight &&
    css`
      max-height: ${$maxHeight}vh;
    `}
  ${({ $minHeight }) =>
    $minHeight &&
    css`
      min-height: ${$minHeight}vh;
    `}

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 65vw;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 85vw;
  }
`

interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number | false
  maxHeight?: number
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
}

export default function Modal({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 50,
  initialFocusRef,
  children,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Focus management
  useEffect(() => {
    if (isOpen) {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus()
      } else if (contentRef.current) {
        contentRef.current.focus()
      }
    }
  }, [isOpen, initialFocusRef])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return undefined
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onDismiss])

  // Prevent overlay click from propagating into content
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onDismiss()
    },
    [onDismiss]
  )

  if (!isOpen) return null

  return (
    <Overlay $visible={isOpen} onClick={handleOverlayClick}>
      <Content
        ref={contentRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="dialog"
        $minHeight={minHeight}
        $maxHeight={maxHeight}
        $mobile={isMobile}
        $visible={isOpen}
      >
        {children}
      </Content>
    </Overlay>
  )
}
