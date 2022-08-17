import { number, object, string } from 'myzod';

export const addressSchema = object({
  street: string().nullable(),
  suite: string().nullable(),
  city: string().nullable(),
  zipcode: string().nullable(),
});

export const companySchema = object({
  name: string().nullable(),
  catchPhrase: string().nullable(),
  bs: string().nullable(),
});

export const contactSchema = object({
  id: number(),
  userId: number(),
  name: string().min(3, 'Incorrect name'),
  email: string()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Incorrect email')
    .nullable(),
  phone: string().pattern(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    'Incorrect phone number',
  ),
  website: string()
    .pattern(
      /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[‌​a-z]{3}\.([a-z]+)?$/,
      'Incorrect website url',
    )
    .nullable(),
  address: addressSchema.nullable(),
  company: companySchema.nullable(),
});
