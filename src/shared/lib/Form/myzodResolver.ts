import { ObjectType, ValidationError } from 'myzod';
import { FieldValues, Resolver } from 'react-hook-form';

export function myzodResolver<T extends FieldValues, R>(
  schema: ObjectType<T>,
): Resolver<R> {
  return async (values) => {
    const errors: { [key: string]: { message: string | null } } = {};

    if (!schema) {
      return {
        values,
        errors,
      };
    }

    const res = schema.collectErrors().try(values);

    if (res instanceof ValidationError) {
      for (const key in res.collectedErrors) {
        errors[key] = { message: res.collectedErrors[key]?.message ?? null };
      }
    }

    return {
      values,
      errors,
    };
  };
}
