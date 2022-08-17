import { object, string } from 'myzod';

export const signinSchema = object({
  email: string().pattern(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    'Incorrect email',
  ),
  password: string().min(4, 'Password must be > 4 characters'),
});
