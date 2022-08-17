import { memo } from 'react';

import { useAppDispatch } from '@/app/store';
import { Button } from '@/shared/ui';

import { authModel } from '..';

const SignoutButtonView = () => {
  const dispatch = useAppDispatch();

  const signout = () => {
    dispatch(authModel.actions.logOut());
    localStorage.removeItem('token');
  };

  return (
    <Button className='rounded-lg' onClick={signout}>
      Sign out
    </Button>
  );
};

export const SignoutButton = memo(SignoutButtonView);
