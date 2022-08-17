import { memo, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/app/store';
import { ROUTE_PATHS } from '@/shared/constants';
import { Form, Input, myzodResolver } from '@/shared/lib/Form';
import { Button } from '@/shared/ui';

import { authApi } from '../api';
import { actions } from '../model';
import { SignupInputs } from '../model/models';
import { signupSchema } from '../validation';

type SignupFormProps = {
  onSubmit: SubmitHandler<SignupInputs>;
  isLoading?: boolean;
};

const SignupFormView = memo(({ isLoading, onSubmit }: SignupFormProps) => {
  const methods = useForm<SignupInputs>({
    defaultValues: { email: '', username: '', password: '' },
    resolver: myzodResolver(signupSchema),
    mode: 'onChange',
  });

  return (
    <Form
      className='max-w-md'
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <fieldset className='flex flex-col gap-6 p-4'>
        <Input<SignupInputs>
          name='email'
          placeholder='example@mail.com'
          type='email'
        />
        <Input<SignupInputs> name='username' placeholder='alex' type='text' />
        <Input<SignupInputs>
          name='password'
          placeholder='••••'
          type='password'
        />
      </fieldset>

      <Button type='submit'>{isLoading ? 'Loading...' : 'Register'}</Button>
    </Form>
  );
});

const SignupFormContainer = () => {
  const [register, { isLoading, error }] = authApi.useSignupMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupInputs> = async (formData) => {
    try {
      const viewerData = await register(formData).unwrap();
      dispatch(
        actions.setCredentials({
          token: viewerData.accessToken,
          viewer: viewerData.user,
        }),
      );
      localStorage.setItem('token', viewerData.accessToken);
      navigate(ROUTE_PATHS.contacts);
    } catch (err) {
      console.error(err);
    }
  };

  const errorMsg = useMemo(() => {
    if (error) {
      if ('data' in error) {
        return JSON.stringify(error.data);
      }
      if ('error' in error) {
        return JSON.stringify(error.error);
      }
    }

    return null;
  }, [error]);

  return (
    <div className='flex w-full flex-col items-center gap-6'>
      <SignupFormView isLoading={isLoading} onSubmit={onSubmit} />
      {errorMsg && (
        <span className='w-full max-w-md bg-red-400 p-3 text-white '>
          {errorMsg}
        </span>
      )}
    </div>
  );
};

export const SignupForm = memo(SignupFormContainer);
