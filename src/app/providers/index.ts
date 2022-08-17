import { compose, Store } from '@reduxjs/toolkit';
import { FC } from 'react';

import { withRouter } from './withRouter';
import { withStore } from './withStore';

type ProvidersProps = {
  store: Store;
};

export const withProviders = ({ store }: ProvidersProps) =>
  compose<FC>(withStore(store), withRouter);
