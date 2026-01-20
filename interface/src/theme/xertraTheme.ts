/**
 * Xertra Custom Theme
 *
 * Implements XertraTheme interface with xertra.com design language.
 * This theme completely replaces the default PancakeSwap themes.
 */

// eslint-disable-next-line import/no-unresolved
import { XertraTheme } from '@xertra/uikit/dist/theme'
import {
  colors,
  radii,
  shadows,
  zIndices,
  breakpoints,
  mediaQueries,
  gradients,
} from './xertra-design-tokens'

// =============================================================================
// DARK THEME COLORS (Primary theme for Xertra)
// =============================================================================

const xertraDarkColors = {
  // Primary colors
  primary: colors.primary, // #BDBDFF - Purple accent
  primaryBright: colors.primaryBright,
  primaryDark: colors.primaryDark,

  // Secondary
  secondary: colors.secondary, // #7168C0 - Action button purple

  // Tertiary
  tertiary: colors.tertiary,

  // Status
  success: colors.success,
  failure: colors.failure,
  warning: colors.warning,

  // Contrast
  contrast: colors.contrast,
  invertedContrast: colors.invertedContrast,

  // Backgrounds
  background: colors.background, // #101112
  backgroundDisabled: colors.backgroundDisabled,
  dropdown: colors.dropdown,
  input: colors.input,
  inputSecondary: colors.inputSecondary,

  // Text
  text: colors.text, // rgba(255, 255, 255, 0.8)
  textDisabled: colors.textDisabled,
  textSubtle: colors.textSubtle,

  // Cards & Borders
  borderColor: colors.borderColor,
  card: colors.card, // #1A1C1D

  // Gradients
  gradients: {
    bubblegum: gradients.bubblegum,
  },

  // Legacy - kept for compatibility
  binance: colors.binance,
}

// =============================================================================
// LIGHT THEME COLORS (For potential light mode support)
// =============================================================================

const xertraLightColors = {
  // Primary colors
  primary: '#7168C0', // Darker purple for light mode
  primaryBright: '#8A82D0',
  primaryDark: '#5A52A0',

  // Secondary
  secondary: '#BDBDFF',

  // Tertiary
  tertiary: '#F1F5F9',

  // Status
  success: '#22C55E',
  failure: '#EF4444',
  warning: '#F59E0B',

  // Contrast
  contrast: '#101112',
  invertedContrast: '#FFFFFF',

  // Backgrounds
  background: '#FAFAFA',
  backgroundDisabled: '#E5E7EB',
  dropdown: '#FFFFFF',
  input: '#F3F4F6',
  inputSecondary: '#E5E7EB',

  // Text
  text: 'rgba(16, 17, 18, 0.9)',
  textDisabled: '#9CA3AF',
  textSubtle: 'rgba(16, 17, 18, 0.6)',

  // Cards & Borders
  borderColor: 'rgba(0, 0, 0, 0.1)',
  card: '#FFFFFF',

  // Gradients
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #FFFFFF 0%, #F8FAFC 100%)',
  },

  // Legacy
  binance: '#F0B90B',
}

// =============================================================================
// COMPONENT THEMES
// =============================================================================

// Card Theme
const cardThemeDark = {
  background: colors.card,
  boxShadow: shadows.level1,
  boxShadowActive: shadows.active,
  boxShadowSuccess: shadows.success,
  boxShadowWarning: shadows.warning,
  cardHeaderBackground: {
    default: 'linear-gradient(139.73deg, #1A1C1D 0%, #252729 100%)',
    blue: 'linear-gradient(180deg, #1A1C1D 0%, #252729 100%)',
    violet: 'linear-gradient(180deg, #2A2C2E 0%, #1A1C1D 100%)',
  },
  dropShadow: 'drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.15))',
}

const cardThemeLight = {
  background: '#FFFFFF',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
  boxShadowActive: '0px 0px 0px 2px rgba(113, 104, 192, 0.3)',
  boxShadowSuccess: '0px 0px 0px 2px rgba(34, 197, 94, 0.3)',
  boxShadowWarning: '0px 0px 0px 2px rgba(245, 158, 11, 0.3)',
  cardHeaderBackground: {
    default: 'linear-gradient(139.73deg, #FFFFFF 0%, #F8FAFC 100%)',
    blue: 'linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 100%)',
    violet: 'linear-gradient(180deg, #F5F3FF 0%, #EDE9FE 100%)',
  },
  dropShadow: 'drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.06))',
}

// Nav Theme
const navThemeDark = {
  background: colors.card,
  hover: 'rgba(255, 255, 255, 0.05)',
}

const navThemeLight = {
  background: '#FFFFFF',
  hover: 'rgba(0, 0, 0, 0.04)',
}

// Modal Theme
const modalThemeDark = {
  background: colors.card,
}

const modalThemeLight = {
  background: '#FFFFFF',
}

// Alert Theme
const alertThemeDark = {
  background: colors.card,
}

const alertThemeLight = {
  background: '#FFFFFF',
}

// Toggle Theme
const toggleThemeDark = {
  handleBackground: colors.card,
}

const toggleThemeLight = {
  handleBackground: '#FFFFFF',
}

// XertraToggle Theme
const xertraToggleThemeDark = {
  handleBackground: colors.card,
  handleShadow: colors.textDisabled,
}

const xertraToggleThemeLight = {
  handleBackground: '#FFFFFF',
  handleShadow: '#D1D5DB',
}

// Radio Theme
const radioThemeDark = {
  handleBackground: colors.card,
}

const radioThemeLight = {
  handleBackground: '#FFFFFF',
}

// Tooltip Theme
const tooltipThemeDark = {
  background: colors.card,
  text: colors.text,
  boxShadow: shadows.level1,
}

const tooltipThemeLight = {
  background: '#101112',
  text: '#FFFFFF',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
}

// =============================================================================
// BASE THEME (shared between light and dark)
// =============================================================================

const baseTheme = {
  siteWidth: 1200,
  breakpoints: Object.values(breakpoints),
  mediaQueries,
  spacing: [0, 4, 8, 16, 24, 32, 48, 64],
  shadows: {
    level1: shadows.level1,
    active: shadows.active,
    success: shadows.success,
    warning: shadows.warning,
    focus: shadows.focus,
    inset: shadows.inset,
  },
  radii: {
    small: radii.small,
    default: radii.default,
    card: radii.card,
    circle: radii.circle,
  },
  zIndices: {
    dropdown: zIndices.dropdown,
    modal: zIndices.modal,
  },
}

// =============================================================================
// EXPORTED THEMES
// =============================================================================

export const xertraDark: XertraTheme = {
  ...baseTheme,
  isDark: true,
  colors: xertraDarkColors,
  card: cardThemeDark,
  nav: navThemeDark,
  modal: modalThemeDark,
  alert: alertThemeDark,
  toggle: toggleThemeDark,
  xertraToggle: xertraToggleThemeDark,
  pancakeToggle: xertraToggleThemeDark, // Backwards compatibility
  radio: radioThemeDark,
  tooltip: tooltipThemeDark,
}

export const xertraLight: XertraTheme = {
  ...baseTheme,
  isDark: false,
  colors: xertraLightColors,
  card: cardThemeLight,
  nav: navThemeLight,
  modal: modalThemeLight,
  alert: alertThemeLight,
  toggle: toggleThemeLight,
  xertraToggle: xertraToggleThemeLight,
  pancakeToggle: xertraToggleThemeLight, // Backwards compatibility
  radio: radioThemeLight,
  tooltip: tooltipThemeLight,
}

// Default export for convenience
export default xertraDark
