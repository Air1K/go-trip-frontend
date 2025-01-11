import $api from '@/api/base/httpClient.ts';
import { ISettlement } from '@/api/settlement/types.ts';

const segment = 'directory/';

export const Settlement = {
  getAllSettlement: async (): Promise<ISettlement[]> => {
    const { data } = await $api.get(segment + 'settlement');
    return data.data;
  },
  addSettlement: async (newSettlement: Omit<ISettlement, 'id'>): Promise<ISettlement> => {
    const { data } = await $api.post(segment + 'settlement', newSettlement);
    return data.data;
  },
  updateSettlement: async (id: number, updatedSettlement: Partial<ISettlement>): Promise<ISettlement> => {
    const { data } = await $api.put(segment + `settlement/${id}`, updatedSettlement);
    return data.data;
  },
};
