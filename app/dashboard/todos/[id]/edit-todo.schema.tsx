import { z } from 'zod';

export const editTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be below 200 characters'),
});

export type EditTodoFormInputs = z.infer<typeof editTodoSchema>;
