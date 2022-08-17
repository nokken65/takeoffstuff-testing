import { Infer } from 'myzod';

import { contactSchema } from '../validation';

export type Contact = Infer<typeof contactSchema>;

export type SearchContactInputs = { query: string };
export type AddContactInputs = Omit<Contact, 'id'>;
export type DeleteContactInputs = Pick<Contact, 'id'>;
export type UpdateContactInputs = Pick<Contact, 'id'> & {
  updates: Partial<Omit<Contact, 'id' | 'userId'>>;
};
