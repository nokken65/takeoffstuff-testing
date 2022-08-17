import { object, string } from 'myzod';

export const searchContactsSchema = object({
  query: string(),
});
