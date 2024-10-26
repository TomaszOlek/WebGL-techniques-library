import React from 'react'
import { Controller } from 'react-hook-form'
import { z } from 'zod'

import { Button } from 'components/atoms/Button'
import { Flex } from 'components/atoms/Spacing'

import { ErrorText, Field } from 'components/molecules/Field'

import { useForm } from 'hooks/useForm'

type DummyFormProps = {}

export const DummyForm: React.FC<DummyFormProps> = () => {
  const {
    isSuccess,
    isError,
    isSubmitting,
    control,
    errors,
    onSubmit: onFormSubmit,
  } = useForm({
    schema: z.object({
      fullName: z
        .string({ required_error: 'Wymagane' })
        .min(1, { message: 'Wymagane' }),
      email: z
        .string({ required_error: 'Wymagane' })
        .min(1, { message: 'Wymagane' })
        .email({ message: 'Błędny email' }),
    }),
    submitHandler: async (data) => {
      console.log(data)
      alert(JSON.stringify(data))
    },
    options: {
      defaultValues: {
        fullName: '',
        email: '',
      },
    },
  })

  return (
    <form onSubmit={onFormSubmit}>
      <Flex $gap="1rem" $direction="column">
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <Field
              {...field}
              placeholder="Imię i nazwisko"
              errorMessage={errors.fullName?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Field
              {...field}
              placeholder="Email"
              errorMessage={errors.email?.message}
            />
          )}
        />

        <div>
          <Button
            type="submit"
            $variant="solid"
            $color={isSuccess ? 'success' : 'primary'}
            $loading={isSubmitting}
            disabled={isSubmitting}
          >
            <Flex $gap={2} $align="center">
              {isSuccess ? 'Wysłano' : 'Wyślij'}
            </Flex>
          </Button>
        </div>

        {isError && <ErrorText>Wystąpił błąd</ErrorText>}
      </Flex>
    </form>
  )
}
