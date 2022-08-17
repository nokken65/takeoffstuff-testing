import clsx from 'clsx';
import { ButtonHTMLAttributes, memo, PropsWithChildren } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

const ButtonView = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'bg-blue-200 p-2 transition-colors duration-150 ease-in-out hover:bg-blue-300/80',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Button = memo(ButtonView);
