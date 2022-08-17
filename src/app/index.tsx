import './index.scss';

import { FC } from 'react';

import { Routing } from '@/pages';

import { withProviders } from './providers';
import { store } from './store';

const AppView: FC = () => {
  return <Routing />;
};

export default withProviders({ store })(AppView);
