import styled, { css } from 'styled-components'

import { Transienty } from 'utils/types'

type ContainerProps = Transienty<{
  fullHeight?: boolean
  variant?: 'compact' | 'slim' | 'normal' | 'wide' | 'full'
}>

export const Container = styled.div<ContainerProps>`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: calc(100% - 2rem);

  box-sizing: content-box;

  max-width: ${({ $variant = 'normal' }) => {
    switch ($variant) {
      case 'compact':
        return `700px`
      case 'slim':
        return `1000px`
      case 'wide':
        return `1440px`
      case 'full':
        return 'initial'
      default: // normal
        return `1220px`
    }
  }};

  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      height: 100%;
    `};
`
