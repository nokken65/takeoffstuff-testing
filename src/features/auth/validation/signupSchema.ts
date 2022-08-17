import { object, string } from 'myzod';

export const signupSchema = object({
  email: string().pattern(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    'Incorrect email',
  ),
  username: string()
    .min(4, 'Username must be > 3 characters')
    .max(20, 'Username must be < 20 characters')
    .pattern(
      /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,20}[a-zA-Z0-9]$/,
      'Incorrect username',
    ),
  password: string().min(4, 'Password must be > 4 characters'),
});
