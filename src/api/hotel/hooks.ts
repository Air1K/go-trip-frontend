import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { hotelApi } from '@/api/hotel/api.ts';

export const KEY_HOTEL = 'hotel';

export const useHotelQuery = () => {
  return useQuery({
    queryKey: [KEY_HOTEL],
    queryFn: hotelApi.getAllHotel,
  });
};

export const useHotelCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: hotelApi.createHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_HOTEL] });
    },
  });
};

export const useHotelEditMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: hotelApi.edit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_HOTEL] });
    },
  });
};
