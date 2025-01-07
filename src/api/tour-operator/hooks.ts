import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TourOperator } from '@/api/tour-operator/api.ts';
export const KEY_TOUR_OPERATOR = 'tour-operator';

export const useTourOperatorQuery = () => {
  return useQuery({
    queryKey: [KEY_TOUR_OPERATOR],
    queryFn: TourOperator.getAll,
  });
};

export const useTourOperatorCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TourOperator.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_TOUR_OPERATOR] });
    },
  });
};
