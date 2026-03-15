/**
 * Lightweight replacement for styled-system's space, layout, flexbox,
 * typography, background, border, and position functions.
 *
 * Consumers keep passing the same prop names (mt, mb, p, width, etc.).
 * Each helper generates a CSS string from those props — no runtime
 * theme-scale lookup, no responsive array syntax, just direct values.
 */

// ---------------------------------------------------------------------------
// Space
// ---------------------------------------------------------------------------

export interface SpaceProps {
  m?: string | number
  mt?: string | number
  mb?: string | number
  ml?: string | number
  mr?: string | number
  mx?: string | number
  my?: string | number
  p?: string | number
  pt?: string | number
  pb?: string | number
  pl?: string | number
  pr?: string | number
  px?: string | number
  py?: string | number
  margin?: string | number
  marginTop?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginRight?: string | number
  padding?: string | number
  paddingTop?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  paddingRight?: string | number
}

export function spaceStyles(props: SpaceProps): string {
  let css = ''
  if (props.m) css += `margin: ${props.m};`
  if (props.margin) css += `margin: ${props.margin};`
  if (props.mt) css += `margin-top: ${props.mt};`
  if (props.marginTop) css += `margin-top: ${props.marginTop};`
  if (props.mb) css += `margin-bottom: ${props.mb};`
  if (props.marginBottom) css += `margin-bottom: ${props.marginBottom};`
  if (props.ml) css += `margin-left: ${props.ml};`
  if (props.marginLeft) css += `margin-left: ${props.marginLeft};`
  if (props.mr) css += `margin-right: ${props.mr};`
  if (props.marginRight) css += `margin-right: ${props.marginRight};`
  if (props.mx) {
    css += `margin-left: ${props.mx}; margin-right: ${props.mx};`
  }
  if (props.my) {
    css += `margin-top: ${props.my}; margin-bottom: ${props.my};`
  }
  if (props.p) css += `padding: ${props.p};`
  if (props.padding) css += `padding: ${props.padding};`
  if (props.pt) css += `padding-top: ${props.pt};`
  if (props.paddingTop) css += `padding-top: ${props.paddingTop};`
  if (props.pb) css += `padding-bottom: ${props.pb};`
  if (props.paddingBottom) css += `padding-bottom: ${props.paddingBottom};`
  if (props.pl) css += `padding-left: ${props.pl};`
  if (props.paddingLeft) css += `padding-left: ${props.paddingLeft};`
  if (props.pr) css += `padding-right: ${props.pr};`
  if (props.paddingRight) css += `padding-right: ${props.paddingRight};`
  if (props.px) {
    css += `padding-left: ${props.px}; padding-right: ${props.px};`
  }
  if (props.py) {
    css += `padding-top: ${props.py}; padding-bottom: ${props.py};`
  }
  return css
}

/** Props that spaceStyles consumes — block from DOM. */
export const SPACE_PROP_NAMES = [
  'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my',
  'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py',
  'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
  'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
] as const

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export interface LayoutProps {
  width?: string
  height?: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
  display?: string
  overflow?: string
  overflowX?: string
  overflowY?: string
}

export function layoutStyles(props: LayoutProps): string {
  let css = ''
  if (props.width) css += `width: ${props.width};`
  if (props.height) css += `height: ${props.height};`
  if (props.minWidth) css += `min-width: ${props.minWidth};`
  if (props.maxWidth) css += `max-width: ${props.maxWidth};`
  if (props.minHeight) css += `min-height: ${props.minHeight};`
  if (props.maxHeight) css += `max-height: ${props.maxHeight};`
  if (props.display) css += `display: ${props.display};`
  if (props.overflow) css += `overflow: ${props.overflow};`
  if (props.overflowX) css += `overflow-x: ${props.overflowX};`
  if (props.overflowY) css += `overflow-y: ${props.overflowY};`
  return css
}

export const LAYOUT_PROP_NAMES = [
  'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
  'display', 'overflow', 'overflowX', 'overflowY',
] as const

// ---------------------------------------------------------------------------
// Flexbox
// ---------------------------------------------------------------------------

export interface FlexboxProps {
  alignItems?: string
  alignContent?: string
  justifyContent?: string
  flexWrap?: string
  flexDirection?: string
  flex?: string
  flexGrow?: number
  flexShrink?: number
  flexBasis?: string
  justifySelf?: string
  alignSelf?: string
  order?: number
}

