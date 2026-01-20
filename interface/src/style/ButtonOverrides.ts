/**
 * Button Style Overrides
 *
 * Overrides for uikit Button component to match xertra.com design.
 *
 * Button variants in uikit:
 * - PRIMARY: Main action buttons (was cyan, now light bg with dark text)
 * - SECONDARY: Ghost/outline style
 * - TERTIARY: Subtle background
 * - TEXT: Text-only button (was cyan text, now purple)
 * - DANGER: Error/destructive actions
 * - SUBTLE: Muted background
 * - SUCCESS: Success state
 */

import { createGlobalStyle } from 'styled-components'

const ButtonOverrides = createGlobalStyle`
  /* ===========================================================================
     PRIMARY BUTTONS - Light background, dark text (xertra.com style)
     =========================================================================== */
  button[variant="primary"],
  button[class*="Button"][class*="primary"] {
    background-color: #F1F5F9 !important;
    color: #101112 !important;
    border-radius: 4.8px !important;
    border: none !important;
    font-weight: 500 !important;
    transition: all 150ms ease-in-out !important;

    &:hover:not(:disabled) {
      background-color: #E2E8F0 !important;
      opacity: 1 !important;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.isDark ? '#2A2C2E' : '#E5E7EB'} !important;
      color: ${({ theme }) => theme.isDark ? '#6D6D6D' : '#9CA3AF'} !important;
      cursor: not-allowed !important;
      opacity: 0.7 !important;
    }
  }

  /* ===========================================================================
     TEXT BUTTONS - Purple text (for MAX button, etc.)
     =========================================================================== */
  button[variant="text"],
  button[class*="Button"][class*="text"] {
    color: ${({ theme }) => theme.colors.primary} !important;
    background-color: transparent !important;
    border: none !important;
    font-weight: 600 !important;

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.primaryBright} !important;
      opacity: 1 !important;
      background-color: transparent !important;
    }
  }

  /* ===========================================================================
     SECONDARY BUTTONS - Ghost style with border
     =========================================================================== */
  button[variant="secondary"],
  button[class*="Button"][class*="secondary"] {
    background-color: transparent !important;
    color: ${({ theme }) => theme.colors.text} !important;
    border: 1px solid ${({ theme }) => theme.colors.borderColor} !important;
    border-radius: 4.8px !important;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'} !important;
      border-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'} !important;
    }

    &:disabled {
      background-color: transparent !important;
      color: ${({ theme }) => theme.colors.textDisabled} !important;
      border-color: ${({ theme }) => theme.colors.borderColor} !important;
      opacity: 0.6 !important;
      cursor: not-allowed !important;
    }
  }

  /* ===========================================================================
     TERTIARY BUTTONS
     =========================================================================== */
  button[variant="tertiary"],
  button[class*="Button"][class*="tertiary"] {
    background-color: ${({ theme }) => theme.colors.tertiary} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    border-radius: 4.8px !important;
    border: none !important;
  }

  /* ===========================================================================
     DANGER BUTTONS
     =========================================================================== */
  button[variant="danger"],
  button[class*="Button"][class*="danger"] {
    background-color: ${({ theme }) => theme.colors.failure} !important;
    color: white !important;
    border-radius: 4.8px !important;
    border: none !important;
  }

  /* ===========================================================================
     SUBTLE BUTTONS
     =========================================================================== */
  button[variant="subtle"],
  button[class*="Button"][class*="subtle"] {
    background-color: ${({ theme }) => theme.colors.tertiary} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    border-radius: 4.8px !important;
    border: none !important;
  }

  /* ===========================================================================
     SUCCESS BUTTONS
     =========================================================================== */
  button[variant="success"],
  button[class*="Button"][class*="success"] {
    background-color: ${({ theme }) => theme.colors.success} !important;
    color: #101112 !important;
    border-radius: 4.8px !important;
    border: none !important;
  }

  /* ===========================================================================
     BUTTON MENU / TAB BUTTONS
     =========================================================================== */
  /* Active tab button */
  button[class*="ButtonMenuItem"][class*="active"],
  [class*="ButtonMenu"] button:first-child {
    background-color: ${({ theme }) => theme.colors.primary} !important;
    color: #101112 !important;
    border-radius: 4.8px !important;
  }

  /* Inactive tab buttons */
  [class*="ButtonMenu"] button:not(:first-child) {
    background-color: transparent !important;
    color: ${({ theme }) => theme.colors.textSubtle} !important;

    &:hover {
      color: ${({ theme }) => theme.colors.text} !important;
    }
  }

  /* ===========================================================================
     ICON BUTTONS
     =========================================================================== */
  button[class*="IconButton"] {
    border-radius: 8px !important;
    transition: all 150ms ease-in-out !important;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'} !important;
    }
  }

  /* ===========================================================================
     SCALE ADJUSTMENTS
     =========================================================================== */
  /* Ensure all button sizes have correct radius */
  button[scale="sm"] {
    border-radius: 4.8px !important;
  }

  button[scale="md"] {
    border-radius: 4.8px !important;
  }

  button[scale="xs"] {
    border-radius: 4px !important;
  }

  /* ===========================================================================
     WALLET CONNECT BUTTON (special handling)
     =========================================================================== */
  button[class*="wallet"],
  button[class*="Wallet"],
  button[class*="connect"] {
    border-radius: 4.8px !important;
    border: 1px solid ${({ theme }) => theme.colors.borderColor} !important;
    background-color: transparent !important;
    color: ${({ theme }) => theme.colors.text} !important;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'} !important;
    }
  }
`

export default ButtonOverrides
