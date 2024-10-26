import React, { PropsWithChildren, forwardRef } from 'react'

import { Input } from 'components/atoms/Input'
import { Flex } from 'components/atoms/Spacing'
import { BodySmall, Text } from 'components/atoms/Typography'

import { InferProps, TypedOmit } from 'utils/types'

type FieldProps = {
  errorMessage?: string
} & TypedOmit<InferProps<typeof Input>, '$error'>

export const ErrorText: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Text $color="danger" $base={BodySmall}>
      {children}
    </Text>
  )
}

export const CustomField: React.FC<PropsWithChildren<FieldProps>> = ({
  errorMessage,
  children,
}) => {
  return (
    <Flex $direction="column" $gap="1rem" $fullWidth>
      {children}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Flex>
  )
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ errorMessage, ...props }, ref) => {
    return (
      <CustomField errorMessage={errorMessage}>
        <Input $error={!!errorMessage} ref={ref} {...props} />
      </CustomField>
    )
  }
)
