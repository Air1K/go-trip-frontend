import $api from '@/api/base/httpClient.ts';
import { ISettlementType } from '@/api/settlement-type/types.ts';

const segment = 'directory/';

export const SettlementType = {
  getAllSettlementType: async (): Promise<ISettlementType[]> => {
    const { data } = await $api.get(segment + 'settlement-type');
    return data.data;
  },
  addSettlementType: async (newSettlementType: Omit<ISettlementType, 'id'>): Promise<ISettlementType> => {
    const { data } = await $api.post(segment + 'settlement-type', newSettlementType);
    return data.data;
  },
  updateSettlementType: async (
    id: number,
    updatedSettlementType: Partial<ISettlementType>
  ): Promise<ISettlementType> => {
    const { data } = await $api.put(segment + `settlement-type/${id}`, updatedSettlementType);
    return data.data;
  },
};
