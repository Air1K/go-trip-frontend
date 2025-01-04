import $api from '@/api/base/httpClient.ts';
import { ICountry } from '@/api/country/types.ts';

const segment = 'directory/';

export const Country = {
  getAllCountry: async (): Promise<ICountry[]> => {
    const { data } = await $api.get(segment + 'country');
    return data.data;
  },
};
