import { Infer } from 'myzod';

import { Viewer } from '@/entities/Viewer';

import { signinSchema, signupSchema } from '../validation';

export type SigninInputs = Infer<typeof signinSchema>;
export type SignupInputs = Infer<typeof signupSchema>;

export type SigninResponse = { accessToken: string; user: Viewer };
export type SignupResponse = { accessToken: string; user: Viewer };
