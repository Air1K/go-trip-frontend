import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TravelVoucher } from '@/api/travel_voucher/api.ts';
export const KEY_TRAVEL_VOUCHER = 'travel_voucher';

export const useTravelVoucherQuery = () => {
  return useQuery({
    queryKey: [KEY_TRAVEL_VOUCHER],
    queryFn: TravelVoucher.getAll,
  });
};

export const useTravelVoucherCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TravelVoucher.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_TRAVEL_VOUCHER] });
    },
  });
};
