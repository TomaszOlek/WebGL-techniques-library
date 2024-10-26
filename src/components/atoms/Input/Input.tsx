import React, { forwardRef } from 'react'

import { Icon, IconAsSVG } from 'components/atoms/Icon'

import { InferProps } from 'utils/types'

import {
  InputIcon,
  InputWrapper,
  Input as StyledInput,
  Textarea,
  inputCss,
} from './Input.style'

export type InputProps = InferProps<typeof StyledInput> & { icon?: IconAsSVG }
const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  const { icon: iconProp, ...inputProps } = props

  return (
    <InputWrapper>
      <StyledInput ref={ref} {...inputProps} />
      {iconProp && (
        <InputIcon>
          <Icon src={iconProp} />
        </InputIcon>
      )}
    </InputWrapper>
  )
})

export { Textarea, Input, inputCss }
