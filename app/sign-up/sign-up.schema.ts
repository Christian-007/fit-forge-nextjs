import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match. Try again.",
    path: ['confirmPassword'],
  });

export type SignUpFormInputs = z.infer<typeof signUpSchema>;
