import { z } from 'zod';

export const travelVoucherSchema = z.object({
  issued_at: z.string().min(1, 'Дата оформления не может быть пустой'),
  departure_date: z.string().min(1, 'Дата вылета не может быть пустой'),
  arrival_date: z.string().min(1, 'Дата прилёта не может быть пустой'),
  price: z.coerce.number().nonnegative('Цена не может быть отрицательной'),
  // tourist_id: z.string().uuid('Неверный формат tourist_id (ожидается UUID)').optional(),
  hotel_id: z.coerce.number().int('hotel_id должно быть целым числом'),
  travel_agency_id: z.coerce.number().int('travel_agency_id должно быть целым числом'),
  unit_id: z.coerce.number().int('unit_id должно быть целым числом'),
});

export type TravelVoucherSchemaFormType = z.infer<typeof travelVoucherSchema>;
