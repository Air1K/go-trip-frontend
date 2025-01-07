import $api from '@/api/base/httpClient.ts';
import { ITravelVoucher } from '@/api/travel_voucher/types.ts';

const segment = 'travel-voucher/';

export const TravelVoucher = {
  getAll: async (): Promise<ITravelVoucher[]> => {
    const { data } = await $api.get(segment + 'all');
    return data.data;
  },
  create: async (
    travelVoucher: Omit<ITravelVoucher, 'id' | 'tourist' | 'hotel' | 'travelAgency' | 'unitOfMeasurement'>
  ): Promise<ITravelVoucher> => {
    const { data } = await $api.post(segment + 'create', travelVoucher);
    return data.data;
  },
};
