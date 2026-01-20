/**
 * CSS Custom Properties (Variables) Override Layer
 *
 * These CSS variables provide runtime overrides for uikit components
 * that may use hardcoded values or don't properly read from the theme.
 *
 * Strategy:
 * 1. Define all design tokens as CSS variables on :root
 * 2. Use these variables in styled-components throughout the interface
 * 3. Some uikit components may pick these up if they use CSS variables internally
 */

import { createGlobalStyle } from 'styled-components'
import {
  colors,
  buttonColors,
  typography,
  radii,
  shadows,
  transitions,
} from '../theme/xertra-design-tokens'

const CSSVariables = createGlobalStyle`
  :root {
    /* =========================================================================
       COLORS - Backgrounds
       ========================================================================= */
    --xertra-bg: ${colors.background};
    --xertra-bg-card: ${colors.card};
    --xertra-bg-dropdown: ${colors.dropdown};
    --xertra-bg-input: ${colors.input};
    --xertra-bg-input-secondary: ${colors.inputSecondary};
    --xertra-bg-disabled: ${colors.backgroundDisabled};
    --xertra-bg-tertiary: ${colors.tertiary};

    /* =========================================================================
       COLORS - Text
       ========================================================================= */
    --xertra-text: ${colors.text};
    --xertra-text-subtle: ${colors.textSubtle};
    --xertra-text-disabled: ${colors.textDisabled};
    --xertra-text-muted: ${colors.textMuted};

    /* =========================================================================
       COLORS - Primary/Accent
       ========================================================================= */
    --xertra-primary: ${colors.primary};
    --xertra-primary-bright: ${colors.primaryBright};
    --xertra-primary-dark: ${colors.primaryDark};
    --xertra-secondary: ${colors.secondary};

    /* =========================================================================
       COLORS - Status
       ========================================================================= */
    --xertra-success: ${colors.success};
    --xertra-failure: ${colors.failure};
    --xertra-warning: ${colors.warning};

    /* =========================================================================
       COLORS - Borders
       ========================================================================= */
    --xertra-border: ${colors.borderColor};
    --xertra-border-light: ${colors.borderColorLight};
    --xertra-border-hover: ${colors.borderColorHover};

    /* =========================================================================
       COLORS - Contrast
       ========================================================================= */
    --xertra-contrast: ${colors.contrast};
    --xertra-inverted-contrast: ${colors.invertedContrast};

    /* =========================================================================
       BUTTON COLORS
       ========================================================================= */
    --xertra-btn-primary-bg: ${buttonColors.primaryBg};
    --xertra-btn-primary-text: ${buttonColors.primaryText};
    --xertra-btn-primary-hover: ${buttonColors.primaryHoverBg};

    --xertra-btn-secondary-bg: ${buttonColors.secondaryBg};
    --xertra-btn-secondary-text: ${buttonColors.secondaryText};
    --xertra-btn-secondary-border: ${buttonColors.secondaryBorder};
    --xertra-btn-secondary-hover: ${buttonColors.secondaryHoverBg};

    --xertra-btn-action-bg: ${buttonColors.actionBg};
    --xertra-btn-action-text: ${buttonColors.actionText};
    --xertra-btn-action-hover: ${buttonColors.actionHoverBg};

    --xertra-btn-danger-bg: ${buttonColors.dangerBg};
    --xertra-btn-danger-text: ${buttonColors.dangerText};

    --xertra-btn-success-bg: ${buttonColors.successBg};
    --xertra-btn-success-text: ${buttonColors.successText};

    --xertra-btn-disabled-bg: ${buttonColors.disabledBg};
    --xertra-btn-disabled-text: ${buttonColors.disabledText};

    /* =========================================================================
       TYPOGRAPHY
       ========================================================================= */
    --xertra-font-family: ${typography.fontFamily};
    --xertra-font-weight-light: ${typography.fontWeightLight};
    --xertra-font-weight-regular: ${typography.fontWeightRegular};
    --xertra-font-weight-medium: ${typography.fontWeightMedium};
    --xertra-font-weight-semibold: ${typography.fontWeightSemiBold};
    --xertra-font-weight-bold: ${typography.fontWeightBold};

    /* Font sizes */
    --xertra-font-size-xs: ${typography.fontSize.xs};
    --xertra-font-size-sm: ${typography.fontSize.sm};
    --xertra-font-size-base: ${typography.fontSize.base};
    --xertra-font-size-lg: ${typography.fontSize.lg};
    --xertra-font-size-xl: ${typography.fontSize.xl};
    --xertra-font-size-2xl: ${typography.fontSize['2xl']};
    --xertra-font-size-3xl: ${typography.fontSize['3xl']};
    --xertra-font-size-4xl: ${typography.fontSize['4xl']};

    /* Line heights */
    --xertra-line-height-tight: ${typography.lineHeight.tight};
    --xertra-line-height-normal: ${typography.lineHeight.normal};
    --xertra-line-height-relaxed: ${typography.lineHeight.relaxed};

    /* =========================================================================
       BORDER RADIUS
       ========================================================================= */
    --xertra-radius-sm: ${radii.small};
    --xertra-radius: ${radii.default};
    --xertra-radius-md: ${radii.medium};
    --xertra-radius-lg: ${radii.large};
    --xertra-radius-xl: ${radii.xl};
    --xertra-radius-card: ${radii.card};
    --xertra-radius-button: ${radii.button};
    --xertra-radius-input: ${radii.input};
    --xertra-radius-circle: ${radii.circle};

    /* =========================================================================
       SHADOWS
       ========================================================================= */
    --xertra-shadow-level1: ${shadows.level1};
    --xertra-shadow-active: ${shadows.active};
    --xertra-shadow-focus: ${shadows.focus};
    --xertra-shadow-inset: ${shadows.inset};
    --xertra-shadow-card: ${shadows.card};

    /* =========================================================================
       TRANSITIONS
       ========================================================================= */
    --xertra-transition-fast: ${transitions.fast};
    --xertra-transition-normal: ${transitions.normal};
    --xertra-transition-slow: ${transitions.slow};
  }

  /* ===========================================================================
     GLOBAL OVERRIDES FOR UIKIT COMPONENTS
     These target uikit internals that may use hardcoded values
     =========================================================================== */

  /* Button overrides - target styled-components button classes */
  button[class*="Button"] {
    border-radius: var(--xertra-radius-button) !important;
    transition: var(--xertra-transition-fast) !important;
  }

  /* Card overrides */
  div[class*="Card"] {
    border-radius: var(--xertra-radius-card) !important;
    border: 1px solid var(--xertra-border) !important;
  }

  /* Input overrides */
  input[class*="Input"],
  input:not([type="checkbox"]):not([type="radio"]) {
    border-radius: var(--xertra-radius-input) !important;
  }

  /* Modal backdrop */
  div[class*="ModalWrapper"],
  div[class*="StyledModal"] {
    border-radius: var(--xertra-radius-card) !important;
  }

  /* Remove legacy purple tints from backgrounds */
  body {
    background-color: var(--xertra-bg) !important;
  }

  /* Override Kanit font to Inter */
  * {
    font-family: var(--xertra-font-family) !important;
  }

  /* Heading font-family override */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--xertra-font-family) !important;
  }
`

export default CSSVariables
