import { number, object, string } from 'myzod';

export const addressSchema = object({
  street: string().nullable().optional(),
  suite: string().nullable().optional(),
  city: string().nullable().optional(),
  zipcode: string().nullable().optional(),
});

export const companySchema = object({
  name: string().nullable().optional(),
  catchPhrase: string().nullable().optional(),
  bs: string().nullable().optional(),
});

export const contactSchema = object({
  id: number(),
  userId: number(),
  name: string().min(3, 'Incorrect name'),
  email: string()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Incorrect email')
    .nullable()
    .optional(),
  phone: string().pattern(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    'Incorrect phone number',
  ),
  website: string()
    .pattern(
      /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[‌​a-z]{3}\.([a-z]+)?$/,
      'Incorrect website url',
    )
    .nullable()
    .optional(),
  address: addressSchema.nullable().optional(),
  company: companySchema.nullable().optional(),
});
