import { memo, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/app/store';
import { SearchContactInputs } from '@/entities/Contacts';
import { contactsApi } from '@/entities/Contacts/api';
import { Form, Input, myzodResolver } from '@/shared/lib/Form';
import { Button } from '@/shared/ui';

import { searchContactsSchema } from '../validation';

type SearchContactFormProps = {
  isLoading?: boolean;
  onSubmit: SubmitHandler<SearchContactInputs>;
  onResetResults: () => void;
};

const SearchContactsFormView = memo(
  ({ isLoading, onSubmit, onResetResults }: SearchContactFormProps) => {
    const methods = useForm<SearchContactInputs>({
      defaultValues: { query: '' },
      resolver: myzodResolver(searchContactsSchema),
      mode: 'onChange',
    });

    const { reset } = methods;

    return (
      <Form
        className='w-full !flex-row justify-between gap-0'
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Input<SearchContactInputs>
          className='m-2 pr-2'
          name='query'
          placeholder='search...'
          type='search'
        />

        <Button
          type='reset'
          onClick={() => {
            reset();
            onResetResults();
          }}
        >
          Reset
        </Button>
        <Button type='submit'>{isLoading ? 'Loading...' : 'Search'}</Button>
      </Form>
    );
  },
);

const SearchContactsFormContainer = () => {
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<SearchContactInputs> = async (formData) => {
    try {
      await dispatch(contactsApi.endpoints.searchContacts.initiate(formData));
    } catch (err) {
      console.error(err);
    }
  };

  const onResetResults = useCallback(() => {
    dispatch(contactsApi.endpoints.searchContacts.initiate({ query: '' }));
  }, []);

  return (
    <SearchContactsFormView
      onResetResults={onResetResults}
      onSubmit={onSubmit}
    />
  );
};

export const SearchContactsForm = memo(SearchContactsFormContainer);
