import { rem } from 'polished'
import styled, { css } from 'styled-components'

import { BodyBig, BodyMedium } from 'components/atoms/Typography'

import media from 'styles/media'

export type InputProps = {
  $error?: boolean
}

export const inputCss = css<InputProps>`
  width: 100%;
  padding: ${rem(9)} ${rem(16)};

  text-align: left;

  border: 1px solid
    ${({ theme, $error }) => ($error ? theme.colors.danger : theme.colors.gray)};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  ${BodyBig}
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.dark};

  &::placeholder {
    color: ${({ theme, $error }) =>
      $error ? theme.colors.danger : theme.colors.gray};
  }

  ${media.lg.min} {
    ${BodyMedium}
  }
`

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const InputIcon = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;

  width: 30px;
  height: calc(100% - 4px);
  padding-right: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  background: ${({ theme }) => theme.colors.white};
`

export const Input = styled.input<InputProps>`
  ${inputCss}
`

export const Textarea = styled.textarea<InputProps>`
  ${inputCss}
  resize: none;
  height: ${rem(140)};
`
