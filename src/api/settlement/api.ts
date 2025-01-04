import $api from '@/api/base/httpClient.ts';
import { ISettlement } from '@/api/settlement/types.ts';

const segment = 'directory/';

export const Settlement = {
  getAllSettlement: async (): Promise<ISettlement[]> => {
    const { data } = await $api.get(segment + 'settlement');
    return data.data;
  },
};
