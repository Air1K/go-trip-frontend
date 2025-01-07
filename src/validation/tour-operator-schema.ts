import { z, ZodSchema } from 'zod';
import { ITourOperator } from '@/api/tour-operator/types.ts';

type FormSchemaType = Omit<ITourOperator, 'id'>;

export const tourOperatorSchema: ZodSchema<FormSchemaType> = z.object({
  name: z.string({ required_error: 'Название обязательно' }).min(1, 'Название не может быть пустым'),
  short_name: z.string().optional(),
});

export type TourOperatorSchemaFormType = z.infer<typeof tourOperatorSchema>;
