import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/app/store';
import { Contact, ContactCard, contactsModel } from '@/entities/Contacts';
import { contactsApi } from '@/entities/Contacts/api';
import { DeleteContactButton } from '@/features/deleteContact';
import {
  UpdateContactButton,
  UpdateContactForm,
} from '@/features/updateContact';
import { Button } from '@/shared/ui';

type ContactsFeedProps = {
  contacts: Contact[];
};

const ContactsFeedView = ({ contacts }: ContactsFeedProps) => {
  const [isShowUpdateContactForm, setIsShowUpdateContactForm] = useState<
    number | null
  >(null);

  const onCloseForm = useCallback(() => setIsShowUpdateContactForm(null), []);

  return (
    <ul className='flex w-full flex-wrap justify-between gap-4'>
      {contacts &&
        contacts.map((contact) => (
          <li className='flex w-full flex-col gap-2' key={contact.id}>
            {isShowUpdateContactForm === contact.id ? (
              <>
                <UpdateContactForm id={contact.id} onCloseForm={onCloseForm} />
                <Button
                  className='rounded-lg !bg-red-200 hover:!bg-red-300'
                  onClick={onCloseForm}
                >
                  Close
                </Button>
              </>
            ) : (
              <ContactCard
                {...contact}
                actionsNode={
                  <>
                    <UpdateContactButton
                      onShow={() => setIsShowUpdateContactForm(contact.id)}
                    />
                    <DeleteContactButton id={contact.id} />
                  </>
                }
              />
            )}
          </li>
        ))}
    </ul>
  );
};

const ContactsFeedContainer = () => {
  const contacts = useSelector(contactsModel.selectors.selectContacts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(contactsApi.endpoints.getAllContacts.initiate());
  }, []);

  if (!contacts.length) {
    return (
      <div className='flex h-full w-full justify-center '>{'Empty:('}</div>
    );
  }

  return <ContactsFeedView contacts={contacts} />;
};

export const ContactsFeed = memo(ContactsFeedContainer);
