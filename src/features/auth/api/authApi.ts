import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQuery } from '@/app/api';

import {
  SigninInputs,
  SigninResponse,
  SignupInputs,
  SignupResponse,
} from '../model/models';

export const authApi = createApi({
  baseQuery,
  reducerPath: 'authApi',
  endpoints: (builder) => ({
    signin: builder.mutation<SigninResponse, SigninInputs>({
      query: (credentials) => ({
        url: '/signin',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation<SignupResponse, SignupInputs>({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSigninMutation } = authApi;
