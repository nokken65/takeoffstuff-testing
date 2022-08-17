import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';

import { contactsApi } from '../api';
import { Contact } from './models';

type ContactsState = {
  contacts: Contact[];
};

const initialState: ContactsState = { contacts: [] };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      contactsApi.endpoints.getAllContacts.matchFulfilled,
      (state, { payload }) => {
        state.contacts = payload;
      },
    );
    builder.addMatcher(
      contactsApi.endpoints.searchContacts.matchFulfilled,
      (state, { payload }) => {
        state.contacts = payload;
      },
    );
  },
});

export { contactsSlice };
export const { reducer } = contactsSlice;

const selectContactById = (id: number) => (state: RootState) =>
  state.contacts.contacts.find((contact) => contact.id === id);
const selectContacts = (state: RootState) => state.contacts.contacts;

export const selectors = { selectContacts, selectContactById };
