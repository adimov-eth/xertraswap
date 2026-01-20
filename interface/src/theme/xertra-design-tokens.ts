/**
 * Xertra Design Tokens
 * Extracted from xertra.com - January 2025
 *
 * Design System Delta from PancakeSwap:
 * - Font: Kanit → Inter
 * - Body BG: #100C18 (purple-tinted) → #101112 (neutral dark)
 * - Text: #EAE2FC (lavender) → rgba(255,255,255,0.8)
 * - Accent: #1FC7D4 (cyan) → #BDBDFF (purple)
 * - Card BG: #0F172A (slate) → #1A1C1D
 * - Border Radius: 16-20px → 4.8-8px
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

export const colors = {
  // Backgrounds
  background: '#101112', // rgb(16, 17, 18) - Body background
  card: '#1A1C1D', // rgb(26, 28, 29) - Card backgrounds
  dropdown: '#1A1C1D', // Same as card for dropdowns
  input: '#1A1C1D', // Input backgrounds
  inputSecondary: '#252729', // Slightly lighter input variant

  // Text
  text: 'rgba(255, 255, 255, 0.8)', // Primary text
  textSubtle: 'rgba(255, 255, 255, 0.6)', // Secondary/muted text
  textDisabled: '#6D6D6D', // rgb(109, 109, 109) - Disabled text
  textMuted: '#6D6D6D', // Alias for disabled

  // Primary/Accent - deeper purple to match xertra.com buttons
  primary: '#7168C0', // rgb(113, 104, 192) - Purple accent
  primaryBright: '#8A7FD4', // Lighter purple
  primaryDark: '#5B52A8', // Darker purple

  // Secondary (lighter purple for secondary actions)
  secondary: '#9A8FD1', // rgb(154, 143, 209) - Secondary actions

  // Tertiary
  tertiary: '#252729', // Subtle background color

  // Status colors
  success: '#4ADE80', // rgb(74, 222, 128) - Green
  failure: '#F87171', // rgb(248, 113, 113) - Red
  warning: '#FBBF24', // rgb(251, 191, 36) - Yellow/Orange

  // Borders
  borderColor: 'rgba(255, 255, 255, 0.1)',
  borderColorLight: 'rgba(255, 255, 255, 0.05)',
  borderColorHover: 'rgba(255, 255, 255, 0.2)',

  // Contrast
  contrast: '#FFFFFF',
  invertedContrast: '#101112',

  // Disabled states
  backgroundDisabled: '#2A2C2E',

  // Legacy/Compatibility
  binance: '#F0B90B', // Binance yellow (kept for compatibility)
} as const

// =============================================================================
// BUTTON COLORS
// =============================================================================

export const buttonColors = {
  // Primary button - Light bg, dark text (xertra.com style)
  primaryBg: '#F1F5F9', // rgb(241, 245, 249)
  primaryText: '#101112', // rgb(16, 17, 18)
  primaryHoverBg: '#E2E8F0',

  // Secondary/Ghost button - Transparent with border
  secondaryBg: 'transparent',
  secondaryText: 'rgba(255, 255, 255, 0.8)',
  secondaryBorder: 'rgba(255, 255, 255, 0.1)',
  secondaryHoverBg: 'rgba(255, 255, 255, 0.05)',

  // Action button (purple)
  actionBg: '#7168C0', // rgb(113, 104, 192)
  actionText: '#FAFAFA',
  actionHoverBg: '#8178D0',

  // Danger
  dangerBg: '#F87171',
  dangerText: '#FFFFFF',

  // Success
  successBg: '#4ADE80',
  successText: '#101112',

  // Disabled
  disabledBg: '#2A2C2E',
  disabledText: '#6D6D6D',
} as const

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

  // Font weights
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,

  // Font sizes (from xertra.com)
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px',
    '5xl': '56px',
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },

  // Letter spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: 'normal',
    wide: '0.02em',
    wider: '0.05em',
    label: '1.2px', // For uppercase labels like "XERTRA"
  },
} as const

// =============================================================================
// SPACING & LAYOUT
// =============================================================================

export const spacing = {
  // Base spacing scale (4px increments)
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const radii = {
  // Xertra uses smaller, more refined radii
  small: '4px',
  default: '4.8px', // Primary radius from xertra.com
  medium: '8px',
  large: '10px',
  xl: '14px',
  card: '8px', // Card containers
  button: '4.8px', // Button radius
  input: '8px', // Input fields
  circle: '50%',
} as const

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
  // Xertra uses minimal shadows
  level1: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  active: '0px 0px 0px 2px rgba(113, 104, 192, 0.4)', // Purple focus ring
  success: '0px 0px 0px 2px rgba(74, 222, 128, 0.3)',
  warning: '0px 0px 0px 2px rgba(251, 191, 36, 0.3)',
  focus: '0px 0px 0px 2px rgba(113, 104, 192, 0.5)',
  inset: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
  card: 'rgba(0, 0, 0, 0.15) 0px 40px 80px 0px', // From xertra.com
} as const

// =============================================================================
// Z-INDEX
// =============================================================================

export const zIndices = {
  dropdown: 10,
  modal: 100,
  tooltip: 1000,
} as const

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  xs: '370px',
  sm: '576px',
  md: '852px',
  lg: '968px',
  xl: '1080px',
} as const

export const mediaQueries = {
  xs: `@media screen and (min-width: ${breakpoints.xs})`,
  sm: `@media screen and (min-width: ${breakpoints.sm})`,
  md: `@media screen and (min-width: ${breakpoints.md})`,
  lg: `@media screen and (min-width: ${breakpoints.lg})`,
  xl: `@media screen and (min-width: ${breakpoints.xl})`,
  nav: `@media screen and (min-width: ${breakpoints.lg})`,
} as const

// =============================================================================
// GRADIENTS
// =============================================================================

export const gradients = {
  // Xertra uses subtle gradients
  bubblegum: 'linear-gradient(139.73deg, #1A1C1D 0%, #252729 100%)',
  primary: 'linear-gradient(180deg, #BDBDFF 0%, #9A9AE6 100%)',
  cardHover: 'linear-gradient(139.73deg, #1E2021 0%, #2A2C2E 100%)',
} as const

// =============================================================================
// TRANSITIONS
// =============================================================================

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '250ms ease-in-out',
  slow: '350ms ease-in-out',
} as const
