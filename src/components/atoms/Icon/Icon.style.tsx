import { darken, readableColor, rem } from 'polished'
import styled, { css } from 'styled-components'

import { getColor } from 'utils/styled'
import { Transienty } from 'utils/types'

import { Color } from 'styles/theme'

type IconSVGProps = Transienty<{
  width: number
  height: number

  inline?: boolean
  fill?: string
  stroke?: string
}>

export const IconWrapper = styled.div`
  position: relative;
`

export const IconBadge = styled.span<{ $color?: Color }>`
  position: absolute;
  bottom: 0;
  right: -25%;

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${rem(14)};
  height: ${rem(14)};

  background: ${({ theme, $color }) => getColor(theme, $color, 'black')};
  color: ${({ theme, $color }) =>
    readableColor(
      darken(0.05, getColor(theme, $color, 'black')),
      theme.colors.black,
      theme.colors.white
    )};

  border-radius: 50%;

  font-size: ${rem(10)};
  font-weight: 500;
  line-height: initial;
`

export const IconSVG = styled.div<IconSVGProps>`
  display: ${({ $inline }) => ($inline ? 'inline-flex' : 'flex')};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'inherit')};
  align-items: center;
  justify-content: center;
  margin: 0;

  width: ${({ $width }) => rem($width)};
  height: ${({ $height }) => rem($height)};

  svg {
    display: block;
    transition-timing-function: ease;
    transition-duration: ease;
    transition-property: color, fill;

    *[fill]:not([fill='none']),
    *[stroke]:not([stroke='currentColor']) {
      transition-timing-function: ease;
      transition-duration: ease;
      transition-property: color, stroke, fill;
    }
  }

  ${({ $fill }) =>
    $fill &&
    $fill !== 'none' &&
    css`
      svg {
        color: ${$fill};
        *:not([fill='none']) {
          fill: currentColor;
        }
        *[stroke]:not([stroke='currentColor']) {
          stroke: ${$fill};
        }
      }
    `}

  ${({ $stroke }) =>
    $stroke &&
    css`
      svg {
        color: ${$stroke};
        *[stroke]:not([stroke='currentColor']) {
          stroke: ${$stroke};
        }
      }
    `}
`
