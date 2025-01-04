import $api from '@/api/base/httpClient.ts';
import { ISettlementType } from '@/api/settlement-type/types.ts';

const segment = 'directory/';

export const SettlementType = {
  getAllSettlementType: async (): Promise<ISettlementType[]> => {
    const { data } = await $api.get(segment + 'settlement-type');
    return data.data;
  },
};
