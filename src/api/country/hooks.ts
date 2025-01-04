import { useQuery } from '@tanstack/react-query';
import { Country } from '@/api/country/api.ts';
export const KEY_COUNTRY = 'country';

export const useCountryQuery = () => {
  return useQuery({
    queryKey: [KEY_COUNTRY],
    queryFn: Country.getAllCountry,
  });
};
