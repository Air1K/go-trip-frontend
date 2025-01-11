import $api from '@/api/base/httpClient.ts';
import { IUnitOfMeasurement } from '@/api/units-of-measurement/types.ts';

export const UnitOfMeasurement = {
  getAllUnitOfMeasurement: async (): Promise<IUnitOfMeasurement[]> => {
    const { data } = await $api.get('directory/unit-of-measurement');
    return data.data;
  },
  addUnitOfMeasurement: async (newUnit: Omit<IUnitOfMeasurement, 'id'>): Promise<IUnitOfMeasurement> => {
    const { data } = await $api.post('directory/unit-of-measurement', newUnit);
    return data.data;
  },
  updateUnitOfMeasurement: async (id: number, updatedUnit: Partial<IUnitOfMeasurement>): Promise<IUnitOfMeasurement> => {
    const { data } = await $api.put(`directory/unit-of-measurement/${id}`, updatedUnit);
    return data.data;
  },
};
