import { darken } from 'polished'
import styled, { css } from 'styled-components'

import { Transienty } from 'utils/types'

import { Color } from 'styles/theme'

import loadingIcon from 'assets/icons/loading.svg'

import { IconSVG, IconWrapper } from '../Icon/Icon.style'
import { H100, H200, H300 } from '../Typography'

export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'transparent'

export const ButtonPrimary = css`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.primary};
`

export const ButtonPrimaryHover = css`
  background-color: ${({ theme }) => darken(0.05, theme.colors.primary)};
  color: ${({ theme }) => theme.colors.black};
  border-color: ${({ theme }) => darken(0.05, theme.colors.primary)};
`

export const ButtonSecondary = css`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`

export const ButtonSecondaryHover = css`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`

export const ButtonTertiary = css`
  background-color: ${({ theme }) => theme.colors.lightgray};
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
`

export const ButtonTertiaryHover = css`
  background-color: ${({ theme }) => theme.colors.lightgray};
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.dark};
`

export const ButtonTransparent = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.gray};
`

export const ButtonTransparentHover = css`
  background-color: rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.dark};
`

type ButtonProps = Transienty<{
  loading?: boolean
  variant?: ButtonVariants
  color?: Color | undefined
  size?: 'small' | 'medium' | 'large'
  iconOnly?: boolean
  pointerEvents?: 'none' | 'auto'
  fullWidth?: boolean
}>

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  width: fit-content;
  height: fit-content;

  display: inline-block;
  position: relative;

  text-align: center;
  text-decoration: none;
  overflow: hidden;
  border-radius: 100px;

  ${({ $iconOnly, $size }) => {
    switch ($size) {
      case 'small':
        return css`
          ${H100}

          ${$iconOnly
            ? css`
                padding: 7px;
              `
            : css`
                padding: 4px 12px;
              `}

          img,
          .gatsby-image-wrapper,
          svg,
          ${IconSVG}, ${IconWrapper} {
            width: 16px !important;
            height: 16px !important;
          }
        `

      case 'large':
        return css`
          ${H200}

          ${$iconOnly
            ? css`
                padding: 11px;
              `
            : css`
                padding: 8px 24px;
              `}

          img,
          .gatsby-image-wrapper,
          svg,
          ${IconSVG}, ${IconWrapper} {
            width: 24px !important;
            height: 24px !important;
          }
        `

      case 'medium':
      default:
        return css`
          ${H300}

          ${$iconOnly
            ? css`
                padding: 9px;
              `
            : css`
                padding: 8px 20px;
              `}

        img,
        .gatsby-image-wrapper,
        svg,
        ${IconSVG}, ${IconWrapper} {
            width: 20px !important;
            height: 20px !important;
          }
        `
    }
  }}

  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          ${ButtonSecondary}

          &:hover {
            ${ButtonSecondaryHover}
          }
        `
      case 'tertiary':
        return css`
          ${ButtonTertiary}

          &:hover {
            ${ButtonTertiaryHover}
          }
        `
      case 'transparent':
        return css`
          ${ButtonTransparent}

          &:hover {
            ${ButtonTransparentHover}
          }
        `
      case 'primary':
      default:
        return css`
          ${ButtonPrimary}

          &:hover {
            ${ButtonPrimaryHover}
          }
        `
    }
  }}

  transition:
    color 100ms ease,
    background-color 100ms ease,
    border-color 100ms ease;

  svg *[fill] {
    fill: currentColor;
  }
  svg *[stroke] {
    stroke: currentColor;
  }

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ $loading }) =>
    $loading &&
    css`
      cursor: wait;
      opacity: 0.8;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background: inherit;
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background-image: url(${loadingIcon});
        background-size: auto 75%;
        background-position: center;
        background-repeat: no-repeat;
      }
    `};

  &[disabled] {
    opacity: 0.75;
    cursor: not-allowed;
  }
`
