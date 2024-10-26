import { rem } from 'polished'
import styled, { CSSProperties, css } from 'styled-components'

import { generatePropMedia, getColor, iterateBreakpoints } from 'utils/styled'
import { BreakpointProps, BreakpointValue, Transienty } from 'utils/types'

import media from 'styles/media'
import { Color as ThemeColor } from 'styles/theme'

type TextProps = Transienty<
  BreakpointProps<ReturnType<typeof css>> & {
    color?: BreakpointValue<ThemeColor | 'inherit'>
    align?: BreakpointValue<CSSProperties['textAlign']>
    transform?: CSSProperties['textTransform']
    cursor?: CSSProperties['cursor']
    oneLine?: boolean
  }
>
export const Text = styled.p<TextProps>`
  cursor: ${({ $cursor }) => $cursor ?? 'inherit'};

  margin: 0;
  line-height: initial;
  text-transform: ${({ $transform }) => $transform ?? 'none'};
  text-decoration: none;

  ${({ theme, $align = 'left' }) =>
    generatePropMedia(
      theme,
      $align,
      (value) => css`
        text-align: ${value};
      `
    )}

  ${({ theme, $color = 'black' }) =>
    generatePropMedia(
      theme,
      $color,
      (value) => css`
        color: ${value === 'inherit' ? value : getColor(theme, value)};
      `
    )}

  ${({ $oneLine }) =>
    $oneLine &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}

  a {
    color: inherit;
    text-decoration: inherit;
  }

  ${(props) =>
    iterateBreakpoints(props.theme, props).map(
      ({ breakpoint, value }) => css`
        ${media[breakpoint].min} {
          ${value}
        }
      `
    )};
`

export const Weight = styled.span<{ $weight: CSSProperties['fontWeight'] }>`
  font-weight: ${({ $weight }) => $weight};
`

export const Color = styled.span<{ $color: ThemeColor }>`
  color: ${({ theme, $color }) => theme.colors[$color]};
`

export const BodySmall = css`
  font-size: ${rem(14)};
  line-height: ${rem(22)};
  font-weight: 500;
`

export const BodyMedium = css`
  font-size: ${rem(16)};
  line-height: ${rem(26)};
  font-weight: 500;
`

export const BodyBig = css`
  font-size: ${rem(18)};
  line-height: ${rem(30)};
  font-weight: 500;
`

export const B100 = css`
  font-size: ${rem(14)};
  line-height: ${rem(22)};
  font-weight: 700;
`

export const B200 = css`
  font-size: ${rem(18)};
  line-height: ${rem(22)};
  font-weight: 700;
`

export const B300 = css`
  font-size: ${rem(22)};
  line-height: ${rem(26)};
  font-weight: 700;
`

export const B400 = css`
  font-size: ${rem(26)};
  line-height: ${rem(30)};
  font-weight: 700;
`

export const B500 = css`
  font-size: ${rem(36)};
  line-height: ${rem(40)};
  font-weight: 700;
`

export const H100 = css`
  font-size: ${rem(12)};
  line-height: ${rem(16)};
  font-weight: 500;
`

export const H200 = css`
  font-size: ${rem(14)};
  line-height: ${rem(22)};
  font-weight: 500;
`

export const H300 = css`
  font-size: ${rem(14)};
  line-height: ${rem(16)};
  font-weight: 500;
`

export const H400 = css`
  font-size: ${rem(20)};
  line-height: ${rem(26)};
  font-weight: 500;
`

export const H500 = css`
  font-size: ${rem(32)};
  line-height: ${rem(36)};
  font-weight: 500;
`

export const H600 = css`
  font-size: ${rem(36)};
  line-height: ${rem(40)};
  font-weight: 500;
`

export const H700 = css`
  font-size: ${rem(46)};
  line-height: ${rem(50)};
  font-weight: 500;
`

export const H800 = css`
  font-size: ${rem(66)};
  line-height: ${rem(70)};
  font-weight: 500;
`

export const H900 = css`
  font-size: ${rem(74)};
  line-height: ${rem(74)};
  font-weight: 500;
`

export const H1000 = css`
  font-size: ${rem(80)};
  line-height: ${rem(88)};
  font-weight: 500;
`
