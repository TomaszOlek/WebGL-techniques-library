import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { UseFormProps, useForm as useReactHookForm } from 'react-hook-form'
import { z } from 'zod'

import { TypedOmit } from '../utils/types'

type FormProps<T extends z.AnyZodObject> = {
  schema: T
  submitHandler: (data: z.infer<T>, reset: () => void) => Promise<void>
  options?: TypedOmit<UseFormProps<z.infer<T>>, 'resolver'>
  resetOnSubmitSuccess?: boolean
}

export const useForm = <T extends z.AnyZodObject>({
  schema,
  submitHandler,
  options = {},
  resetOnSubmitSuccess = true,
}: FormProps<T>) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty, isValid },
    getValues: getFormValues,
    watch: watchFormValues,
    clearErrors,
    ...rest
  } = useReactHookForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    ...options,
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const onReset = () => {
    setTimeout(() => {
      setIsError(false)
      setIsSuccess(false)
      clearErrors()
    }, 2000)
    reset(
      options.defaultValues || options.values
        ? { ...(options.defaultValues || options.values) }
        : undefined
    )
  }
  const onSuccess = () => {
    setIsSuccess(true)
    setIsError(false)
    if (resetOnSubmitSuccess) {
      onReset()
    }
  }
  const onError = () => {
    setIsError(true)
    setIsSuccess(false)
  }
  const onSubmit = handleSubmit((data) =>
    submitHandler(data, onReset).then(onSuccess).catch(onError)
  )

  return {
    control,
    register,
    errors,
    reset,
    onSubmit,
    isSubmitting,
    isValid,
    isDirty,
    isSuccess: isSubmitSuccessful && isSuccess,
    isError,
    getFormValues,
    setValue,
    watchFormValues,
    clearErrors,
    ...rest,
  }
}
