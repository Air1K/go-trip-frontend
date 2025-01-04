import $api from '@/api/base/httpClient.ts';
import { IUnitOfMeasurement } from '@/api/units-of-measurement/types.ts';

export const UnitOfMeasurement = {
  getAllUnitOfMeasurement: async (): Promise<IUnitOfMeasurement[]> => {
    const { data } = await $api.get('directory/unit-of-measurement');
    return data.data;
  },
};
