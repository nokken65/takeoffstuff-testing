import { memo, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { AddContactInputs } from '@/entities/Contacts';
import { contactsApi } from '@/entities/Contacts/api';
import { ContactFieldGroup } from '@/entities/Contacts/ui/ContactFieldGroup';
import { authModel } from '@/features/auth';
import { Form, Input, myzodResolver } from '@/shared/lib/Form';
import { Button } from '@/shared/ui';

import { addContactSchema } from '../validation';

type AddContactFormProps = {
  onSubmit: SubmitHandler<AddContactInputs>;
  isLoading?: boolean;
};

const AddContactFormView = memo(
  ({ isLoading, onSubmit }: AddContactFormProps) => {
    const methods = useForm<AddContactInputs>({
      defaultValues: {
        name: '',
        phone: '',
        email: null,
        website: null,
        address: { city: null, street: null, suite: null, zipcode: null },
        company: { name: null, catchPhrase: null, bs: null },
      },
      resolver: myzodResolver(addContactSchema),
      mode: 'onChange',
    });

    const {
      reset,
      formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
      reset();
    }, [isSubmitSuccessful]);

    return (
      <Form
        className='w-full max-w-full'
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid w-full grid-cols-3 gap-4 rounded-lg p-4 2xl:rounded-none xl:grid-cols-2 md:grid-cols-1'>
          <ContactFieldGroup label='Info'>
            <fieldset className='flex flex-col gap-4'>
              <Input<AddContactInputs>
                required
                name='name'
                placeholder='alex'
                type='text'
              />
              <Input<AddContactInputs>
                required
                name='phone'
                placeholder='010-692-6593'
                type='tel'
              />
              <Input<AddContactInputs>
                name='email'
                placeholder='example@mail.com'
                type='email'
              />
              <Input<AddContactInputs>
                name='website'
                placeholder='example.com'
                type='text'
              />
            </fieldset>
          </ContactFieldGroup>
          <ContactFieldGroup label='Address'>
            <fieldset className='flex flex-col gap-4'>
              <Input<AddContactInputs>
                name='address.city'
                placeholder='city'
                type='text'
              />
              <Input<AddContactInputs>
                name='address.street'
                placeholder='street'
                type='text'
              />
              <Input<AddContactInputs>
                name='address.suite'
                placeholder='suite'
                type='text'
              />
              <Input<AddContactInputs>
                name='address.zipcode'
                placeholder='87342-3423'
                type='text'
              />
            </fieldset>
          </ContactFieldGroup>
          <ContactFieldGroup label='Company'>
            <fieldset className='flex flex-col gap-4'>
              <Input<AddContactInputs>
                name='company.name'
                placeholder='name'
                type='text'
              />
              <Input<AddContactInputs>
                name='company.catchPhrase'
                placeholder='catchPhrase'
                type='text'
              />
              <Input<AddContactInputs>
                name='company.bs'
                placeholder='a b c'
                type='text'
              />
            </fieldset>
          </ContactFieldGroup>
        </div>
        <Button className='col-span-3' type='submit'>
          {isLoading ? 'Loading...' : 'Add'}
        </Button>
      </Form>
    );
  },
);

const AddContactFormContainer = () => {
  const [add, { isLoading, error }] = contactsApi.useAddContactMutation();
  const viewer = useSelector(authModel.selectors.selectViewer);

  const onSubmit: SubmitHandler<AddContactInputs> = async (formData) => {
    try {
      await add({ ...formData, userId: viewer?.id ?? -1 }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const errorMsg = useMemo(() => {
    if (error) {
      if ('data' in error) {
        return JSON.stringify(error.data);
      }
      if ('error' in error) {
        return JSON.stringify(error.error);
      }
    }

    return null;
  }, [error]);

  return (
    <div className='flex w-full flex-col items-center gap-6'>
      <AddContactFormView isLoading={isLoading} onSubmit={onSubmit} />
      {errorMsg && (
        <span className='w-full max-w-md bg-red-400 p-3 text-white '>
          {errorMsg}
        </span>
      )}
    </div>
  );
};

export const AddContactForm = memo(AddContactFormContainer);
