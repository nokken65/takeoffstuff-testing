import { Store } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export const withStore = (store: Store) => (component: () => ReactNode) => () =>
  (
    <Provider store={store}>
      <>{component()}</>
    </Provider>
  );
