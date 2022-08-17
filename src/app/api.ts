import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
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
