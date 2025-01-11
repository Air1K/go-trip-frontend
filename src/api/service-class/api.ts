import $api from '@/api/base/httpClient.ts';
import { IServiceClass } from '@/api/service-class/types.ts';

const segment = 'directory/';

export const ServiceClass = {
  getAllServiceClass: async (): Promise<IServiceClass[]> => {
    const { data } = await $api.get(segment + 'service-class');
    return data.data;
  },
  addServiceClass: async (newServiceClass: Omit<IServiceClass, 'id'>): Promise<IServiceClass> => {
    const { data } = await $api.post(segment + 'service-class', newServiceClass);
    return data.data;
  },
  updateServiceClass: async (id: number, updatedServiceClass: Partial<IServiceClass>): Promise<IServiceClass> => {
    const { data } = await $api.put(segment + `service-class/${id}`, updatedServiceClass);
    return data.data;
  },
};
