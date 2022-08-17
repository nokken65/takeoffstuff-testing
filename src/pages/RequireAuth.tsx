import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { authModel } from '@/features/auth';
import { ROUTE_PATHS } from '@/shared/constants';

const RequireAuth = () => {
  const token = useSelector(authModel.selectors.selectToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate replace state={{ from: location }} to={ROUTE_PATHS.signin} />
  );
};

export { RequireAuth };
