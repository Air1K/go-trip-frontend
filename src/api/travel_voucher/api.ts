import $api from '@/api/base/httpClient.ts';
import { ITravelVoucher } from '@/api/travel_voucher/types.ts';

const segment = 'travel-voucher/';

export const TravelVoucher = {
  getAll: async (): Promise<ITravelVoucher[]> => {
    const { data } = await $api.get(segment + 'all');
    return data.data;
  },
  create: async (
    travelVoucher: Omit<
      ITravelVoucher,
      'id' | 'tourist' | 'tourist_id' | 'hotel' | 'travelAgency' | 'unitOfMeasurement'
    >
  ): Promise<ITravelVoucher> => {
    const { data } = await $api.post(segment + 'create', travelVoucher);
    return data.data;
  },
  edit: async (body: {
    id: number;
    travelVoucher: Omit<ITravelVoucher, 'id' | 'tourist' | 'hotel' | 'travelAgency' | 'unitOfMeasurement'> & {
      tourist_id?: string | null;
    };
  }): Promise<ITravelVoucher> => {
    const { data } = await $api.put(segment + 'update/' + body.id, body.travelVoucher);
    return data.data;
  },
};
