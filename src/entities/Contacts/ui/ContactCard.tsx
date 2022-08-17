import { memo, ReactNode } from 'react';

import { Contact } from '../model/models';
import { ContactField } from './ContactField';
import { ContactFieldGroup } from './ContactFieldGroup';

type ContactProps = Contact & {
  actionsNode?: ReactNode;
};

const ContactCardView = ({ actionsNode, ...contact }: ContactProps) => {
  return (
    <div className='flex w-full'>
      <div className='grid w-full grid-cols-3 gap-4 rounded-l-lg bg-blue-50 p-4 2xl:rounded-none xl:grid-cols-2 md:grid-cols-1'>
        <ContactFieldGroup label='Info'>
          <ContactField label='name'>{contact.name}</ContactField>
          <ContactField label='phone'>
            <a className='link' href={`tel:${contact.phone}`}>
              {contact.phone}
            </a>
          </ContactField>
          <ContactField label='email'>
            {contact.email && (
              <a className='link' href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            )}
          </ContactField>
          <ContactField label='website'>
            {contact.website && (
              <a
                className='link'
                href={'http://' + contact.website}
                rel='noreferrer'
                target='_blank'
              >
                {contact.website}
              </a>
            )}
          </ContactField>
        </ContactFieldGroup>
        <ContactFieldGroup label='Address'>
          <ContactField label='city'>{contact.address?.city}</ContactField>
          <ContactField label='street'>{contact.address?.street}</ContactField>
          <ContactField label='suite'>{contact.address?.suite}</ContactField>
          <ContactField label='zipcode'>
            {contact.address?.zipcode}
          </ContactField>
        </ContactFieldGroup>
        <ContactFieldGroup label='Company'>
          <ContactField label='name'>{contact.company?.name}</ContactField>
          <ContactField label='description'>
            {contact.company?.catchPhrase}
          </ContactField>
          <ContactField label='tags'>{contact.company?.bs}</ContactField>
        </ContactFieldGroup>
      </div>
      <div className='flex min-h-full w-fit flex-col justify-center'>
        {actionsNode}
      </div>
    </div>
  );
};

export const ContactCard = memo(ContactCardView);
