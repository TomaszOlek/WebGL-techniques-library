import { CSSProperties } from 'react'
import styled, { css } from 'styled-components'

import { generatePropMedia, iterateBreakpoints } from 'utils/styled'
import { BreakpointProps, BreakpointValue, Transienty } from 'utils/types'

import media from 'styles/media'

type SpacingProps = Transienty<
  BreakpointProps<string> & {
    display?: CSSProperties['display']
  }
>

export const Margin = styled.div<SpacingProps>`
  display: ${({ $display }) => $display ?? 'block'};

  ${(props) =>
    iterateBreakpoints(props.theme, props).map(
      ({ breakpoint, value }) => css`
        ${media[breakpoint].min} {
          margin: ${value};
        }
      `
    )};
`

export const Padding = styled.div<SpacingProps>`
  display: ${({ $display }) => $display ?? 'block'};

  ${(props) =>
    iterateBreakpoints(props.theme, props).map(
      ({ breakpoint, value }) => css`
        ${media[breakpoint].min} {
          padding: ${value};
        }
      `
    )};
`

type FlexProps = Transienty<{
  gap?: BreakpointValue<CSSProperties['gap']>
  direction?: BreakpointValue<CSSProperties['flexDirection']>
  justify?: BreakpointValue<CSSProperties['justifyContent']>
  align?: BreakpointValue<CSSProperties['alignItems']>
  wrap?: BreakpointValue<boolean>
  fullWidth?: boolean
  fullHeight?: boolean
}>

export const Flex = styled.div<FlexProps>`
  display: flex;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'inherit')};

  ${({ theme, $gap = {} }) =>
    generatePropMedia(
      theme,
      $gap,
      (value) => css`
        gap: ${value};
      `
    )}

  ${({ theme, $align = {} }) =>
    generatePropMedia(
      theme,
      $align,
      (value) => css`
        align-items: ${value};
      `
    )};

  ${({ theme, $justify = {} }) =>
    generatePropMedia(
      theme,
      $justify,
      (value) => css`
        justify-content: ${value};
      `
    )};

  ${({ theme, $direction = {} }) =>
    generatePropMedia(
      theme,
      $direction,
      (value) => css`
        flex-direction: ${value};
      `
    )};

  ${({ theme, $wrap = {} }) =>
    generatePropMedia(
      theme,
      $wrap,
      (value) => css`
        flex-wrap: ${value ? 'wrap' : 'nowrap'};
      `
    )};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `};

  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      height: 100%;
    `};
`

type GridProps = Transienty<{
  gap?: BreakpointValue<CSSProperties['gap']>
  columns?: BreakpointValue<number>
  rows?: BreakpointValue<number>
  align?: BreakpointValue<CSSProperties['alignItems']>
  justify?: BreakpointValue<CSSProperties['justifyContent']>
}>

export const Grid = styled.div<GridProps>`
  display: grid;

  ${({ theme, $gap = {} }) =>
    generatePropMedia(
      theme,
      $gap,
      (value) => css`
        gap: ${value};
      `
    )}

  ${({ theme, $columns = {} }) =>
    generatePropMedia(
      theme,
      $columns,
      (value) => css`
        grid-template-columns: repeat(${value}, minmax(0, 1fr));
      `
    )};

  ${({ theme, $rows = {} }) =>
    generatePropMedia(
      theme,
      $rows,
      (value) => css`
        grid-template-rows: repeat(${value}, minmax(0, 1fr));
      `
    )};

  ${({ theme, $align = {} }) =>
    generatePropMedia(
      theme,
      $align,
      (value) => css`
        align-items: ${value};
      `
    )};

  ${({ theme, $justify = {} }) =>
    generatePropMedia(
      theme,
      $justify,
      (value) => css`
        justify-items: ${value};
      `
    )};
`

type GridItemProps = Transienty<{
  columns?: BreakpointValue<number, never>
  rows?: BreakpointValue<number, never>
}>
// NOTE: size cannot be greater than column size set in Grid
export const GridItem = styled.div<GridItemProps>`
  display: flex;

  ${({ theme, $columns = {} }) =>
    generatePropMedia(
      theme,
      $columns,
      (value) => css`
        grid-column-end: span ${value};
      `
    )};

  ${({ theme, $rows = {} }) =>
    generatePropMedia(
      theme,
      $rows,
      (value) => css`
        grid-row-end: span ${value};
      `
    )};
`
