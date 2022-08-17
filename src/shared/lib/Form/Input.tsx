import { InputHTMLAttributes } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';

import { genericMemo } from '@/shared/utils';

import { Input as InputContainer } from '../../ui';

type InputProps<T> = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  name: Path<T>;
};

const InputView = function <T>({ name, ...props }: InputProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <InputContainer
          className={props.className}
          id={name}
          {...props}
          error={fieldState.error?.message}
          isDirty={fieldState.isDirty}
          name={field.name}
          ref={field.ref}
          value={field.value || ''}
          onBlur={field.onBlur}
          onChange={field.onChange}
        />
      )}
    />
  );
};

export const Input = genericMemo(InputView);
