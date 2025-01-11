import $api from '@/api/base/httpClient.ts';
import { ICountry } from '@/api/country/types.ts';

const segment = 'directory/';

export const Country = {
  getAllCountry: async (): Promise<ICountry[]> => {
    const { data } = await $api.get(segment + 'country');
    return data.data;
  },
  addCountry: async (newCountry: Omit<ICountry, 'id'>): Promise<ICountry> => {
    const { data } = await $api.post(segment + 'country', newCountry);
    return data.data;
  },
  updateCountry: async (id: number, updatedCountry: Partial<ICountry>): Promise<ICountry> => {
    const { data } = await $api.put(segment + `country/${id}`, updatedCountry);
    return data.data;
  },
};
