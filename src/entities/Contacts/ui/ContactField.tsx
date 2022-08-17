import { memo, PropsWithChildren } from 'react';

type ContactFieldProps = PropsWithChildren & { label: string };

const ContactFieldView = ({ children, label }: ContactFieldProps) => {
  return (
    <div className='flex items-center gap-2'>
      <p className='text-sm text-gray-400'>{label}:</p>
      <div>{children ?? '—'}</div>
    </div>
  );
};

export const ContactField = memo(ContactFieldView);
