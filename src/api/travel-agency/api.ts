import $api from '@/api/base/httpClient.ts';
import { ITravelAgency } from '@/api/travel-agency/types.ts';

const segment = 'travel-agency/';

export const TravelAgency = {
  getAll: async (): Promise<ITravelAgency[]> => {
    const { data } = await $api.get(segment + 'all');
    return data.data;
  },
  create: async (travelAgency: Omit<ITravelAgency, 'id' | 'tourOperator'>): Promise<ITravelAgency> => {
    const { data } = await $api.post(segment + 'create', travelAgency);
    return data.data;
  },
  edit: async (body: {
    id: number;
    travelAgency: Omit<ITravelAgency, 'id' | 'tourOperator'>;
  }): Promise<ITravelAgency> => {
    const { data } = await $api.put(segment + 'update/' + body.id, body.travelAgency);
    return data.data;
  },
};
