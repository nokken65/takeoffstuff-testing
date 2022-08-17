import { memo, useState } from 'react';

import { Button } from '@/shared/ui';

import { AddContactForm } from './AddContactForm';

const AddContactView = () => {
  const [isShowAddContactForm, setIsShowAddContactForm] = useState(false);

  return isShowAddContactForm ? (
    <>
      <AddContactForm />
      <Button
        className='rounded-lg !bg-red-200 hover:!bg-red-300'
        onClick={() => setIsShowAddContactForm(false)}
      >
        Close
      </Button>
    </>
  ) : (
    <Button
      className='rounded-lg'
      onClick={() => setIsShowAddContactForm((prev) => !prev)}
    >
      Add
    </Button>
  );
};

export const AddContact = memo(AddContactView);
