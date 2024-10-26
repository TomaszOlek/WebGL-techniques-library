import styled, { css } from 'styled-components'

import { iterateBreakpoints } from 'utils/styled'
import { BreakpointProps, Transienty } from 'utils/types'

import media from 'styles/media'

type HiddenProps = Transienty<
  BreakpointProps<'visible' | 'hidden'> & {
    fullWidth?: boolean
  }
>
export const Hidden = styled.div<HiddenProps>`
  ${(props) =>
    iterateBreakpoints(props.theme, props).map(
      ({ breakpoint, value }) => css`
        ${media[breakpoint].min} {
          display: ${value === 'visible' ? 'block' : 'none'};
          content-visibility: ${value === 'visible' ? 'visible' : 'hidden'};
        }
      `
    )};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`
