import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQuery } from '@/app/api';

import {
  AddContactInputs,
  Contact,
  DeleteContactInputs,
  SearchContactInputs,
  UpdateContactInputs,
} from '../model/models';

export const contactsApi = createApi({
  baseQuery,
  reducerPath: 'contactsApi',
  tagTypes: ['CONTACTS'],
  endpoints: (builder) => ({
    getAllContacts: builder.query<Contact[], void>({
      query: () => ({
        url: '/contacts',
        method: 'GET',
      }),
      providesTags: ['CONTACTS'],
    }),
    searchContacts: builder.mutation<Contact[], SearchContactInputs>({
      query: (params) => ({
        url: '/contacts',
        method: 'GET',
        params: { q: params.query },
      }),
    }),
    addContact: builder.mutation<Contact, AddContactInputs>({
      query: (contact) => ({
        url: '/contacts',
        method: 'POST',
        body: { ...contact },
      }),
      invalidatesTags: ['CONTACTS'],
    }),
    deleteContact: builder.mutation<Pick<Contact, 'id'>, DeleteContactInputs>({
      query: (params) => ({
        url: '/contacts/' + params.id,
        method: 'DELETE',
      }),
      invalidatesTags: ['CONTACTS'],
    }),
    updateContact: builder.mutation<Contact, UpdateContactInputs>({
      query: (updates) => ({
        url: '/contacts/' + updates.id,
        method: 'PATCH',
        body: { ...updates.updates },
      }),
      invalidatesTags: ['CONTACTS'],
    }),
  }),
});
