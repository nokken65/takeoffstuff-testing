import { contactSchema } from '@/entities/Contacts/validation';

export const updateContactSchema = contactSchema
  .omit(['id', 'userId'])
  .partial();
