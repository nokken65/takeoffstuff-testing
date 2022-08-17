import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, memo } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isDirty: boolean;
  error: string | undefined;
};

const InputView = forwardRef<HTMLInputElement, InputProps>(
  ({ isDirty, error, name, className, required, ...props }, ref) => {
    return (
      <div className='flex w-full flex-col gap-2'>
        <label
          className={clsx(
            'flex items-center gap-2 overflow-hidden rounded-lg bg-white pl-2 text-xs text-gray-400 outline outline-4 outline-transparent focus-within:outline-blue-300',
            isDirty && props.value && !error && '!outline-green-300',
            error && '!outline-red-300',
            className,
          )}
        >
          <div className='relative'>
            {required && (
              <span className='absolute -top-2 -left-1 text-red-400'>*</span>
            )}
            <p>{name?.includes('.') ? name.split('.')[1] : name}</p>
          </div>
          <span className='h-4 w-[2px] min-w-[2px] bg-gray-400' />
          <input
            className='w-full py-2 text-base text-black focus-within:outline-none'
            name={name}
            ref={ref}
            {...props}
          />
        </label>
        {isDirty && error && (
          <span className='text-sm text-red-400'>{error}</span>
        )}
      </div>
    );
  },
);

export const Input = memo(InputView);
