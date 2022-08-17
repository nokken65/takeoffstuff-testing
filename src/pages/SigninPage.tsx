import { Link } from 'react-router-dom';

import { SigninForm } from '@/features/auth/ui';
import { ROUTE_PATHS } from '@/shared/constants';

const SigninPage = () => {
  return (
    <div className='flex h-full w-full flex-col items-center gap-8 pt-16'>
      <h1 className='text-2xl font-bold'>Login</h1>
      <SigninForm />
      <Link className='link' to={ROUTE_PATHS.signup}>
        Don&apos;t have an account? Sign up
      </Link>
    </div>
  );
};

export default SigninPage;
