import $api from '@/api/base/httpClient.ts';
import { IServiceClass } from '@/api/service-class/types.ts';

const segment = 'directory/';

export const ServiceClass = {
  getAllServiceClass: async (): Promise<IServiceClass[]> => {
    const { data } = await $api.get(segment + 'service-class');
    return data.data;
  },
};
