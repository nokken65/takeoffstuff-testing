import { memo } from 'react';

import { Contact } from '@/entities/Contacts';
import { contactsApi } from '@/entities/Contacts/api';
import { Button } from '@/shared/ui';

type DeleteContactButton = Pick<Contact, 'id'>;

const DeleteContactButtonView = ({ id }: DeleteContactButton) => {
  const [del] = contactsApi.useDeleteContactMutation();

  return (
    <Button
      className='!bg-red-200 hover:!bg-red-300'
      onClick={() => del({ id })}
    >
      X
    </Button>
  );
};

export const DeleteContactButton = memo(DeleteContactButtonView);
