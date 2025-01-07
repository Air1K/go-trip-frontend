import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TravelAgency } from '@/api/travel-agency/api.ts';
export const KEY_TRAVEL_AGENCY = 'travel-agency';

export const useTravelAgencyQuery = () => {
  return useQuery({
    queryKey: [KEY_TRAVEL_AGENCY],
    queryFn: TravelAgency.getAll,
  });
};

export const useTravelAgencyCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TravelAgency.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_TRAVEL_AGENCY] });
    },
  });
};
