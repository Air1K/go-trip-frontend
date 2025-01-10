import $api from '@/api/base/httpClient.ts';
import { ITourOperator } from '@/api/tour-operator/types.ts';

const segment = 'tour-operator/';

export const TourOperator = {
  getAll: async (): Promise<ITourOperator[]> => {
    const { data } = await $api.get(segment + 'all');
    return data.data;
  },
  create: async (tourOperator: Omit<ITourOperator, 'id'>): Promise<ITourOperator> => {
    const { data } = await $api.post(segment + 'create', tourOperator);
    return data.data;
  },
  edit: async (body: { id: number; tourOperator: Omit<ITourOperator, 'id'> }): Promise<ITourOperator> => {
    const { data } = await $api.put(segment + 'update/' + body.id, body.tourOperator);
    return data.data;
  },
};
