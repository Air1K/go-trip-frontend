import $api from '@/api/base/httpClient.ts';
import { IHotel } from '@/api/hotel/types.ts';
import { HotelSchemaFormType } from '@/validation/hotel-schema.ts';

const segment = 'hotel/';

export const hotelApi = {
  getAllHotel: async (): Promise<IHotel[]> => {
    const { data } = await $api.get(segment + 'all');
    return data.data;
  },
  createHotel: async (hotel: HotelSchemaFormType): Promise<IHotel> => {
    const { data } = await $api.post(segment + 'create', hotel);
    return data.data;
  },
  edit: async (body: { id: number; hotel: HotelSchemaFormType }): Promise<IHotel> => {
    const { data } = await $api.put(segment + 'update/' + body.id, body.hotel);
    return data.data;
  },
};
