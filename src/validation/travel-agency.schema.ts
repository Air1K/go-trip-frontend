// validation/travel-agency.schema.ts
import { z, ZodSchema } from 'zod';
import { ITravelAgency } from '@/api/travel-agency/types';

type CreateTravelAgencyPayload = Omit<ITravelAgency, 'id' | 'tourOperator'>;

export const travelAgencySchema: ZodSchema<CreateTravelAgencyPayload> = z.object({
  name: z.string({ required_error: 'Название обязательно' }).min(1, 'Название не может быть пустым'),
  short_name: z.string().optional(),
  tour_operator_id: z.coerce
    .number({ required_error: 'Выберите туроператора' })
    .int('ID туроператора должен быть целым числом'),
});

export type TravelAgencySchemaFormType = z.infer<typeof travelAgencySchema>;
