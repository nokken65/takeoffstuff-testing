import { Link } from 'react-router-dom';

import { SignupForm } from '@/features/auth/ui';
import { ROUTE_PATHS } from '@/shared/constants';

const SignupPage = () => {
  return (
    <div className='flex h-full w-full flex-col items-center gap-8 pt-16'>
      <h1 className='text-2xl font-bold'>Register</h1>
      <SignupForm />
      <Link className='link' to={ROUTE_PATHS.signin}>
        Have an account? Sign in
      </Link>
    </div>
  );
};

export default SignupPage;
