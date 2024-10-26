import { css } from 'styled-components'

import { entries, keys } from 'utils/object'
import { Transienty } from 'utils/types'

import media from 'styles/media'
import { Breakpoint, Colors, Theme } from 'styles/theme'

/**
 *  Applies to styled components where you want to iterate over breakpoints and apply styles based on them using $base, $sm, $md, $lg, $xl, $xxl etc. It filters out only the breakpoints from theme that are in props and then retuns iterable array of [{ breakpoint, value }] to apply styles.
 *
 * */
export const iterateBreakpoints = <T>(
  theme: Theme,
  breakpoints: Transienty<Partial<Record<Breakpoint, T>>>
) =>
  keys(theme.breakpoints)
    .filter((breakpoint) => `$${breakpoint}` in breakpoints)
    .map((breakpoint) => ({
      breakpoint,
      value: breakpoints[`$${breakpoint}`]!,
    }))

/**
 *  Applies to styled components where you want to iterate over breakpoints and apply styles based on them using object like $gap={{ base: '1rem', lg: '2rem' }} etc. It filters out only the breakpoints from theme that are in props and then retuns iterable array of [{ breakpoint (possible null), value }] to apply styles.
 *
 * */
export const iteratePropBreakpoints = <T>(
  theme: Theme,
  breakpoints: Partial<Record<Breakpoint, T>> | NonNullable<T>
) => {
  if (breakpoints && typeof breakpoints === 'object') {
    return keys(theme.breakpoints)
      .filter((breakpoint) => breakpoint in breakpoints)
      .map((breakpoint) => ({
        breakpoint,
        value: (breakpoints as Partial<Record<Breakpoint, T>>)[breakpoint]!,
      }))
  }

  return [{ breakpoint: null, value: breakpoints }]
}

/**
 *  Applies to styled components where you want to iterate over breakpoints and apply styles based on them using object like $gap={{ base: '1rem', lg: '2rem' }} etc. It applies styles based on iterable array of [{ breakpoint (possible null), value }] with media.BP.min.
 *
 * */
export const generatePropMedia = <T>(
  theme: Parameters<typeof iteratePropBreakpoints<T>>[0],
  breakpoints: Parameters<typeof iteratePropBreakpoints<T>>[1],
  cssFunction: (value: NonNullable<T>) => ReturnType<typeof css>
) => {
  return iteratePropBreakpoints(theme, breakpoints).map(
    ({ breakpoint, value }) =>
      breakpoint
        ? css`
            ${media[breakpoint].min} {
              ${cssFunction(value)}
            }
          `
        : css`
            ${cssFunction(value)}
          `
  )
}

/**
 *  Get color from theme. If color is not defined, it will return defaultColor.
 *
 * */
export const getColor = (
  theme: Theme,
  color: keyof Colors | undefined,
  defaultColor: keyof Colors = 'black'
) => (color ? theme.colors[color] : theme.colors[defaultColor])

/**
 *  Spread props to styled components. If key is in styledProps array, it will be spread with $ prefix, otherwise just pass it as is.
 *
 * */
export const spreadProps = <T extends Object>(
  props: T,
  styledProps: (keyof T)[]
): T =>
  entries(props).reduce((acc, [key, value]) => {
    const styledKey = styledProps.includes(key)
      ? `$${key as keyof T & string}`
      : key
    return { ...acc, [styledKey]: value }
  }, {} as T)
