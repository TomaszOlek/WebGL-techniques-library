import type { ComponentProps, JSXElementConstructor } from 'react'
import type { IStyledComponent } from 'styled-components'

import type { Breakpoint } from 'styles/theme'

export type TypedOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type WithRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>

export type InferProps<
  T extends
    | JSXElementConstructor<any>
    | keyof JSX.IntrinsicElements
    | IStyledComponent<any, any>,
> =
  T extends IStyledComponent<any, infer P>
    ? ComponentProps<T> & P
    : ComponentProps<T>

export type Transienty<T> = {
  [P in keyof T as `$${string & P}`]: T[P]
}
export type BreakpointProps<T, R extends Breakpoint = 'base'> = WithRequired<
  Partial<Record<Breakpoint, T>>,
  R
>
export type BreakpointValue<T, R extends Breakpoint = 'base'> =
  | T
  | BreakpointProps<T, R>
