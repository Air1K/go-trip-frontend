import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Settlement } from '@/api/settlement/api.ts';
export const KEY_SETTLEMENT = 'settlement';

export const useSettlementQuery = () => {
  return useQuery({
    queryKey: [KEY_SETTLEMENT],
    queryFn: Settlement.getAllSettlement,
  });
};

export const useSettlementAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Settlement.addSettlement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_SETTLEMENT] });
    },
  });
};

export const useSettlementUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Parameters<typeof Settlement.updateSettlement>[1]> }) =>
      Settlement.updateSettlement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_SETTLEMENT] });
    },
  });
};
