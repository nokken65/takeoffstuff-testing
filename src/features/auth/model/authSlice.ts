import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';
import { Viewer } from '@/entities/Viewer';
import { viewerApi } from '@/entities/Viewer/api';

type AuthState = {
  viewer: Viewer | null;
  token: string | null;
};

const initialState = (): AuthState => {
  const token = localStorage.getItem('token');

  return { viewer: null, token };
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { viewer, token } = action.payload;
      state.viewer = viewer;
      state.token = token;
    },
    logOut: (state) => {
      state.viewer = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      viewerApi.endpoints.getViewer.matchFulfilled,
      (state, { payload }) => {
        const { password: _, ...viewer } = payload;
        state.viewer = viewer;
      },
    );
  },
});

export { authSlice };
export const { actions } = authSlice;
export const { reducer } = authSlice;

const selectViewer = (state: RootState) => state.auth.viewer;
const selectToken = (state: RootState) => state.auth.token;

export const selectors = { selectViewer, selectToken };
