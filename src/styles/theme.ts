export const breakpoints = {
  base: 0,
  xs: 400,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  xl3: 1600,
} as const

export type Breakpoints = typeof breakpoints
export type Breakpoint = keyof Breakpoints

export const colors = {
  primary: '#f39c12',
  secondary: '#2980b9',
  danger: '#e74c3c',
  success: '#2ecc71',
  light: '#FEF6E2',
  dark: '#242424',
  text: '#454545',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#E8E7E7',
  lightgray: '#F8F8F8',
} as const

export type Colors = typeof colors
export type Color = keyof Colors

export const fonts = {
  size: '16px',
} as const

export type Fonts = typeof fonts

const theme = {
  breakpoints,
  colors,
  fonts,
}

export type Theme = typeof theme

export default theme
