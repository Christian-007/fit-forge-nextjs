import { z } from 'zod';

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name is required')
      .max(200, 'Full name must be below 200 characters')
      .regex(new RegExp('^[a-zA-Z\\s]+$'), 'Full name should not contain numbers'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match. Try again.",
    path: ['confirmPassword'],
  });

export type SignUpFormInputs = z.infer<typeof signUpSchema>;
