import { memo, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
  Contact,
  contactsModel,
  UpdateContactInputs,
} from '@/entities/Contacts';
import { contactsApi } from '@/entities/Contacts/api';
import { ContactFieldGroup } from '@/entities/Contacts/ui/ContactFieldGroup';
import { Form, Input, myzodResolver } from '@/shared/lib/Form';
import { Button } from '@/shared/ui';

import { updateContactSchema } from '../validation';

type UpdatesInputs = UpdateContactInputs['updates'];

type UpdateContactFormProps = {
  defaultValues: UpdatesInputs;
  onSubmit: SubmitHandler<UpdatesInputs>;
  isLoading?: boolean;
};

const UpdateContactFormView = memo(
  ({ defaultValues, isLoading, onSubmit }: UpdateContactFormProps) => {
    const methods = useForm<UpdatesInputs>({
      defaultValues: defaultValues,
      resolver: myzodResolver(updateContactSchema),
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
              <Input<UpdatesInputs>
                name='name'
                placeholder='alex'
                type='text'
              />
              <Input<UpdatesInputs>
                name='phone'
                placeholder='010-692-6593'
                type='tel'
              />
              <Input<UpdatesInputs>
                name='email'
                placeholder='example@mail.com'
                type='email'
              />
              <Input<UpdatesInputs>
                name='website'
                placeholder='example.com'
                type='text'
              />
            </fieldset>
          </ContactFieldGroup>
          <ContactFieldGroup label='address'>
            <fieldset className='flex flex-col gap-4'>
              <Input<UpdatesInputs>
                name='address.city'
                placeholder='city'
                type='text'
              />
              <Input<UpdatesInputs>
                name='address.street'
                placeholder='street'
                type='text'
              />
              <Input<UpdatesInputs>
                name='address.suite'
                placeholder='suite'
                type='text'
              />
              <Input<UpdatesInputs>
                name='address.zipcode'
                placeholder='87342-3423'
                type='text'
              />
            </fieldset>
          </ContactFieldGroup>
          <ContactFieldGroup label='Company'>
            <fieldset className='flex flex-col gap-4'>
              <Input<UpdatesInputs>
                name='company.name'
                placeholder='name'
                type='text'
              />
              <Input<UpdatesInputs>
                name='company.catchPhrase'
                placeholder='catchPhrase'
                type='text'
              />
              <Input<UpdatesInputs>
                name='company.bs'
                placeholder='a b c'
                type='text'
              />
            </fieldset>
          </ContactFieldGroup>
        </div>
        <Button className='col-span-3' type='submit'>
          {isLoading ? 'Loading...' : 'Update'}
        </Button>
      </Form>
    );
  },
);

type UpdateContactFormContainerProps = Pick<Contact, 'id'> & {
  onCloseForm: () => void;
};

const UpdateContactFormContainer = ({
  id,
  onCloseForm,
}: UpdateContactFormContainerProps) => {
  const [update, { isLoading, error }] = contactsApi.useUpdateContactMutation();
  const contact = useSelector(contactsModel.selectors.selectContactById(id));

  const defaultValues: UpdatesInputs = useMemo(() => {
    if (contact) {
      const { id: _id, userId: _userId, ...rest } = contact;

      return rest;
    } else {
      return {};
    }
  }, []);

  const onSubmit: SubmitHandler<UpdatesInputs> = async (formData) => {
    try {
      await update({ updates: formData, id }).unwrap();
      onCloseForm();
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
      <UpdateContactFormView
        defaultValues={defaultValues}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
      {errorMsg && (
        <span className='w-full max-w-md bg-red-400 p-3 text-white '>
          {errorMsg}
        </span>
      )}
    </div>
  );
};

export const UpdateContactForm = memo(UpdateContactFormContainer);
