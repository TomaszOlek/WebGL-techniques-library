/* eslint-disable no-param-reassign */
import { keys } from 'utils/object'

import { Breakpoint, breakpoints } from 'styles/theme'

type Media = {
  [key in Breakpoint]: {
    min: string
    max: string
  }
}

const min = (minWidth: number) => `@media (min-width: ${minWidth}px)`
const max = (maxWidth: number) => `@media (max-width: ${maxWidth - 1}px)`

export const media = keys(breakpoints).reduce((acc, breakpoint) => {
  acc[breakpoint] = {
    min: min(breakpoints[breakpoint]),
    max: max(breakpoints[breakpoint]),
  }
  return acc
}, {} as Media)

export default media
