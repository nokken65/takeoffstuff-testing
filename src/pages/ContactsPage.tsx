import { AddContact } from '@/features/addContact';
import { SearchContactsForm } from '@/features/searchContacts';
import { ContactsFeed } from '@/widgets/ContactsFeed';

const ContactsPage = () => {
  return (
    <div className='flex w-full max-w-5xl flex-col gap-6'>
      <AddContact />
      <SearchContactsForm />
      <ContactsFeed />
    </div>
  );
};

export default ContactsPage;