export function flexboxStyles(props: FlexboxProps): string {
  let css = ''
  if (props.alignItems) css += `align-items: ${props.alignItems};`
  if (props.alignContent) css += `align-content: ${props.alignContent};`
  if (props.justifyContent) css += `justify-content: ${props.justifyContent};`
  if (props.flexWrap) css += `flex-wrap: ${props.flexWrap};`
  if (props.flexDirection) css += `flex-direction: ${props.flexDirection};`
  if (props.flex) css += `flex: ${props.flex};`
  if (props.flexGrow !== undefined) css += `flex-grow: ${props.flexGrow};`
  if (props.flexShrink !== undefined) css += `flex-shrink: ${props.flexShrink};`
  if (props.flexBasis) css += `flex-basis: ${props.flexBasis};`
  if (props.justifySelf) css += `justify-self: ${props.justifySelf};`
  if (props.alignSelf) css += `align-self: ${props.alignSelf};`
  if (props.order !== undefined) css += `order: ${props.order};`
  return css
}

export const FLEXBOX_PROP_NAMES = [
  'alignItems', 'alignContent', 'justifyContent', 'flexWrap', 'flexDirection',
  'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'justifySelf', 'alignSelf', 'order',
] as const

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export interface TypographyProps {
  fontSize?: string
  fontWeight?: string | number
  lineHeight?: string | number
  letterSpacing?: string
  textAlign?: string
}

export function typographyStyles(props: TypographyProps): string {
  let css = ''
  if (props.fontSize) css += `font-size: ${props.fontSize};`
  if (props.fontWeight !== undefined) css += `font-weight: ${props.fontWeight};`
  if (props.lineHeight !== undefined) css += `line-height: ${props.lineHeight};`
  if (props.letterSpacing) css += `letter-spacing: ${props.letterSpacing};`
  if (props.textAlign) css += `text-align: ${props.textAlign};`
  return css
}

export const TYPOGRAPHY_PROP_NAMES = [
  'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textAlign',
] as const

// ---------------------------------------------------------------------------
// Background
// ---------------------------------------------------------------------------

export interface BackgroundProps {
  background?: string
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundRepeat?: string
}

export function backgroundStyles(props: BackgroundProps): string {
  let css = ''
  if (props.background) css += `background: ${props.background};`
  if (props.backgroundImage) css += `background-image: ${props.backgroundImage};`
  if (props.backgroundSize) css += `background-size: ${props.backgroundSize};`
  if (props.backgroundPosition) css += `background-position: ${props.backgroundPosition};`
  if (props.backgroundRepeat) css += `background-repeat: ${props.backgroundRepeat};`
  return css
}

export const BACKGROUND_PROP_NAMES = [
  'background', 'backgroundImage', 'backgroundSize', 'backgroundPosition', 'backgroundRepeat',
] as const

// ---------------------------------------------------------------------------
// Border
// ---------------------------------------------------------------------------

export interface BorderProps {
  border?: string
  borderTop?: string
  borderRight?: string
  borderBottom?: string
  borderLeft?: string
  borderWidth?: string
  borderColor?: string
  borderRadius?: string
}

export function borderStyles(props: BorderProps): string {
  let css = ''
  if (props.border) css += `border: ${props.border};`
  if (props.borderTop) css += `border-top: ${props.borderTop};`
  if (props.borderRight) css += `border-right: ${props.borderRight};`
  if (props.borderBottom) css += `border-bottom: ${props.borderBottom};`
  if (props.borderLeft) css += `border-left: ${props.borderLeft};`
  if (props.borderWidth) css += `border-width: ${props.borderWidth};`
  if (props.borderColor) css += `border-color: ${props.borderColor};`
  if (props.borderRadius) css += `border-radius: ${props.borderRadius};`
  return css
}

export const BORDER_PROP_NAMES = [
  'border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
  'borderWidth', 'borderColor', 'borderRadius',
] as const

// ---------------------------------------------------------------------------
// Position
// ---------------------------------------------------------------------------

export interface PositionProps {
  position?: string
  top?: string
  right?: string
  bottom?: string
  left?: string
  zIndex?: number
}

export function positionStyles(props: PositionProps): string {
  let css = ''
  if (props.position) css += `position: ${props.position};`
  if (props.top) css += `top: ${props.top};`
  if (props.right) css += `right: ${props.right};`
  if (props.bottom) css += `bottom: ${props.bottom};`
  if (props.left) css += `left: ${props.left};`
  if (props.zIndex !== undefined) css += `z-index: ${props.zIndex};`
  return css
}

export const POSITION_PROP_NAMES = [
  'position', 'top', 'right', 'bottom', 'left', 'zIndex',
] as const

// ---------------------------------------------------------------------------
// Utility: build shouldForwardProp blocklist
// ---------------------------------------------------------------------------

export function blockProps(...propLists: readonly (readonly string[])[]): (prop: string) => boolean {
  const blocked = new Set<string>()
  for (const list of propLists) {
    for (const p of list) blocked.add(p)
  }
  return (prop: string) => !blocked.has(prop)
}
