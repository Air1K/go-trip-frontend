import { z, ZodSchema } from 'zod';
import { IHotel } from '@/api/hotel/types.ts';

type FormSchemaType = Omit<IHotel, 'id' | 'serviceClasses' | 'settlements'>;

export const hotelSchema: ZodSchema<FormSchemaType> = z.object({
  name: z.string({ required_error: 'Название обязательно' }).min(1, 'Название не может быть пустым'),
  service_classes_id: z.coerce
    .number({ required_error: 'ID класса обслуживания обязательно' })
    .int('ID класса обслуживания должен быть целым числом'),
  settlements_id: z.coerce
    .number({ required_error: 'ID населенного пункта обязательно' })
    .int('ID населенного пункта должен быть целым числом'),
});

export type HotelSchemaFormType = z.infer<typeof hotelSchema>;
