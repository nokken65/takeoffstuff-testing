import clsx from 'clsx';
import { memo, PropsWithChildren } from 'react';

type ContactFieldGroupProps = PropsWithChildren & {
  label: string;
  className?: string;
};

const ContactFieldGroupView = ({
  children,
  label,
  className,
}: ContactFieldGroupProps) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <h3 className='text-lg font-bold'>{label}</h3>
      {children}
    </div>
  );
};

export const ContactFieldGroup = memo(ContactFieldGroupView);
