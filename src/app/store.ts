import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { contactsModel } from '@/entities/Contacts';
import { contactsApi } from '@/entities/Contacts/api';
import { viewerApi } from '@/entities/Viewer/api';
import { authApi, authModel } from '@/features/auth';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [viewerApi.reducerPath]: viewerApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    auth: authModel.reducer,
    contacts: contactsModel.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      viewerApi.middleware,
      contactsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const getRootState = (state: RootState) => state;
export const useAppSelector = () => useSelector(getRootState);

export const useAppDispatch = () => useDispatch<AppDispatch>();
