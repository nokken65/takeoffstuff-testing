import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { ViewerCompact } from '@/entities/Viewer';
import { SignoutButton } from '@/features/auth/ui';
import { ROUTE_PATHS } from '@/shared/constants';

import { RequireAuth } from './RequireAuth';

const Layout = () => {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen w-full items-center justify-center'>
          Loading...
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

const ProtectedLayout = () => {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen w-full items-center justify-center'>
          Loading...
        </div>
      }
    >
      <div className='flex h-full w-full flex-col items-center gap-8'>
        <nav className='flex w-full items-center justify-between gap-4 p-4'>
          <h1 className='mr-auto text-2xl font-bold'>Contacts</h1>
          <ViewerCompact />
          <SignoutButton />
        </nav>
        <Outlet />
      </div>
    </Suspense>
  );
};

const SigninPage = lazy(() => import('./SigninPage'));
const SignupPage = lazy(() => import('./SignupPage'));
const ContactsPage = lazy(() => import('./ContactsPage'));

const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />} path={ROUTE_PATHS.index}>
        <Route index element={<Navigate to={ROUTE_PATHS.contacts} />} />
        <Route element={<Navigate to={ROUTE_PATHS.contacts} />} path='*' />
        {/* public */}
        <Route element={<SigninPage />} path={ROUTE_PATHS.signin} />
        <Route element={<SignupPage />} path={ROUTE_PATHS.signup} />
        {/* private */}
        <Route element={<RequireAuth />}>
          <Route element={<ProtectedLayout />}>
            <Route element={<ContactsPage />} path={ROUTE_PATHS.contacts} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export { Routing };
