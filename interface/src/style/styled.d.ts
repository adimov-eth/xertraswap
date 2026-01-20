// eslint-disable-next-line import/no-unresolved
import { XertraTheme } from '@xertra/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends XertraTheme {}
}
