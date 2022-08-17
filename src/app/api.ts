import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://powerful-waters-87808.herokuapp.com',
  credentials: 'include',
  prepareHeaders: (headers) => {
    // const { token } = (getState() as RootState).auth;

    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
  mode: 'cors',
});
