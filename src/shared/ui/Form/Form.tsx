import clsx from 'clsx';
import { FormHTMLAttributes, memo, PropsWithChildren } from 'react';

export type FormProps = FormHTMLAttributes<HTMLFormElement> & PropsWithChildren;

const FormView = ({ children, className, ...props }: FormProps) => {
  return (
    <form
      className={clsx(
        'flex w-full flex-col gap-4 overflow-hidden rounded-lg bg-blue-100 md:rounded-none',
        className,
      )}
      {...props}
    >
      {children}
    </form>
  );
};

export const Form = memo(FormView);
