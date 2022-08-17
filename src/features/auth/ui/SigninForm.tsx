import { memo, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/app/store';
import { ROUTE_PATHS } from '@/shared/constants';
import { Form, Input, myzodResolver } from '@/shared/lib/Form';
import { Button } from '@/shared/ui';

import { authApi } from '../api';
import { actions } from '../model';
import { SigninInputs } from '../model/models';
import { signinSchema } from '../validation';

type SigninFormProps = {
  onSubmit: SubmitHandler<SigninInputs>;
  isLoading?: boolean;
};

const SigninFormView = memo(({ isLoading, onSubmit }: SigninFormProps) => {
  const methods = useForm<SigninInputs>({
    defaultValues: { email: '', password: '' },
    resolver: myzodResolver(signinSchema),
    mode: 'onChange',
  });

  return (
    <Form
      className='max-w-md'
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <fieldset className='flex flex-col gap-6 p-4'>
        <Input<SigninInputs>
          name='email'
          placeholder='example@mail.com'
          type='email'
        />
        <Input<SigninInputs>
          name='password'
          placeholder='••••'
          type='password'
        />
      </fieldset>

      <Button type='submit'>{isLoading ? 'Loading...' : 'Login'}</Button>
    </Form>
  );
});

const SigninFormContainer = () => {
  const [login, { isLoading, error }] = authApi.useSigninMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SigninInputs> = async (formData) => {
    try {
      const viewerData = await login(formData).unwrap();
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
      <SigninFormView isLoading={isLoading} onSubmit={onSubmit} />
      {errorMsg && (
        <span className='w-full max-w-md bg-red-400 p-3 text-white '>
          {errorMsg}
        </span>
      )}
    </div>
  );
};

export const SigninForm = memo(SigninFormContainer);
