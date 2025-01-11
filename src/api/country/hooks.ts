import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Country } from '@/api/country/api.ts';
export const KEY_COUNTRY = 'country';

export const useCountryQuery = () => {
  return useQuery({
    queryKey: [KEY_COUNTRY],
    queryFn: Country.getAllCountry,
  });
};

export const useCountryAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Country.addCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_COUNTRY] });
    },
  });
};

export const useCountryUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Parameters<typeof Country.updateCountry>[1]> }) =>
      Country.updateCountry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_COUNTRY] });
    },
  });
};
