import { FormProvider, UseFormReturn } from 'react-hook-form';

import type { FormProps as FormContainerProps } from '../../ui';
import { Form as FormContainer } from '../../ui';
import { genericMemo } from '../../utils';

type FormProps<T> = FormContainerProps & {
  methods: UseFormReturn<T>;
};

const FormView = function <T>({ methods, children, ...props }: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <FormContainer {...props}>{children}</FormContainer>
    </FormProvider>
  );
};

export const Form = genericMemo(FormView);
