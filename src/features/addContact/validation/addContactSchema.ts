import { contactSchema } from '@/entities/Contacts/validation';

export const addContactSchema = contactSchema.omit(['id', 'userId']);
